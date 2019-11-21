import React, { Component } from 'react';
import IncomeItem from '../IncomeItem/IncomeItem';
import BuxInfluxContext from  '../BuxInfluxContext'

export default class IncomeList extends Component {
    static defaultProps = {
        income: []
      }

    static contextType = BuxInfluxContext;

    render() {
        const { income } = this.context;
        return(
            <section className='IncomeList'>
                <h2>Income</h2>
                <ul className="IncomeList__list" aria-live='polite'>
                    {income.map((income,i) => 
                        <IncomeItem 
                            key={i} 
                            iid={i}
                            {...income} 
                        />
                    )}
                </ul>
            </section>    
        );
    }
}

