import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './Register.css'

const REGISTER = gql`
  mutation Register($username: String!, $countryId: Int!, $company: String!) {
    register(username: $username, countryId: $countryId, company: $company) {
      error
      success
      time
    }
  }
`
class RegisterForm extends Component {
  state = {
    username: '',
    company: '',
    country: '',
    timeEl: null,
    statusEl: null
  }
  timer = null

  componentWillUnmount = () => {
    clearTimeout(this.timer)
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  clearState = () => {
    this.setState({
      username: '',
      country: '',
      company: '',
      timeEl: null,
      statusEl: null
    })
  }

  onSubmit = async ({ event, register }) => {
    event.preventDefault()
    const { username, company, country } = this.state

    const options = document.querySelectorAll('#list option')
    let countryId = ''
    options.forEach(option => {
      if (option.value === country) {
        countryId = option.id
      }
    })

    if (username && company && country && countryId) {
      const {
        data: {
          register: { error, time, success }
        }
      } = await register({
        variables: {
          username,
          company,
          countryId: parseInt(countryId, 10)
        }
      })
      let timeEl = null
      let statusEl = null
      if (success) {
        this.timer = setTimeout(this.clearState, 2000)
        statusEl = (
          <div>
            {'Success: '}
            <span className="statusBack">You have registered!</span>
          </div>
        )
      } else if (error) {
        statusEl = (
          <div>
            {'Error: '}
            <span className="statusBack">{error}</span>
          </div>
        )
      }
      timeEl = (
        <div>
          Created At:{' '}
          <span className="statusBack">
            {new Date(parseInt(time, 10)).toLocaleString()}
          </span>
        </div>
      )
      this.setState({ timeEl, statusEl })
    } else {
      const mes = !countryId
        ? 'Please select from the country list.'
        : 'Please fill in the required fields.'
      alert(mes)
    }
  }

  render() {
    const { username, company, country, statusEl, timeEl } = this.state
    const { data } = this.props
    return (
      <Mutation mutation={REGISTER}>
        {(register, { error }) => {
          if (error) return <div className="error">{error.message}</div>
          return (
            <div className="container">
              <div>
                <form
                  className="form"
                  onSubmit={event => this.onSubmit({ event, register })}
                >
                  <span className="title"> UPINION CODING CHALLENGE:</span>
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                    value={username}
                    onChange={this.onChange}
                  />
                  <input
                    type="text"
                    name={'company'}
                    required
                    placeholder="Company"
                    value={company}
                    onChange={this.onChange}
                  />
                  <input
                    type="search"
                    name="country"
                    required
                    list="list"
                    placeholder="Country"
                    value={country}
                    onChange={this.onChange}
                  />
                  <datalist id="list">
                    {data &&
                      data.allowedCountries &&
                      data.allowedCountries.map(({ country, countryId }, i) => (
                        <option key={i} id={countryId} value={country} />
                      ))}
                    }
                  </datalist>

                  <button className="registerBtn" type="submit">
                    Register
                  </button>
                </form>
              </div>
              {statusEl && (
                <CheckStatus
                  username={username}
                  company={company}
                  country={country}
                  status={statusEl}
                  timeEl={timeEl}
                />
              )}
            </div>
          )
        }}
      </Mutation>
    )
  }
}

function CheckStatus(props) {
  return (
    <React.Fragment>
      <hr />
      <div className="check">
        Registered:
        <div>Username: {props.username}</div>
        <div>Company: {props.company}</div>
        <div>Country: {props.country}</div>
        <div>{props.status}</div>
        <div>{props.timeEl}</div>
      </div>
    </React.Fragment>
  )
}

export default RegisterForm
