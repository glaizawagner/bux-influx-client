import React, { Component } from 'react';
import IncomeItem from '../../components/IncomeItem/IncomeItem';
import BuxinfluxContext from  '../../contexts/BuxinfluxContext'
import helpers from '../../components/helpers/helpers';
import './IncomeList.css';

export default class IncomeList extends Component {
    static defaultProps = {
        income: []
      }

    static contextType = BuxinfluxContext;

    render() {
        const { created, income } = this.context;
        return(
            <section className='IncomeList'>
                <span className="incName">Income</span>
                <ul className="IncomeList__list" aria-live='polite'>
                    {income.map((income,i) => 
                        (helpers.formatDate(income.date_created) === helpers.formatDate(created)) 
                        ? <IncomeItem key={i} iid={i} {...income} 
                            toggleEditing={() => this.toggleIncomeEditing(i)}
                            onChange={this.handleIncomeUpdate}
                            /> 
                        : ''
                    )}
                </ul>
            </section>    
        );
    }
}

