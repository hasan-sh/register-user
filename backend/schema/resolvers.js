function sendResponse(error, success = false, time = Date.now()) {
  return {
    error,
    success,
    time
  }
}

const resolvers = {
  Query: {
    allowedCountries: (parent, args, { models: { AllowedCountries } }) =>
      AllowedCountries.findAll()
  },
  Mutation: {
    // this mutation is just for us to test it. It should be removed on real-wolrd apps!!
    createAllowedCountry: (
      parent,
      { country },
      { models: { AllowedCountries } }
    ) => {
      return AllowedCountries.create({ country })
        .then(() => 'done!')
        .catch(e => console.log('err', e))
    },

    register: async (parent, { username, company, countryId }, { models }) => {
      // I know that I'm checking this in the front-end! But it makes me more comfortable.
      if (!username || !company || !countryId) {
        return sendResponse('Missing Fields.')
      }
      const user = await models.Register.findOne({ where: { username } })
      if (user) {
        return sendResponse('User exists.', false, user.dataValues.createdAt)
      }

      try {
        const { dataValues } = await models.Register.create({
          username,
          company,
          countryId
        })
        return sendResponse(null, true, dataValues.createdAt)
      } catch (error) {
        // Then the country is not allowed. Send info about the allowed ones.
        const allowedCountries = await models.AllowedCountries.findAll()

        return sendResponse(
          `Country is not allowed. Allowed Countries: ${allowedCountries
            .map(({ country }) => country)
            .join(' | ')}`
        )
      }
    }
  }
}

export default resolvers
