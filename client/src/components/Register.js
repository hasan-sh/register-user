import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import RegisterFrom from './RegisterForm'

const GET_ALLOWED_COUNTRIES = gql`
  {
    allowedCountries {
      country
      countryId
    }
  }
`

class Register extends Component {
  render() {
    return (
      <Query query={GET_ALLOWED_COUNTRIES}>
        {({ data, error }) => {
          if (error) return <div className="error">{error.message}</div>
          return <RegisterFrom data={data} />
        }}
      </Query>
    )
  }
}

export default Register
