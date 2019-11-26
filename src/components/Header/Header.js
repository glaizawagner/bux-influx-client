import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import './Header.css';

export default class Header extends Component {
  
  static contextType = BuxinfluxContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
      this.context.setLoggedIn();
      this.context.clearError();
      this.context.setLoggedInUser(null);
  }

  renderLogoutLink() {
    return (
        <Link onClick={this.handleLogoutClick} to='/'> <h3 className="log-out">Log-out</h3> </Link>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
          <Link to='/login'><span className="log-reg">Login</span></Link>
          <Link to='/register'><button className="log-reg">Register</button></Link>
      </div>
    )
  }

  render() {
    return <>
      <nav className="Header">
              <h1 id="navlogo"><Link to='/main'> Logo </Link></h1>
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
      </nav>
    </>
  }
}
