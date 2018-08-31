import React, { Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {logIn} from 'store/modules/actions'

class Login extends Component {

  state = {
    email: '',
    password: ''
  }
  handleLogin = () => {
    const {email, password} = this.state
    if(email.length && password.length){
      logIn(this.props.dispatch, email, password)
    }
  }
  handleTextInput = (e) => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  render () {
    const {email, password} = this.state
    const {error, errorMessage} = this.props
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
            <h3>Email</h3>
            <input
              value={email}
              onChange={this.handleTextInput}
              data-type='email'
              autoComplete="on"
              type="text"
            />
            <h3>Password</h3>
            <input
              value={password}
              onChange={this.handleTextInput}
              data-type='password'
              autoComplete="on"
              type="password"
            />
            <div
              className={ email.length && password.length? 'button bright': 'button error'}
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
