const resolvers = {
  Query: {
    hi: () => 'Hi, there!'
  },
  Mutation: {
    register: async (parent, { username, company, country }, { models }) => {
      // I know that I'm checking this in the front-end! But it makes me more comfortable.
      if (!username || !company || !country) {
        return {
          error: 'Missing Fields.',
          success: false,
          time: Date.now()
        }
      }

      const user = await models.Register.findOne({ where: { username } })
      if (user) {
        return {
          error: 'User exists.',
          success: false,
          time: user.dataValues.createdAt
        }
      }
      const { dataValues } = await models.Register.create({
        username,
        company,
        country
      })
      return {
        error: null,
        success: true,
        time: dataValues.createdAt
      }
    }
  }
}

export default resolvers
