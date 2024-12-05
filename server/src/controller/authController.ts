import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextFunction, Request, Response } from 'express'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import responseMessage from '../constant/responseMessage'
import { EUserRole } from '../constant/userConstant'
import databaseService from '../service/databaseService'
import { validateJoiSchema, ValidateLoginBody, ValidateRegisterBody } from '../service/validationService'
import { ILoginUserRequestBody, IRefreshToken, IRegisterUserRequestBody, IUser } from '../types/userTypes'
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import quicker from '../util/quicker'

dayjs.extend(utc)

interface IRegisterRequest extends Request {
    body: IRegisterUserRequestBody
}

interface ILoginRequest extends Request {
    body: ILoginUserRequestBody
}

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IRegisterRequest

            // * Body Validation
            const { error, value } = validateJoiSchema<IRegisterUserRequestBody>(ValidateRegisterBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            // Destructure Value
            const { name, emailAddress, password, phoneNumber, consent } = value

            // * Phone Number Validation & Parsing
            const { countryCode, isoCode, internationalNumber } = quicker.parsePhoneNumber(`+` + phoneNumber)

            if (!countryCode || !isoCode || !internationalNumber) {
                return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
            }

            // * Timezone
            const timezone = quicker.countryTimezone(isoCode)

            if (!timezone || timezone.length === 0) {
                return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
            }

            // * Check User Existence using Email Address
            const user = await databaseService.findUserByEmailAddress(emailAddress)
            if (user) {
                return httpError(next, new Error(responseMessage.ALREADY_EXIST('user', emailAddress)), req, 403)
            }

            // * Encrypting Password
            const encryptedPassword = await quicker.hashPassword(password)

            // * Preparing Object
            const payload: IUser = {
                name,
                emailAddress,
                phoneNumber: {
                    countryCode: countryCode,
                    isoCode: isoCode,
                    internationalNumber: internationalNumber
                },
                lastLoginAt: null,
                role: EUserRole.USER,
                timezone: timezone[0].name,
                password: encryptedPassword,
                consent
            }

            // Create New User
            const newUser = await databaseService.registerUser(payload)

            // Send Response
            httpResponse(req, res, 201, responseMessage.SUCCESS, { _id: newUser._id })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as ILoginRequest

            // * Validate & parse body
            const { error, value } = validateJoiSchema<ILoginUserRequestBody>(ValidateLoginBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { emailAddress, password } = value

            // * Find User
            const user = await databaseService.findUserByEmailAddress(emailAddress, `+password`)
            if (!user) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('user')), req, 404)
            }

            // * Validate Password
            const isValidPassword = await quicker.comparePassword(password, user.password)
            if (!isValidPassword) {
                return httpError(next, new Error(responseMessage.INVALID_EMAIL_OR_PASSWORD), req, 400)
            }

            // * Access Token & Refresh Token
            const accessToken = quicker.generateToken(
                {
                    userId: user.id
                },
                config.ACCESS_TOKEN.SECRET as string,
                config.ACCESS_TOKEN.EXPIRY
            )

            const refreshToken = quicker.generateToken(
                {
                    userId: user.id
                },
                config.REFRESH_TOKEN.SECRET as string,
                config.REFRESH_TOKEN.EXPIRY
            )

            // * Last Login Information
            user.lastLoginAt = dayjs().utc().toDate()
            await user.save()

            // * Refresh Token Store
            const refreshTokenPayload: IRefreshToken = {
                token: refreshToken
            }

            await databaseService.createRefreshToken(refreshTokenPayload)

            // * Cookie Send
            const DOMAIN = quicker.getDomainFromUrl(config.SERVER_URL as string)

            res.cookie('accessToken', accessToken, {
                path: '/api/v1',
                domain: DOMAIN,
                sameSite: 'strict',
                maxAge: 1000 * config.ACCESS_TOKEN.EXPIRY,
                httpOnly: true,
                secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
            }).cookie('refreshToken', refreshToken, {
                path: '/api/v1',
                domain: DOMAIN,
                sameSite: 'strict',
                maxAge: 1000 * config.REFRESH_TOKEN.EXPIRY,
                httpOnly: true,
                secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
            })

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                accessToken,
                refreshToken
            })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { cookies } = req
            const { refreshToken } = cookies as {
                refreshToken: string | undefined
            }

            if (refreshToken) {
                // db -> delete the refresh token
                await databaseService.deleteRefreshToken(refreshToken)
            }

            const DOMAIN = quicker.getDomainFromUrl(config.SERVER_URL as string)

            // Cookies clear
            res.clearCookie('accessToken', {
                path: '/api/v1',
                domain: DOMAIN,
                sameSite: 'strict',
                maxAge: 1000 * config.ACCESS_TOKEN.EXPIRY,
                httpOnly: true,
                secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
            })

            res.clearCookie('refreshToken', {
                path: '/api/v1',
                domain: DOMAIN,
                sameSite: 'strict',
                maxAge: 1000 * config.REFRESH_TOKEN.EXPIRY,
                httpOnly: true,
                secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
            })

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}

