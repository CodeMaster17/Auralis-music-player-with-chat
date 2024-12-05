import { Router } from 'express'
import authController from '../controller/authController'
import rateLimit from '../middleware/rateLimit'

const router = Router()

router.route('/self').get(authController.self)
router.route('/health').get(authController.health)

// Authentication routes
router.route('/register').post(rateLimit, authController.register)

router.route('/login').post(rateLimit, authController.login)

export default router

