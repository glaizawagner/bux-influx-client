/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import IncomeItem from '../../components/IncomeItem/IncomeItem';
import BuxinfluxContext from  '../../contexts/BuxinfluxContext'
import helpers from '../../components/helpers/helpers';
import './IncomeList.css';

export default class IncomeList extends Component {
    static defaultProps = {
        income: [],
    }

    static contextType = BuxinfluxContext;

    componentDidMount() {
        // this.context.clearError();
    }

    renderIncome(){
        const { income, created } = this.context;

        return (
                <section className='IncomeList'>
               <span className="incName">Income</span>
               <ul className="IncomeList__list" aria-live='polite'>
                    {income.map((income,i) => 
                        (helpers.formatDate(income.date_created) === helpers.formatDate(created)) 
                        ? <IncomeItem 
                            key={i} 
                            iid={i} 
                            user_id ={this.context.currentUser} 
                            {...income} 
                            // toggleEditing={() => this.toggleIncomeEditing(i)}
                            // onChange={this.handleIncomeUpdate}
                            /> 
                        : ''
                    )}
                   
           </ul>
        </section>   
        );
    }

    render() {
        const { error } = this.context
        return(
            <div className='IncomeList'>
               { error 
                ? <p className='red'> There was an error, try again</p>
                : this.renderIncome()
                }
            </div>    
        );
    }
}