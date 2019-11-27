import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';


export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  static contextType = BuxinfluxContext;

  handleLoginSuccess = (user) => {
    // console.log(`log in page: ${user}`)
    const { location, history } = this.props
    // console.log(`login userid: ${user.user_id}`)
    // console.log(`login userid: ${user.uid}`)
    const destination = (location.state || {}).from || `/users/${user}`
    // console.log(`for destination login: ${destination}`);
    this.context.setLoggedInUser(user)
    history.push(destination)
  }

  render() {
    return (
      <div className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </div>
    )
  }
}
