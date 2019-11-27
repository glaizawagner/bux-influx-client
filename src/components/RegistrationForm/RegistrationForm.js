import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersApiService from '../../services/users-api-service';
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }
  
  handleSubmit = ev => {
    ev.preventDefault()

    const { full_name, user_name, password, nick_name} = ev.target

    // console.log('successfully registered')

     this.setState({ error: null })

     UsersApiService.postUser({
       user_name: user_name.value,
       full_name: full_name.value,
       password: password.value,
       nickname: nick_name.value,
     })
        user_name.value = '';
        full_name.value = '';
        password.value = '';
        nick_name.value = '';
        this.props.onRegistrationSuccess()
  }

  render() {
    const { error } = this.state
    return (
      <section>
         <h2> Create  Account </h2>
        <form
          className='RegistrationForm'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
          <div className='full_name'>
            <label htmlFor='RegistrationForm__full_name'>Full name</label>
            <input name='full_name' type='text' id='RegistrationForm__full_name' required/>
          </div>
          <div className='user_name'>
            <label htmlFor='RegistrationForm__user_name'>User name </label>
            <input name='user_name' type='text' id='RegistrationForm__user_name' required />
          </div>
          <div className='password'>
            <label htmlFor='RegistrationForm__password'>Password</label>
            <input name='password' type='password' id='RegistrationForm__password' required/>
          </div>
          <div className='nick_name'>
            <label htmlFor='RegistrationForm__nick_name'>Nickname</label>
            <input name='nick_name' type='text' id='RegistrationForm__nick_name' required />
          </div>
          <div>
              <button type='submit' className="btn-sc"> Submit </button>
              <Link to='/'> <button className="btn-sc"> Cancel </button></Link>
          </div>
        </form>
      </section>
     
    )
  }
}
