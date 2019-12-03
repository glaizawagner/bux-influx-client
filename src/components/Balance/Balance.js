/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxinfluxContext from  '../../contexts/BuxinfluxContext'
import helpers from '../../components/helpers/helpers'
import './Balance.css';

export default class Balance extends Component {
    static defaultProps = {
        income: [],
        expenses: [],
      }

    static contextType = BuxinfluxContext;

    render() {
        return (

            <div className="forBalance">
                <label htmlFor="start" className="start">
                    {helpers.formatBalance(this.context.onChangeBalance())} 
                </label>
                <div id="BalanceIncome">
                    <span>Income</span>
                    <span>
                        {helpers.formatNumber(this.context.onChangeIncome(),'inc')}
                    </span>
                </div>

                <div id="BalanceExpense">
                    <span>Expenses</span>
                    <span className="totalExp">{helpers.formatNumber(this.context.onChangeExpenses(),'exp')}
                    <span className="perc" id="perc">{helpers.formatPercentage(this.context.onChangePerc())}</span></span>
                </div>
            </div>
        );
    }
}
