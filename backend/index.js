const express = require('express')
const db = require('./models/db')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')

const PORT = 8081
const endpoint = '/graphql'

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models: db.models },
  playground: { endpoint }
})

server.applyMiddleware({ app })

db.models.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )
})
