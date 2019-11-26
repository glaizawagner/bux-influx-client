/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service'
import helpers from '../../components/helpers/helpers';
// import PropTypes from 'prop-types';
// import config from '../../config'

function deleteExpenseRequest(eid,cb) {
    BuxinfluxApiService.deleteExpenses(eid)
    .then(() => {
        cb(eid)
    })
    .catch((e) => console.error(e));
}

export default function ExpenseItem(props) {
    return(
        <BuxinfluxContext.Consumer>
            { (context) => (
                <li className ='ExpenseItem'>
                    <div className = 'ExpenseItem__row'>
                        <span> 
                            {helpers.formatDateDisplay(props.date_created)} 
                            {props.description} 
                            {props.value} 
                            {props.percentage}
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
        </BuxinfluxContext.Consumer>
    )
}

