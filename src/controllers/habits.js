import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllHabitsByUser = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(200).json({message:"an email must be provided", habits: []})
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      habits: true
    }
  })
  const respContent = user && user.habits
  return res.status(200).json(user.habits)
}

export const createHabitEntry = async (req, res) => {

  const { date, userId, steps, sleep, calories, meditation } = req.body

  let habitsToUpdate = {}

  if(steps) habitsToUpdate = {...habitsToUpdate, steps: Number(steps)}
  if(sleep) habitsToUpdate = {...habitsToUpdate, sleep: Number(sleep)}
  if(calories) habitsToUpdate = {...habitsToUpdate, calories: Number(calories)}
  if(meditation) habitsToUpdate = {...habitsToUpdate, meditation: Number(meditation)}
  console.log({habitsToUpdate})

  const oldHabits = await prisma.habits.findUnique({
    where: {
      userId,
      date
    }
  })

  if (!oldHabits) {
    const newHabits = await prisma.habits.create({
      data: {
        ...habitsToUpdate,
        user: {
          connect: {
            id: userId
          }
        },
        date
      },
    })
    return res.json(newHabits)
  } else {
    return res.send("Habit for date exists")
  }
}

export const updateHabitEntry = async (req, res) => {
  console.log("Patching habit")
  const { date, userId, steps, sleep, calories, meditation } = req.body

  let habitsToUpdate = {}

  if(steps) habitsToUpdate = {...habitsToUpdate, steps: Number(steps)}
  if(sleep) habitsToUpdate = {...habitsToUpdate, sleep: Number(sleep)}
  if(calories) habitsToUpdate = {...habitsToUpdate, calories: Number(calories)}
  if(meditation) habitsToUpdate = {...habitsToUpdate, meditation: Number(meditation)}
  console.log({habitsToUpdate})

    const newHabits = await prisma.habits.update({
      where: {
        date,
        userId
      },
      data: {
        ...habitsToUpdate,
      }
    })


    return res.json(newHabits)
}
