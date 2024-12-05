import { v2 as cloudinary } from 'cloudinary'
import config from '../config/config'

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY.CLOUDINARY_API_SECRET
})

export default cloudinary

