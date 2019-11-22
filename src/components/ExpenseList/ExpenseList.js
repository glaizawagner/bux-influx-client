import React, { Component } from 'react';
import ExpenseItem from '../../components/ExpenseItem/ExpenseItem';
import BuxInfluxContext from  '../../contexts/BuxInfluxContext'

export default class ExpenseList extends Component {
    static defaultProps = {
        expenses: []
    }

      static contextType = BuxInfluxContext;
      
    render() {
        const { expenses } = this.context;
        return(
            <section className='ExpenseList'>
                <h2>Expenses</h2>
                <ul className="ExpenseList__list" aria-live='polite'>
                    {expenses.map( (expense,idx) => 
                        <ExpenseItem 
                            key={idx} 
                            eid={idx}
                            {...expense} />
                    )}
                </ul>
            </section>    
        );
    }
}

