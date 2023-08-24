import { Router } from 'express'
import { getHabits } from '../controllers/habits.js'

const habitsRouter = Router()

habitsRouter.get("/", getHabits);
// habitsRouter.post("/", updateHabits);

export default habitsRouter
