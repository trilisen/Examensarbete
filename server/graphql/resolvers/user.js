import bcrypt from "bcryptjs"
import User from "../../models/user.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default {
  users: async () => {
    try {
      const users = await User.find()
      return users
    } catch (err) {
      throw err
    }
  },
  createUser: async (args) => {
    try {
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

      const user = new User({
        email: args.userInput.email,
        username: args.userInput.username,
        password: hashedPassword,
      })

      const result = await user.save()

      return {
        ...result._doc,
        password: null,
      }
    } catch (err) {
      throw err
    }
  },
  login: async (args) => {
    const user = await User.findOne({ email: args.email })
    if (!user) {
      throw new Error("Email and password don't match")
    }
    const compareCheck = await bcrypt.compare(args.password, user.password)
    if (!compareCheck) {
      throw new Error("Email and password don't match")
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_PHRASE,
      {
        expiresIn: "1h",
      }
    )
    return { userId: user._id, token: token, tokenExpiration: 1 }
  },
}
