import mongoose from 'mongoose'
import { IUser } from '../types/userTypes'

const userSchema = new mongoose.Schema<IUser>(
    
       {
		fullName: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true } 

)

export default mongoose.model<IUser>('user', userSchema)

