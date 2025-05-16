import express from 'express'
import { addQuestion, dropQuestion, editQuestionById, getQuestions, getQuestionWithId } from '../controllers/questionControllers.js';


const router = express.Router();

router.get('/', getQuestions);
router.post('/', addQuestion);
router.get('/:id', getQuestionWithId);
router.delete('/:id', dropQuestion);
router.put('/:id', editQuestionById);


export default router;