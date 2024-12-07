import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constant/responseMessage'
import { Album } from '../model/albumModel'
import { Song } from '../model/songModel'
import cloudinary from '../service/cloudinaryService'
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import fileUpload from 'express-fileupload'

// Define the file type for better type safety

// Function to upload files to Cloudinary
const uploadToCloudinary = async ({ file }: { file: fileUpload.UploadedFile }): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto'
        })
        return result.secure_url
    } catch (error) {
        throw new Error(error as string)
    }
}

// Create a song
export const createSong = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Validate that files are present
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            httpResponse(req, res, 400, responseMessage.MISSING_FILE)
            return
        }

        // Extract body parameters and uploaded files
        const { title, artist, albumId, duration } = req.body
        const audioFile = req.files.audioFile as fileUpload.UploadedFile
        const imageFile = req.files.imageFile as fileUpload.UploadedFile

        // Upload audio and image files to Cloudinary
        const audioUrl = await uploadToCloudinary({ file: audioFile })
        const imageUrl = await uploadToCloudinary({ file: imageFile })

        // Create a new song document
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        // Save the song to the database
        await song.save()

        // If the song belongs to an album, update the album's song list
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            })
        }

        // Send the created song as a response
        res.status(201).json(song)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

