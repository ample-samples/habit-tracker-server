import { Router } from 'express'
import { getAllHabitsByUser, updateHabitEntry } from '../controllers/habits.js'

const habitsRouter = Router()

habitsRouter.get("/", getAllHabitsByUser);
habitsRouter.post("/", updateHabitEntry);

export default habitsRouter
