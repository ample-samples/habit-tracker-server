import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const saltRounds = 10

export const createUser = async (req, res) => {
  const { name, email, password } = req.body

  if (!email || !password) return res.status(403).send({message: 'Please enter a valid email and password'})

  bcrypt.hash(password, saltRounds, async function(err, hashedPassword) {

    try {
      const user = await prisma.user.create({
        data: { name, password: hashedPassword, email }
      })
      .then((user) => {
          const token = jwt.sign(email, process.env.JWT_SECRET)
          return res.status(201).json({ user: { email: user.email, id: user.id }, message: "new user created", token })
        })
    } catch (error) {
      console.log(error)
      return res.status(403).send({message: 'Error, email is taken'})
    }

  })

  // try {
  //   const user = await prisma.user.create({
  //     data: { name, email, password: hashedPassword },
  //   })
  //   console.log('updating user', user)
  //   return res.status(201).send({message:"user created"})
  //
  // } catch (error) {
  //   console.log(`Prisma Error ${error.code}`)
  //   return res.status(400).send({message:`Prisma Error ${error.code}`})
  // }
}
