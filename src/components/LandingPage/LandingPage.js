import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {

    render() {
        return(
            <section>
                <p> Welcome to Buxinflux....</p>
                <Link to ='/register'>
                    <button>Sign Up</button>
                </Link>
            </section>
        )
    }
}