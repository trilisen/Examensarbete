import Poll from "../../models/poll.js"
import User from "../../models/user.js"

const getPolls = async (pollIds) => {
  try {
    const polls = await Poll.find({ _id: { $in: pollIds } })
    return polls.map((poll) => {
      return {
        ...poll,
        creator: getUser.bind(this, poll.creator),
      }
    })
  } catch (err) {
    throw err
  }
}

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId)
    return user
  } catch (err) {
    throw err
  }
}

// const getPollsById = async (userId) => {
//   try {
//     const polls = await Poll.find({ creator: userId })
//     return polls
//   } catch (err) {
//     throw err
//   }
// }

export { getPolls, getUser }
