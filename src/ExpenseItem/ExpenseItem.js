/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxInfluxContext from '../BuxInfluxContext';
// import PropTypes from 'prop-types';
// import config from '../config'

export default function ExpenseItem(props) {

    return(
        <BuxInfluxContext.Consumer>
            { (context) => {
                <li className ='ExpenseItem'>
                    <div className = 'ExpenseItem__row'>
                    {props.date_created}
                    </div>
                </li>
            }}
        </BuxInfluxContext.Consumer>
    )
}

