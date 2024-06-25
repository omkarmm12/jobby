import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onUserName = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    this.loginRequest()
  }

  loginRequest = async () => {
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    try {
      const responseData = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', responseData.jwt_token)
        this.setState({username: '', password: '', errorMsg: ''})
        history.replace('/')
      } else {
        this.setState({errorMsg: responseData.error_msg})
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderLoginFormCard = () => {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-form-card">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-form-web-logo"
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="input-field-container">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              onChange={this.onUserName}
              value={username}
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={this.onPassword}
              value={password}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {errorMsg === '' ? '' : <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="login-form-container">{this.renderLoginFormCard()}</div>
    )
  }
}
export default LoginForm
