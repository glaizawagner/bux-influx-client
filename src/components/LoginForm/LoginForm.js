import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { console.log('default') }
  }

  state = { 
    error: null,
  }

  handleSubmitBasivAuth = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    )

    user_name.value = ''
    password.value = ''
    this.props.onLoginSuccess()
  }

  handleSubmitJwtAuth = ev => {
      ev.preventDefault()
      this.setState({ error: null })

      const { user_name, password } = ev.target

      AuthApiService.postLogin({
        user_name: user_name.value,
        password: password.value,
      })
        .then(res => {
          user_name.value = ''
          password.value = ''

          // console.log(`login form: ${res.user_id}`)
          // console.log(`login form: ${res.user_id}`)

          TokenService.saveAuthToken(res.authToken)
          this.props.onLoginSuccess(res.user_id)

        })
        .catch(res => {
          this.setState({ error: res.error })
        })
  }

  render() {
    const { error } = this.state

    return (
        <section className="FormLogin">
          <h1> bux influx</h1>
          <form
            className='LoginForm'
            onSubmit={this.handleSubmitJwtAuth}
          >
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div className='user_name'>
              <label htmlFor='LoginForm__user_name'>User name</label>
              <input name='user_name' id='LoginForm__user_name' placeholder=" Username" required/>
            </div>
            <div className='password'>
              <label htmlFor='LoginForm__password'>Password</label>
              <input name='password' type='password' id='LoginForm__password' placeholder=" Password" />
            </div>
            <div className="btn-sub-sign">
              <button type='submit' className="btn login"> Login </button>
              <Link to='/register'><button className="btn SignUp">Sign Up</button></Link>
            </div>
          </form>
        </section>
    )
  }
}
