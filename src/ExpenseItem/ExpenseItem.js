/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxInfluxContext from '../BuxInfluxContext';
// import PropTypes from 'prop-types';
import config from '../config'

function deleteExpenseRequest(eid, cb) {
    fetch(config.API_ENDPOINT +`/expenses/${eid}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            // 'authorization': `bearer ${config.API_KEY}`
        }
    })
        .then(res => {
            if (!res.ok) {
            return res.json().then(error => Promise.reject(error))
            }
            // return res.json()
        })
        .then(() => {
            console.log(`For Eid: ${eid}`)
            cb(eid)
        })
        .catch(error => {
            console.error(error)
        })
}

export default function ExpenseItem(props) {
    return(
        <BuxInfluxContext.Consumer>
            { (context) => (
                <li className ='ExpenseItem'>
                    <div className = 'ExpenseItem__row'>
                        <span> 
                            {props.date_created} 
                            {props.description} 
                            {props.value} 
                            <button 
                                className='ExpenseItem__btn'
                                onClick={() => {
                                    deleteExpenseRequest(
                                        props.eid,
                                        context.deleteExpenses
                                    )
                                }}
                            >
                            Delete
                            </button>
                        </span>
                    </div>
                </li>
            )}
        </BuxInfluxContext.Consumer>
    )
}

