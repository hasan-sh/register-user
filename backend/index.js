const express = require('express')
const db = require('./models/db')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const cors = require('cors')

const PORT = 8080
const endpoint = '/graphql'

const app = express()
app.use(cors('*'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models: db.models },
  playground: { endpoint }
})

server.applyMiddleware({ app })

db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )
})
