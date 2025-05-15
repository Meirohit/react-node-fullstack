import express from 'express'
import { getAnswersOfQuestion } from '../controllers/answerControllers.js';

const router = express.Router({ mergeParams: true });

router.get('/', getAnswersOfQuestion)

export default router;