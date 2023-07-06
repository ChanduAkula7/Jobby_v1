import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
// import {async} from 'fast-glob'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    showErrorMsg: false,
    errorMsg1: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onfailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg1: errorMsg})
  }

  submit = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const username = userName
    const userDetails = {username, password}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response.ok)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onfailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
    // console.log(userName)
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUserName = () => {
    const {userName} = this.state
    return (
      <>
        <label className="userlabel" htmlFor="input">
          USERNAME
        </label>
        <input
          type="text"
          className="passwordEle"
          id="input"
          value={userName}
          onChange={this.onChangeUsername}
          placeholder="UserName"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="passwordlabel" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="password"
          className="passwordEle"
          id="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg1} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-container">
          <form className="login" onSubmit={this.submit}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="btn1">
              Login
            </button>
            <div className="err">
              {showErrorMsg && <p className="error">{errorMsg1}</p>}
            </div>
          </form>
        </div>
      </>
    )
  }
}
export default Login
