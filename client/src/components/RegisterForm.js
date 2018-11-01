import React, { Component } from 'react'
import allowedEntries from '../allowedEntries'

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

  componentWillUnmount = () => {
    clearTimeout(this.timer)
  }

  onChange = e => {
    const { name, value } = e.target
    console.log(name, value)
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

  onSubmit = async e => {
    e.preventDefault()
    const { username, company, country } = this.state
    if (username && company && country) {
      const {
        data: {
          register: { error, time, success }
        }
      } = await this.props.register({
        variables: {
          username,
          company,
          country
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
    }
  }
  render() {
    const { username, company, country, statusEl, timeEl } = this.state

    return (
      <div className="container">
        <div>
          <form className="form" onSubmit={this.onSubmit}>
            <span className="title"> UPINION CODING CHALLANGE:</span>
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
            <select required name="country" onChange={this.onChange}>
              <option value="">Select Country</option>
              {allowedEntries.countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
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
