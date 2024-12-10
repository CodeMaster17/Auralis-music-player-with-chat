import { clerkClient } from '@clerk/express'
import httpError from '../util/httpError'
import { NextFunction, Request } from 'express'

interface AuthenticatedRequest extends Request {
    auth: {
        userId: string
    }
}

export const protectRoute = (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
    if (!req.auth.userId) {
        return httpError(next, new Error('User not authenticated'), req, 404)
    }
    next()
}
export const requireAdmin = async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

        if (!isAdmin) {
            return httpError(next, new Error('Unauthorized - you must be an admin'), req, 403)
        }

        next()
    } catch (error) {
        next(error)
    }
}

