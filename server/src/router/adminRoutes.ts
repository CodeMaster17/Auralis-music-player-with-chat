import { Router } from 'express'
import { createSong } from '../controller/adminController'

const router = Router()

router.post('/songs', createSong)

export default router

