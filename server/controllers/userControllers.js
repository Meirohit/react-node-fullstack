import { getUserById } from "../repositories/userRepo.js";

export const getUserByIdController = async (req, res, next) => {
    try { 
        const id = req.params.id;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({message: `User with id: ${id} not found`})
        }
        res.json(user)
    } catch (err) {
        next(err)
    }
}