import jwt from 'jsonwebtoken'
const secret = process.env.JWT_TOKEN;

export const register = async (req, res) => {
  const { email, password } = req.body
}
