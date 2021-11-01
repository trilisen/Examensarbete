import Option from "../../models/option.js"
import { getOptionsForPoll, getPoll } from "./findData.js"

export default {
  findOptionsForPoll: async (args) => {
    try {
      const options = await getOptionsForPoll(args.pollId)
      return options.map((option) => {
        return {
          ...option._doc,
          poll: getPoll.bind(this, option._doc.poll),
        }
      })
    } catch (err) {
      throw err
    }
  },
  createOption: async (args) => {
    const option = new Option({
      poll: args.optionInput.pollId,
      content: args.optionInput.content,
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
