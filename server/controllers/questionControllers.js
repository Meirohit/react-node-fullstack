import { Question } from '../models/Question.js';
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById } from '../repositories/questionRepo.js';

export const getQuestions = async (req, res, next) => {
    try {
        const questions = await getAllQuestions();
        res.json(questions)
    }
    catch (err) {
        next(err);
    }
}

export const getQuestionWithId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await getQuestionById(id);
        if (!question) {
            res.status(404).json({ message: `Question with id: ${id} not found` })
        }
        res.json(question)
    } catch (err) {
        next(err)
    }
}


export const addQuestion = async (req, res, next) => {
    try {
        const { text, author, date } = req.body
        if (!text || !author || !date) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Missing required fields: text, author and date are required"
            })
        }

        let question = new Question(null, text, author, date)
        const createdQuestion = await createQuestion(question)
        res.status(201).json(createdQuestion)
    } catch (err) {
        next(err);
    }
}

export const dropQuestion = async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await getQuestionById(id);
        if (!question) {
            res.status(404).json({
                message: `Question with id: ${id} not found`
            })
        }

        const result = await deleteQuestion(id);
        if (result.success) {
            res.status(204).send()
        } else {
            res.status(500).json(
                { message: result.message || 'Question delete unsuccessful' }
            )
        }
    } catch (err) {
        next(err)
    }
}