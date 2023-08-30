import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const generateUser = async () => {
  const user = await prisma.user.create({
    data: {
      "name": "todd123",
      "email": "todd@gmail.com",
      "password": "123"
    }
  })
  console.log("Creating user:", user)
}


const generateHabit = async () =>  {
  const newHabits = await prisma.habits.create({
    data: {
    "date": "2023-05-31",
    "steps": 2000,
    "sleep": 8,
    "meditation": 15,
    user: {
      connect: {
        id: 1
      }
    }
  }
  })
}

await generateUser()
await generateHabit()
