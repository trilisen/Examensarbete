import Poll from "../../models/poll.js"
import { getUser, getPolls } from "./findData.js"

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
  createPoll: async (args) => {
    const poll = new Poll({
      title: args.pollInput.title,
      description: args.pollInput.description,
      image: args.pollInput.image,
      creator: "617be706c02b009a68096474",
    })
    try {
      const result = await poll.save()
      return result
    } catch (err) {
      throw err
    }
  },
}
