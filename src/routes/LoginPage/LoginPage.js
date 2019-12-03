import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
// import Header from '../../components/Header/Header'

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
    // console.log(`login username: ${user.uname}`)
    // console.log(`login userid: ${user.uid}`)
    // console.log(`login user: ${user}`)
    const destination = (location.state || {}).from || `/users/${user}`
    this.context.setLoggedInUser(user)

    history.push(destination)
  }

  render() {
    return (
      <div className='LoginPage'>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </div>
    )
  }
}
