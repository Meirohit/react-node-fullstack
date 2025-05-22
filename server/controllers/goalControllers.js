import { Goal } from '../models/Goal.js';
import { createGoal, deleteGoal, editGoal, getAllGoals, getGoalById } from '../repositories/goalRepo.js';
import { getUserById } from '../repositories/userRepo.js';

export const getAllGoalsController = async (req, res, next) => {
    try {
        const goals = await getAllGoals();
        res.json(goals)
    }
    catch (err) {
        next(err);
    }
}

export const getGoalByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const goal = await getGoalById(id);
        if (!goal) {
            res.status(404).json({ message: `Goal with id: ${id} not found` })
        }
        res.json(goal)
    } catch (err) {
        next(err)
    }
}


export const createGoalController = async (req, res, next) => {
    try {
        const { user_id, title, description, estimated_time } = req.body
        if (!user_id || !title || !estimated_time) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Missing required fields: user_id, title, estimated_time are required"
            })
        }
        const user = await getUserById(user_id)
        if (!user) {
            return res.status(404).json({message: `User with id: ${user_id} not found`})
        }

        let goal = new Goal(null, user_id, title, description, estimated_time)
        const createdGoal = await createGoal(goal)
        res.status(201).json(createdGoal)
    } catch (err) {
        next(err);
    }
}

export const deleteGoalController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const goal = await getGoalById(id);
        if (!goal) {
            res.status(404).json({
                message: `Goal with id: ${id} not found`
            })
        }

        const result = await deleteGoal(id);
        if (result.success) {
            res.status(204).send()
        } else {
            res.status(500).json(
                { message: result.message || 'Goal delete unsuccessful' }
            )
        }
    } catch (err) {
        next(err)
    }
}

export const editGoalController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description, estimated_time } = req.body;
        if (!title || !estimated_time) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Missing required fields: title and estimated_time are required"
            })
        }
        const goal = await getGoalById(id);
        if (!goal) {
            return res.status(404).json({
                message: `Goal with id: ${id} not found`
            })
        }

        const result = await editGoal(id, title, description, estimated_time)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}