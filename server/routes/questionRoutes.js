import express from 'express'
import { addQuestion, dropQuestion, getQuestions, getQuestionWithId } from '../controllers/questionControllers.js';


const router = express.Router();

router.get('/', getQuestions);
router.post('/', addQuestion);
router.get('/:id', getQuestionWithId);
router.delete('/:id', dropQuestion);


export default router;