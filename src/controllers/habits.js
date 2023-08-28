const exampleData = {
  "habits": [
    {
      "id": 0,
      "date": "2023-05-30",
      "meditation": "15",
      "calories": "1800",
      "sleep": "22",
      "steps": "10000"
    },
    {
      "sleep": "3",
      "calories": "1500",
      "meditation": "6",
      "date": "2023-05-31",
      "id": 1,
      "steps": "14000"
    },
    {
      "sleep": "8",
      "calories": "2000",
      "meditation": "15",
      "date": "2023-06-01",
      "id": 2,
      "steps": "15"
    },
    {
      "steps": "6000",
      "date": "2023-06-02",
      "id": 3,
      "sleep": "6",
      "calories": "20000",
      "meditation": "4"
    }
  ]
}

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllHabitsByUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: "dobebebe"
    },
    include: {
      habits: true
    }
  })
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
