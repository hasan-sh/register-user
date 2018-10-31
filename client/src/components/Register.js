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
  componentWillReceiveProps = nextProps => {
    console.log(nextProps)
  }
  onChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }
  render() {
    return (
      <Mutation mutation={REGISTER}>
        {(register, { data }) => {
          return <RegisterFrom register={register} data={data} />
        }}
      </Mutation>
    )
  }
}

export default Register
