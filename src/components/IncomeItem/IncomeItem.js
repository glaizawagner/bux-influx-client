/* eslint-disable no-unused-expressions */
import React from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service'
// import PropTypes from 'prop-types';
// import config from '../../config'
import helpers from '../../components/helpers/helpers';
import './IncomeItem.css';
import { Icon } from '@iconify/react';
import timesCircle from '@iconify/icons-fa-regular/times-circle';


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
                            <span className="items">{helpers.formatDateDisplay(props.date_created)}</span>
                            <span className="items">{props.description}</span> 
                            <span className="items">{props.value}</span>
                            {/* <span className="items">{props.user_id}</span> */}
                            <button 
                                className='IncomeItem__description'
                                onClick={() => {
                                    deleteIncomeRequest(
                                        props.iid,
                                        context.deleteIncome
                                    )
                                }}
                            >
                            <Icon icon={timesCircle} className="timesIcon" />
                            </button>
                    </div>
                </li>
            )}
        </BuxinfluxContext.Consumer>
    )
}


IncomeItem.defaultProps = {
    deleteIncome: () => {}
}