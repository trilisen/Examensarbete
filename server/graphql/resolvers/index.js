import userResolver from "./user.js"
import pollsResolver from "./polls.js"
import optionsResolver from "./options.js"
import votesResolver from "./votes.js"

const rootResolver = {
  ...userResolver,
  ...pollsResolver,
  ...optionsResolver,
  ...votesResolver,
}

export default rootResolver
