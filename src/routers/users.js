import { Router } from 'express'
import { createUser } from '../controllers/users.js'

const userRouter = Router()

// userRouter.get("/", getUsers)
userRouter.post("/", createUser)

export default userRouter
