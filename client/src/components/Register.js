import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import RegisterFrom from './RegisterForm'

const REGISTER = gql`
  mutation Register($username: String!, $country: String!, $company: String!) {
    register(username: $username, country: $country, company: $company) {
      error
      success
      time
    }
  }
`

class Register extends Component {
  render() {
    return (
      <Mutation mutation={REGISTER}>
        {(register, { data, error }) => {
          if (error) return <div className="error">{error.message}</div>
          return <RegisterFrom register={register} data={data} />
        }}
      </Mutation>
    )
  }
}

export default Register
