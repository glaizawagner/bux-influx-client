import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    // username: this.context.username,
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

      // console.log(`login form userName: ${user_name.value}`);

      // this.context.setUserName(user_name.value)
      // console.log(this.context.username)

      AuthApiService.postLogin({
        user_name: user_name.value,
        password: password.value,
      })
 
        .then(res => {
          // console.log(`login form res username: ${user_name.value}`)
          // this.context.setUserName(user_name.value)
          // console.log(this.context.username)
          // this.context.setUserName(res.user_name);
          // this.context.setUserName(user_name.value);
          // console.log(`login form res: ${res.user_name}`)
          // console.log(`login form username: ${res.username}`)
          user_name.value = ''
          password.value = ''

          TokenService.saveAuthToken(res.authToken)

          this.props.onLoginSuccess(res.user_id)

        })
        .catch(res => {
          this.setState({ error: res.error })
        })
  }

  render() {
    const { error } = this.state
    // const { username } = this.context
    // console.log(username)
    return (
          <section className="FormLogin">
            <h1> bux influx Login</h1>
            <form
              className='LoginForm'
              onSubmit={this.handleSubmitJwtAuth}
            >
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div className='user_name'>
                <label htmlFor='LoginForm__user_name'>User name</label>
                <input name='user_name'  id='LoginForm__user_name' placeholder="test" required/>
              </div>
              <div className='password'>
                <label htmlFor='LoginForm__password'>Password</label>
                <input name='password' type='password'  id='LoginForm__password' placeholder="password" />
              </div>
              <div>
                <button type='submit' className="btn-logcel"> Submit </button>
                <Link to='/'><button  className="btn-logcel"> Cancel </button></Link>
              </div>
              
            </form>
          </section>
    )
  }
}
