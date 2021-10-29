import bcrypt from "bcryptjs"
import User from "../../models/user.js"

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
}
