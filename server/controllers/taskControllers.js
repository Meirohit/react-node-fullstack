import { getGoalById } from "../repositories/goalRepo.js";
import { getTasksOfGoal } from "../repositories/taskRepo.js";

export const getTasksOfGoalController = async (req, res, next) => {
    try {
        const goalId = req.params.id;
        const goal  = await getGoalById(goalId);
        if (!goal) {
            return res.status(404).json({ message: `Goal with id: ${goalId} not found` })
        }
        const tasks = await getTasksOfGoal(goalId)
        res.json(tasks)
    } catch (err) {
        next(err)
    }
}