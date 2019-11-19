/* eslint-disable react/require-render-return */
import React, { Component } from 'react';

export default class Balance extends Component {
    render() {
        return (
            <div className="Balance">
                <label htmlFor="start">+ {}</label>

                <div className="BalanceIncome">
                    Income
                </div>
                <div className="BalanceExpense">
                    Expenses
                </div>
            </div>
        );
    }
}
