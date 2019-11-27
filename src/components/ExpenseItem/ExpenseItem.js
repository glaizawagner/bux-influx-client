/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service'
import helpers from '../../components/helpers/helpers';
// import PropTypes from 'prop-types';
// import config from '../../config'
import { Icon } from '@iconify/react';
import timesCircle from '@iconify/icons-fa-regular/times-circle';


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
                        <span > 
                        <span className="items">{helpers.formatDateDisplay(props.date_created)} </span>
                        <span className="items">{props.description} </span>
                        <span className="items">{props.value} </span>
                        <span className="items">{props.percentage} </span>
                            <button 
                                className='ExpenseItem__btn'
                                onClick={() => {
                                    deleteExpenseRequest(
                                        props.eid,
                                        context.deleteExpenses
                                    )
                                }}
                            >
                            <Icon icon={timesCircle} className="timesIcon" />
                            </button>
                        </span>
                    </div>
                </li>
            )}
        </BuxinfluxContext.Consumer>
    )
}

ExpenseItem.defaultProps = {
    deleteExpenses: () => {}
}
