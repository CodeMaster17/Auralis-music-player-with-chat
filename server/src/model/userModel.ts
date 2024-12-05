import mongoose from 'mongoose'
import { IUser } from '../types/userTypes'
import { EUserRole } from '../constant/userConstant'

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 72,
            required: true
        },
        emailAddress: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            _id: false,
            isoCode: {
                type: String,
                required: true
            },
            countryCode: {
                type: String,
                required: true
            },
            internationalNumber: {
                type: String,
                required: true
            }
        },
        timezone: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            default: EUserRole.USER,
            enum: EUserRole,
            required: true
        },
        lastLoginAt: {
            type: Date,
            default: null
        },
        consent: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model<IUser>('user', userSchema)

