import Poll from "../../models/poll.js"
import { getUser, getPollsByUserId, getPoll } from "./findData.js"

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
    if (!req.isAuth) {
      throw new Error("Unauthenticated!")
    }
    const poll = new Poll({
      title: args.pollInput.title,
      description: args.pollInput.description,
      creator: req.userId,
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
  findPollById: async (args) => {
    return getPoll(args.id)
  },
}
