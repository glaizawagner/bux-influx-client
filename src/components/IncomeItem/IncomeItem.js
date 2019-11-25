/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service'
// import PropTypes from 'prop-types';
// import config from '../../config'

function deleteIncomeRequest(iid,cb) {
    BuxinfluxApiService.deleteIncome(iid)
        .then(() => {
            cb(iid)
        })
        .catch((e) => console.error(e));
}

export default function IncomeItem(props) {

    return(
        <BuxinfluxContext.Consumer>
            { (context) => (
                <li className ='IncomeItem'>
                    <div className = 'IncomeItem__row'>
                        <span> 
                            {props.date_created} 
                            {props.description} 
                            {props.value} 
        
                            <button 
                                className='IncomeItem__description'
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
        </BuxinfluxContext.Consumer>
    )
}

