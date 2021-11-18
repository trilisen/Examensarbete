import { buildSchema } from "graphql"

export default buildSchema(`
type Poll {
  _id: ID!
  title: String!
  description: String
  creator: User!
  createdAt: String!
  updatedAt: String!
}

type Option {
  _id: ID!
  poll: Poll!
  content: String!
  votes: [Vote!]
}

type Vote {
  _id: ID!
  option: Option!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type User {
  _id: ID!
  email: String!
  username: String!
  password: String
}

type LoginData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input PollInput {
  title: String!
  description: String
}

input UserInput {
  email: String!
  username: String!
  password: String!
}

input OptionInput {
  pollId: ID!
  content: String!
}

type RootQuery {
  polls: [Poll!]!
  findOptionsForPoll(pollId: ID!): [Option!]!
  findPolls(id: ID!): [Poll!]!
  findPollById(id: ID!): Poll!
  users: [User!]!
  login(email: String!, password: String!): LoginData!
}

type RootMutation {
  createPoll(pollInput: PollInput): Poll
  createUser(userInput: UserInput): User
  createOption(optionInput: OptionInput): Option
  deleteOption(id: ID!): Option
  createVote(optionId: ID!): Vote
}

schema {
  query: RootQuery 
  mutation: RootMutation
}
`)
