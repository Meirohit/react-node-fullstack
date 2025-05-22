import express from 'express'
import { getTasksOfGoalController } from '../controllers/taskControllers.js';

const router = express.Router({ mergeParams: true });

router.get('/', getTasksOfGoalController)

export default router;