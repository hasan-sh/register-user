const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: Int!
    uesrname: String!
    company: String!
    country: String
  }

  type RegisterResponse {
    error: String
    success: Boolean!
    time: String!
  }

  type Query {
    hi: String
  }

  type Mutation {
    register(
      username: String!
      company: String!
      country: String!
    ): RegisterResponse
  }
`

module.exports = typeDefs
