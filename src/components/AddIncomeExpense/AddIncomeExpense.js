/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
// import TokenService from '../../services/token-service';
// import config from '../../config';
import './AddIncomeExpenses.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@iconify/react';
import checkCircle from '@iconify/icons-fa-regular/check-circle';

class AddIncomeExpense extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    static defaultProps = {
        history: {
            push: () => { }
        },

        income: [],
        expenses: [],
        percentage: -1,
    }

    static contextType = BuxinfluxContext;

    handleSubmit = e => {
        e.preventDefault();

        const { type, description, value } = e.target;
        let perc ;

        const newInc = {
            date_created: this.context.created,
            type: type.value,
            description: description.value,
            value: value.value
        }
        
        perc = ((parseFloat(value.value)/parseFloat(this.context.onChangeIncome()))*100)
        console.log(`Add income : ${perc}`);

        const newExp = {
            date_created: this.context.created,
            type: type.value,
            description: description.value,
            value: value.value,
            percentage: perc
        }
     

        if(type.value === 'inc') {
             BuxinfluxApiService.addNewIncome(newInc)
                .then(res => {
                    this.context.addIncome(res)
                    this.props.history.push(`/user/${res.user_id}`)
                })
                .then( () => {
                    description.value = ''
                    value.value = ''
                })
                .catch(error => {
                    console.error(error)
                }) 
             
        } 

        if(type.value === 'exp') {
            BuxinfluxApiService.addNewExpenses(newExp)
                .then(res => {
                    this.context.addExpenses(res)
                    this.props.history.push(`/user/${res.user_id}`)
                   
                })
                .then( () => {
                    description.value = ''
                    value.value = ''
                })
                .catch(error => {
                    console.error(error)
                }) 
        }
    }

    render() {

        return (
            
            <section className='AddBuxInflux'>
                <form
                    className='AddBuxinflux__form'
                    onSubmit={this.handleSubmit}
                >
                    <select name='type' className='type'>
                        <option value='inc'>+</option>
                        <option value='exp'>-</option>
                    </select>
        
                    <input
                        type='description'
                        name='description'
                        id='description'
                        placeholder=' Add description'
                        required
                    />
                    <input
                        type='value'
                        name='value'
                        id='value'
                        placeholder=' Value'
                        required
                    />
                        <button type='submit' className="btnSub"><Icon icon={checkCircle} className="checkIcon" /> </button>
                    
                </form>
            </section>
        )
    }
}

export default AddIncomeExpense;
