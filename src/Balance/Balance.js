/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxInfluxContext from  '../BuxInfluxContext'

export default class Balance extends Component {
    static defaultProps = {
        income: [],
        expenses: [],
      }

    static contextType = BuxInfluxContext;

    render() {
        const { income, expenses } = this.context;
        // console.log(income);

        let totalIncome = income.reduce((sum, item) => {
            // console.log(sum += parseFloat(item.value))
            return sum += parseFloat(item.value);
        },0); 

        let totalExpenses = expenses.reduce((sum, item) => {
            // console.log(sum += parseFloat(item.value))
            return sum += parseFloat(item.value);
        },0); 

        // console.log(totalIncome);
        // console.log(totalExpenses);

        let totalBalance = totalIncome - totalExpenses;

        return (

            <div className="Balance">
                <label htmlFor="start">+ {totalBalance}</label>

                <div className="BalanceIncome">
                    Income + {totalIncome}
                </div>
                <div className="BalanceExpense">
                    Expenses - {totalExpenses}
                </div>
            </div>
        );
    }
}
