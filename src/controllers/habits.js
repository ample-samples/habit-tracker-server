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

export const getHabits = async (req, res) => {
  console.log('getting habits')
  return res.status(200).json(exampleData.habits)
}

