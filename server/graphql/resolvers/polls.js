import Poll from "../../models/poll.js"
import { getUser, getPollsByUserId } from "./findData.js"

export default {
  polls: async () => {
    try {
      const polls = await Poll.find()
      return polls.map((poll) => {
        return {
          ...poll._doc,
          creator: getUser.bind(this, poll._doc.creator),
        }
      })
    } catch (err) {
      throw err
    }
  },
  createPoll: async (args, req) => {
    const poll = new Poll({
      title: args.pollInput.title,
      description: args.pollInput.description,
      image: args.pollInput.image,
      creator: req.isAuth ? req.userId : null,
    })
    try {
      const result = await poll.save()
      return result
    } catch (err) {
      throw err
    }
  },
  findPolls: async (args) => {
    try {
      const polls = await getPollsByUserId(args.id)

      return polls.map((poll) => {
        return {
          ...poll._doc,
          creator: getUser.bind(this, poll._doc.creator),
        }
      })
    } catch (err) {
      throw err
    }
  },
}
