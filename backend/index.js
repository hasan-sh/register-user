import express from 'express'
import { models as _models, sequelize } from './models/db'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'
import cors from 'cors'

const PORT = 8080
const endpoint = '/graphql'

const app = express()
app.use(cors('*'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models: _models },
  playground: { endpoint }
})

server.applyMiddleware({ app })

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )
})
