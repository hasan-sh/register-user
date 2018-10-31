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

const resolvers = {
  Query: {
    hi: () => 'Hi, there!'
  },
  Mutation: {
    register: (parent, { username, company, country }, { models }) => {
      return models.Register.findOne({ where: { username } })
        .then(user => {
          const validCountry = validateCountry(country)
          if (user && !validCountry)
            throw Error('User exists and not valid country.')
          if (user) throw Error('User exists.')
          if (!validCountry) throw Error('Country not valid')

          return models.Register.create({ username, company, country }).then(
            ({ dataValues }) => {
              return {
                error: null,
                success: true,
                time: dataValues.createdAt
              }
            }
          )
        })
        .catch(error => {
          return {
            error: error.message,
            success: false,
            time: Date.now()
          }
        })

      // return models.Register.create(args)
      //   .then(({ dataValues }) => {
      //     return {
      //       error: null,
      //       success: true,
      //       time: dataValues.createdAt
      //     }
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //     const { message } = err.errors[0]
      //     return {
      //       error: message,
      //       success: false,
      //       time: Date.now()
      //     }
      //   })
      // return register(args)
    }
  }
}

function validateCountry(inputCountry) {
  const country = inputCountry.toUpperCase()
  return allowedCountries.includes(country)
}

module.exports = resolvers
