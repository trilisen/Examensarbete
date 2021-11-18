import Vote from "../../models/vote.js"
import Option from "../../models/option.js"

export default {
  createVote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!")
    }
    const vote = new Vote({
      option: args.optionId,
      user: req.userId,
    })
    try {
      const result = await vote.save()
      const option = await Option.findById(args.optionId)
      if (!option) {
        throw new Error("Option not found")
      }
      option.votes.push(vote)
      await option.save()
      return result
    } catch (err) {
      throw err
    }
  },
}
