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
      
    componentDidMount() {
        this.context.clearError();
    }

    renderExpenses() {
        const { created, expenses } = this.context;
        return(
            <section className='ExpenseList'>
                <span className="expName">Expenses</span>
                <ul className="ExpenseList__list" aria-live='polite'>
                    {expenses.map((expense,i) => 
                        (helpers.formatDate(expense.date_created) === helpers.formatDate(created)) 
                        ? <ExpenseItem key={i} eid={i} user_id ={this.context.currentUser} {...expense} 
                            /> 
                        : ''
                    )}
                </ul>
            </section>    
        );
    }

render(){
    const { error } = this.context
        return(
            <div className='IncomeList'>
               { error 
                ? <p className='red'> There was an error, try again</p>
                : this.renderExpenses()
                }
            </div>    
        );
    }
}




