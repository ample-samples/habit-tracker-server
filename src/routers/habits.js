import { Router } from 'express'
import { getAllHabitsByUser, createHabitEntry, updateHabitEntry } from '../controllers/habits.js'

const habitsRouter = Router()

habitsRouter.get("/", getAllHabitsByUser);
habitsRouter.post("/", createHabitEntry);
habitsRouter.patch("/", updateHabitEntry);

export default habitsRouter
