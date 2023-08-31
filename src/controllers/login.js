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

  if(!user) return res.status(403).json({message:"login unsuccessful", profile: false})

  const userProfile = {email: user.email, name: user.name, userId: user.id }


  const loginSuccess = await bcrypt
      .compare(password, user.password)
      .catch(err => console.error(err.message))
  console.log(loginSuccess)
  console.log(loginSuccess&&user)
  return res.json({
    message:loginSuccess ? "login successful" : "incorrect username and/or password",
    profile: loginSuccess&&userProfile
  })
}
