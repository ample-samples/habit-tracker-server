import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })


  bcrypt
      .compare(password, user.password)
      .then(res => {
        console.log(res) // return true
      })
      .catch(err => console.error(err.message))

  return res.json({message:""})
}
