import Option from "../../models/option.js"
import Poll from "../../models/poll.js"
import User from "../../models/user.js"

const getPoll = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId)
    if (poll.creator !== null) {
      return {
        ...poll._doc,
        creator: getUser.bind(this, poll.creator),
      }
    }
    return poll._doc
  } catch (err) {
    throw err
  }
}

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      password: null,
    }
  } catch (err) {
    throw err
  }
}

const getPollsByUserId = async (userId) => {
  try {
    const polls = await Poll.find({ creator: userId })
    return polls
  } catch (err) {
    throw err
  }
}

const getOptionsForPoll = async (pollId) => {
  try {
    const options = await Option.find({ poll: pollId })
    return options
  } catch (err) {
    throw err
  }
}

export { getPoll, getUser, getPollsByUserId, getOptionsForPoll }
