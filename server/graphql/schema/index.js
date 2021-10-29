import { buildSchema } from "graphql"

export default buildSchema(`
type Poll {
  _id: ID!
  title: String!
  description: String
  image: String
  creator: User!
  createdAt: String!
  updatedAt: String!
}

type Option {
  _id: ID!
  poll: Poll!
  content: String!
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

input PollInput {
  title: String!
  description: String
  image: String
}

input UserInput {
  email: String!
  username: String!
  password: String!
}

type RootQuery {
  polls: [Poll!]!
  users: [User!]!
  findPolls(id:ID): [Poll!]!
}

type RootMutation {
  createPoll(pollInput: PollInput): Poll
  createUser(userInput: UserInput): User
}

schema {
  query: RootQuery 
  mutation: RootMutation
}
`)
