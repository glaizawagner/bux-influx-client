/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxinfluxContext from  '../../contexts/BuxinfluxContext'
import helpers from '../../components/helpers/helpers'


export default class Balance extends Component {
    static defaultProps = {
        income: [],
        expenses: [],
      }

    static contextType = BuxinfluxContext;

    render() {

        return (

            <div className="Balance">
                <label htmlFor="start">{helpers.formatNumber(this.context.onChangeBalance())}</label>

                <div className="BalanceIncome">
                    Income  {helpers.formatNumber(this.context.onChangeIncome(),'inc')} 
                </div>

                <div className="BalanceExpense">
                    Expenses {helpers.formatNumber(this.context.onChangeExpenses(),'exp')} 
                    <span className="perc" id="perc">{helpers.formatPercentage(this.context.handleTotalPercentage())}</span>
                </div>
            </div>
        );
    }
}
