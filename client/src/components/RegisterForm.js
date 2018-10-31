import React, { Component } from 'react'

import './Register.css'

class RegisterForm extends Component {
  state = {
    username: '',
    company: '',
    country: '',
    timeEl: null,
    statusEl: null
  }
  timer = null

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  clearStatus = () => {
    this.setState({ timeEl: null, statusEl: null })
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer)
  }

  componentWillReceiveProps = nextProps => {
    const { data } = nextProps

    let timeEl = null
    let statusEl = null
    if (data) {
      const {
        register: { error, success, time }
      } = data
      if (success) {
        this.timer = setTimeout(this.clearStatus, 2000)
        this.setState({ username: '', country: '', company: '' })
      }
      statusEl = (
        <div>
          {!success ? 'Error: ' : 'Success: '}
          <span className="statusBack">
            {success ? 'You have registered!' : error}
          </span>
        </div>
      )
      timeEl = (
        <div>
          Created At:{' '}
          <span className="statusBack">
            {new Date(parseInt(time, 10)).toLocaleString()}
          </span>
        </div>
      )
      this.setState({ timeEl, statusEl })
    }
  }
  render() {
    const { username, company, country, statusEl, timeEl } = this.state
    const { register } = this.props

    return (
      <div className="container">
        <div>
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault()
              if (username && company && country) {
                register({
                  variables: {
                    username,
                    company,
                    country
                  }
                })
              }
            }}
          >
            Register:
            <input
              value={username}
              onChange={this.onChange}
              required
              name="username"
              type="text"
              placeholder="Username"
            />
            <input
              value={company}
              onChange={this.onChange}
              required
              name={'company'}
              type="text"
              placeholder="Company"
            />
            <input
              value={country}
              onChange={this.onChange}
              required
              name={'country'}
              type="text"
              placeholder="Country"
            />
            <button className="registerBtn" type="submit">
              Register
            </button>
          </form>
        </div>
        <hr />
        <CheckStatus
          username={username}
          company={company}
          country={country}
          status={statusEl}
          timeEl={timeEl}
        />
      </div>
    )
  }
}

function CheckStatus(props) {
  return (
    <div className="check">
      Registered:
      <div>Username: {props.username}</div>
      <div>Company: {props.company}</div>
      <div>Country: {props.country}</div>
      <div>{props.status}</div>
      <div>{props.timeEl}</div>
    </div>
  )
}

export default RegisterForm
