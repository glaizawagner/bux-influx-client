import React, { Component } from 'react';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import BuxInfluxContext from  '../BuxInfluxContext'

export default class ExpenseList extends Component {
    static defaultProps = {
        expenses: []
      }

      static contextType = BuxInfluxContext;
      
    render() {
        const { expenses } = this.context;
        return(
            <section className='ExpenseList'>
                <h2>Expense</h2>
                <ul className="ExpenseList__list" aria-live='polite'>
                    {expenses.map(exp => 
                        <ExpenseItem 
                            key={exp.id} 
                            {...exp} 
                        />
                    )}
                </ul>
            </section>    
        )
    }
}

