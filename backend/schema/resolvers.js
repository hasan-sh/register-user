function sendResponse(error, success = false, time = Date.now()) {
  return {
    error,
    success,
    time
  }
}

const resolvers = {
  Query: {
    hi: () => 'Hi, there!'
  },
  Mutation: {
    createAllowedCountry: (
      parent,
      { country },
      { models: { AllowedCountries } }
    ) => {
      return AllowedCountries.create({ country })
        .then(() => 'done!')
        .catch(e => console.log('err', e))
    },

    register: async (parent, { username, company, country }, { models }) => {
      // I know that I'm checking this in the front-end! But it makes me more comfortable.
      if (!username || !company || !country) {
        return sendResponse('Missing Fields.')
      }
      const user = await models.Register.findOne({ where: { username } })
      if (user) {
        return sendResponse('User exists.', false, user.dataValues.createdAt)
      }
      const allowedCountry = await models.AllowedCountries.findOne({
        where: { country: country.toUpperCase() }
      })

      if (allowedCountry) {
        const {
          dataValues: { countryId }
        } = allowedCountry

        const { dataValues } = await models.Register.create({
          username,
          company,
          countryId
        })
        return sendResponse(null, true, dataValues.createdAt)
      } else {
        // Then the country is not allowed. Send info about the allowed ones.
        const allowedCountries = await models.AllowedCountries.findAll()

        return sendResponse(
          `'${country}' is not allowed. Allowed Countries: ${allowedCountries
            .map(({ country }) => country)
            .join(' | ')}`
        )
      }
    }
  }
}

export default resolvers
