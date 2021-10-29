import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"

import schema from "./graphql/schema/index.js"
import resolvers from "./graphql/resolvers/index.js"

const app = express()

app.use(express.json())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
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
