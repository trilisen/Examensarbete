import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"

import schema from "./graphql/schema/index.js"
import resolvers from "./graphql/resolvers/index.js"

import isAuth from "./middleware/is-auth.js"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === "development" ? true : false,
  })
)

const PORT = process.env.PORT || 4000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Express server listening on ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })
