import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import TokenService from '../../services/token-service';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import biLogo from '../../images/buxinflux-logo.png'
import './Header.css';

export default class Header extends Component {
  
  static contextType = BuxinfluxContext;

  handleLogoutClick = () => {
    
    this.context.logoutUser();
  }

  renderLogoutLink() {
    // const user = this.context.currentUser;
    
    return (
      <>
        {/* <span className="welcome"> Welcome back {user ? ', ' + user.user_name : ''} </span> */}
        <h3 className="log-out"><Link onClick={this.handleLogoutClick} to='/'> Log-out </Link></h3> 
     </>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
          <span className="log-reg"><Link to='/login'>Login</Link></span>
          <span className="log-reg"><Link to='/register'>Register</Link></span>
      </div>
    )
  }

  render() {
    

    return <>
      <nav className="Header">
              {/* <h4 id="navlogo"><Link to='/'> <img src={biLogo} alt='Buxinflux Logo'/> </Link></h4> */}
              <h4 id="navlogo"><img src={biLogo} alt='Buxinflux Logo'/></h4>
              {/* <span> Welcome back {user ? ', ' + user.user_name : ''} </span> */}
            {this.context.currentUser
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
      </nav>
    </>
  }
}
