/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxInfluxContext from '../BuxInfluxContext';
// import PropTypes from 'prop-types';
import config from '../config'

function deleteIncomeRequest(iid, cb) {
    fetch(config.API_ENDPOINT +`/{iid}`, {
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
            cb(iid)
        })
        .catch(error => {
            console.error(error)
        })
}

export default function IncomeItem(props) {
    return(
        <BuxInfluxContext.Consumer>
            { (context) => (
                <li className ='IncomeItem'>
                    <div className = 'IncomeItem__row'>
                        <span> 
                            {props.date_created} 
                            {props.description} 
                            {props.value} 
                            <button 
                                className='IncomeItem__btn'
                                onClick={() => {
                                    deleteIncomeRequest(
                                        props.iid,
                                        context.deleteIncome
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

