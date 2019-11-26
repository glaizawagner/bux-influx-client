import React, { Component } from 'react';
import ExpenseItem from '../../components/ExpenseItem/ExpenseItem';
import BuxinfluxContext from  '../../contexts/BuxinfluxContext'
import helpers from '../../components/helpers/helpers';
import './ExpenseList.css';

export default class ExpenseList extends Component {
    static defaultProps = {
        expenses: []
    }

      static contextType = BuxinfluxContext;
      
    render() {
        const { created, expenses } = this.context;
        return(
            <section className='ExpenseList'>
                <span className="expName">Expenses</span>
                <ul className="ExpenseList__list" aria-live='polite'>
                    {expenses.map( (expense,idx) => 
                        (helpers.formatDate(expense.date_created) === helpers.formatDate(created)) ? <ExpenseItem key={idx} eid={idx} {...expense} /> : ''
                    )}
                </ul>
            </section>    
        );
    }
}

