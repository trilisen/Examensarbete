import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import mongoose from "mongoose"

import Poll from "./models/poll.js"

const app = express()

const polls = []

app.use(express.json())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Poll {
      _id: ID!
      title: String!
      description: String
      image: String
    }

    input PollInput {
      title: String!
      description: String
      image: String
    }

    type RootQuery {
      polls: [Poll!]!
    }

    type RootMutation {
      createPoll(pollInput: PollInput): Poll
    }

    schema {
      query: RootQuery 
      mutation: RootMutation
    }
  `),
    rootValue: {
      polls: () => {
        return Poll.find()
          .then((polls) => {
            return polls
          })
          .catch((err) => {
            throw err
          })
      },
      createPoll: (args) => {
        const poll = new Poll({
          title: args.pollInput.title,
          description: args.pollInput.description,
          image: args.pollInput.image,
        })
        return poll
          .save()
          .then((result) => {
            return result
          })
          .catch((err) => {
            throw err
          })
      },
    },
    graphiql: process.env.NODE_ENV === "development" ? true : false,
  })
)

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Express server listening on ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })
