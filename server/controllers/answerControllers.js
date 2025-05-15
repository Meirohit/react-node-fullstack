import { getAnswersForQuestion } from "../repositories/answerRepo.js";
import { getQuestionById } from "../repositories/questionRepo.js";

export const getAnswersOfQuestion = async (req, res, next) => {
    try {
        const questionId = req.params.id;
        const question  = await getQuestionById(questionId);
        if (!question) {
            return res.status(404).json({ message: `Question with id: ${questionId} not found` })
        }
        const answers = await getAnswersForQuestion(questionId)
        res.json(answers)
    } catch (err) {
        next(err)
    }
}