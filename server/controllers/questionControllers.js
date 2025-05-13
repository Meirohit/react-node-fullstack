import { getAllQuestions } from '../repositories/questionRepo.js';

export const getQuestions = async (req, res, next) => {
    try {
        const questions = await getAllQuestions();
        res.json(questions)
    }
    catch (err) {
        next(err);
    }
}
