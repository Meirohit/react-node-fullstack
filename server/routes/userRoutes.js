import express from 'express'
import { getUserByIdController } from '../controllers/userControllers.js'

const router = express.Router()

router.use('/:id', getUserByIdController)

export default router;