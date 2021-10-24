import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const app = express()

app.use(express.json())

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Poll {
      _id: ID!
      title: String!
      description: String
      image: String
    }

    type RootQuery {
      polls: [String!]!
    }

    type RootMutation {
      createPoll(title: String): String
    }

    schema {
      query: RootQuery 
      mutation: RootMutation
    }
  `),
  rootValue: {
    polls: () => {
      return ['Baba boey', 'Fafa foey']
    },
    createPoll: (args) => {
      const pollTitle = args.title
      return pollTitle
    }
  },
  graphiql: true
}))

app.listen(4000)