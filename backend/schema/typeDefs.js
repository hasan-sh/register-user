import { gql } from 'apollo-server-express'

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

  type Country {
    country: String!
    countryId: Int!
  }
  type Query {
    allowedCountries: [Country!]!
  }

  type Mutation {
    register(
      username: String!
      company: String!
      countryId: Int!
    ): RegisterResponse!
    createAllowedCountry(country: String!): String
  }
`

export default typeDefs
