const resolvers = {
  Query: {
    hi: () => 'Hi, there!'
  },
  Mutation: {
    register: (parent, args, context) => {
      return {}
    }
  }
}

module.exports = resolvers
