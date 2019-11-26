import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import UsersApiService from '../../services/users-api-service'
import './LoginPage.css';

export default class LoginPage extends Component {

  state = { error: null }

  handleLoginSuccess = () => {
    this.context.setLoggedIn();
    UsersApiService.getLoggedInUser()
      .then(res => {
        this.context.setLoggedInUser(res)
      })
      .catch((err) => this.context.setError(err));
      this.props.history.push('/login');
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
          TokenService.saveAuthToken(res.authToken)
          this.handleLoginSuccess();
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
  }

  render() {
    const { error } = this.state
    console.log(`Successful login`);
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
