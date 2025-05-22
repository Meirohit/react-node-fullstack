import express from 'express'
import { getAllGoalsController, getGoalByIdController, createGoalController, deleteGoalController, editGoalController} from '../controllers/goalControllers.js';


const router = express.Router();

router.get('/', getAllGoalsController);
router.post('/', createGoalController);
router.get('/:id', getGoalByIdController);
router.delete('/:id', deleteGoalController);
router.put('/:id', editGoalController);


export default router;