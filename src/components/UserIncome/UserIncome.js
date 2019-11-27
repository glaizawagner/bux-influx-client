/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';

class UserIncome extends React.Component {
    static contextType = BuxinfluxContext;

    userIncome = () => {
        return this.context.income.map( inc => {
            return (
                <li key={inc.user_id}> {inc.description} </li>
            )
        })
    }

    render() {
        return(
            <ul>{this.userIncome()}</ul>
        )
    }
}

export default UserIncome;