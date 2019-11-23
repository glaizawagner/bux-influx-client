/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxInfluxContext from  '../../contexts/BuxInfluxContext'

function formatNumber(num, type) {
    let numsplit, int, dec;

    num = Math.abs(num); // removes the sign of number
    num = num.toFixed(2); // 10.4567 -> 10.46

    numsplit = num.split('.'); //will split the number to 2 when it encounter '.

    int = numsplit[0]; //for number

    if(int.length > 3) {
        int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3); //51000->51,000
    }

    dec = numsplit[1]; //for decimal
    
    return (type === 'exp' ? '-':'+') + ' ' + int + '.' + dec;
 }

function displayPercentage(totalInc, totalExp, perc) {
    if(totalInc > 0 && totalExp > 0) {
        perc = Math.round((totalExp/totalInc) * 100)
    } 
    if (totalExp > totalInc) {
        perc = '';
    }
    // else {
    //     perc = '';
    // }

    return (perc) + ( perc > 0 ? '%' : '---');
}


export default class Balance extends Component {
    static defaultProps = {
        income: [],
        expenses: [],
      }

      

    static contextType = BuxInfluxContext;

    render() {
        const { income, expenses } = this.context;
        
        let totalIncome = income.reduce((sum, item) => {
            return  sum += parseFloat(item.value);
        },0); 

        let totalExpenses = expenses.reduce((sum, item) => {
            return sum += parseFloat(item.value);
        },0); 

        let totalBalance = totalIncome - totalExpenses;

        let percentageVal;

        return (

            <div className="Balance">
                <label htmlFor="start">{formatNumber(totalBalance)}</label>

                <div className="BalanceIncome">
                    Income {formatNumber(totalIncome,'inc')}
                </div>
                <div className="BalanceExpense">
                    Expenses {formatNumber(totalExpenses,'exp')} {displayPercentage(totalIncome,totalExpenses,percentageVal)}
                </div>
            </div>
        );
    }
}
