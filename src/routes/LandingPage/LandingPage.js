import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Landing.css';

export default class LandingPage extends Component {

    render() {
        return(
            <section>
                <h5> Welcome to Bux Influx...</h5>
                <p>Bux Influx is an application that allows a user to track his or her financial health. By tracking monthly income and expenses, Bux Influx will determine whether or not the user has extra cash left over at the end of the month. Armed with this knowledge, the user can then make informed decisions about how to spend money during future months.</p>
                {/* <Link to ='/register'>
                    <button>Sign Up</button>
                </Link> */}
            </section>
        )
    }
}