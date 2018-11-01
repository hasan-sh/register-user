const allowedCountries = [
  'NETHERLANDS',
  'SPAIN',
  'FRANCE',
  'GERMANY',
  'BELGIUM',
  'FINLAND',
  'DENMARK',
  'SWEDEN',
  'RUSSIA'
]

function validateCountry(inputCountry) {
  const country = inputCountry.toUpperCase()
  return allowedCountries.includes(country)
}

const resolvers = {
  Query: {
    hi: () => 'Hi, there!'
  },
  Mutation: {
    register: async (parent, { username, company, country }, { models }) => {
      try {
        const validCountry = validateCountry(country)
        if (!validCountry) throw Error('Country not valid')

        const user = await models.Register.findOne({ where: { username } })
        if (user && !validCountry)
          throw Error('User exists and not valid country.')
        if (user) throw Error('User exists.')

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
      } catch (error) {
        return {
          error: error.message,
          success: false,
          time: Date.now()
        }
      }
    }
  }
}

export default resolvers
