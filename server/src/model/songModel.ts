import mongoose from 'mongoose'

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        auidoUrl: {
            type: String,
            required: true
        },
        duration: {
            tyype: Number,
            required: true
        },
        albumId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            required: false
        }
    },
    { timestamps: true }
)

export const Song = mongoose.model('Song', songSchema)
