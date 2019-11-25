import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import BuxinfluxContext from '../../contexts/BuxinfluxContext'

export default class Nav extends Component {
  
  static contextType = BuxinfluxContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
      this.context.setLoggedIn();
      this.context.clearError();
      this.context.setLoggedInUser(null);
  }

  renderLogoutLink() {
    return (
      <>
        <li><Link onClick={this.handleLogoutClick} to='/'> Logout</Link></li>
      </>
    )
  }

  renderLoginLink() {
    return (
      <>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
      </>
    )
  }

  render() {
    return <>
      <ul className='nav__links'>
          <li><Link to='/'>Bux influx </Link></li>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </ul>
    </>
  }
}
