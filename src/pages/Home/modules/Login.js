import React, { Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {logIn} from 'store/modules/actions'

class Login extends Component {

  state = {
    email: 'default@default.com',
    password: ''
  }

  pressEnterKey = (e) => {
    const key = e.which || e.keyCode
    if (key === 13) {
      e.preventDefault()
      this.handleLogin()
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.pressEnterKey)
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.pressEnterKey)
  }

  handleLogin = () => {
    const {email, password} = this.state
    if(password.length){
      console.log('loginAttempt', email, password)
      logIn(this.props.dispatch, email, password)
    }
  }

  handleTextInput = (e) => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  render () {
    const {email, password} = this.state
    const {error, errorMessage, text} = this.props
    return (
      <div className='Login'>
        <div className='panel'>
          {
            error?
            <div className='error-message'>
              <h3> {errorMessage} </h3>
            </div>
            : null
          }
          <form action="">
            <h2>{text}</h2>
            <h3>Password</h3>
            <input
              value={password}
              onChange={this.handleTextInput}
              data-type='password'
              autoComplete="on"
              type="password"
            />
            <div
              className={password.length? 'button bright': 'button error'}
              onClick={this.handleLogin}>
              Log in
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  error: state.data.error,
  errorMessage: state.data.errorMessage
}))(Login)
