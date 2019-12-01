import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import TokenService from '../../services/token-service';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import biLogo from '../../images/buxinflux-logo.png'
import './Header.css';

export default class Header extends Component {
  
  static contextType = BuxinfluxContext;

  handleLogoutClick = () => {
    console.log('successfully logout')
    this.context.logoutUser();
  }

  renderLogoutLink() {
    return (
      <>
        {/* <Link to='/users/:uid'>
          Logo
        </Link> */}
        <Link onClick={this.handleLogoutClick} to='/'> <h3 className="log-out">Log-out</h3> </Link>
    </>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
          <Link to='/login'><span className="log-reg">Login</span></Link>
          <Link to='/register'><span className="log-reg">Register</span></Link>
      </div>
    )
  }

  render() {
    // console.log(`Current user in Header: ${this.context.currentUser}`);
    return <>
      <nav className="Header">
              <h4 id="navlogo"><Link to='/'> <img src={biLogo} alt='Buxinflux Logo'/> </Link></h4>
            {this.context.currentUser
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
      </nav>
    </>
  }
}
