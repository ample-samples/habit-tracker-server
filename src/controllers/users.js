import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createUser = async (req, res) => {
  const reqBody = req.body

  try {
    const user = await prisma.user.create({
      data: { ...reqBody },
    })
    console.log('updating habits', user)
    return res.status(201).send({message:"user created"})

  } catch (error) {
    console.log(`Prisma Error ${error.code}`)
    return res.status(400).send({message:`Prisma Error ${error.code}`})
  }

}
