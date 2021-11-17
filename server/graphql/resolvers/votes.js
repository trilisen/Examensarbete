import Vote from "../../models/vote.js"

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
      const result = await option.save()
      return {
        ...result._doc,
        poll: getPoll.bind(this, result._doc.poll),
      }
    } catch (err) {
      throw err
    }
  },
}
