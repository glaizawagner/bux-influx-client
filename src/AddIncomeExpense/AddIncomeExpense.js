import React, { Component } from 'react';
import BuxInfluxContext from '../BuxInfluxContext';
import config from '../config';
import BudgetFilter from '../BudgetFilter/BudgetFilter';

class AddIncomeExpense extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    static contextType = BuxInfluxContext;

    handleSubmit = e => {
        e.preventDefault();

        const { date_created, type, description, value } = e.target;
        let endpoints;

        console.log(BudgetFilter.start)
        
        const newIncExp = {
            date_created: BudgetFilter.start,
            type: type.value,
            description: description.value,
            value: value.value
        }
        

        if(type.value === '+') {
             endpoints = `${config.API_ENDPOINT}/income`
            //  console.log(`For type: ${type.value}`)
            //  console.log(`Income ${endpoints}`);
        } 
        if(type.value === '-') {
            endpoints = `${config.API_ENDPOINT}/expenses`
            // console.log(`For type: ${type.value}`)
            // console.log(`Expenses ${endpoints}`);
        }
        // console.log(`Endpoint ${config.API_ENDPOINT}`);
        console.log(`Endpoint ${endpoints}`);
        fetch(endpoints, {
            method: 'POST',
            body: JSON.stringify(newIncExp),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then( data => {
            date_created.value = ''
            type.value = ''
            description.value = ''
            value.value = ''
            if(type.value==='+')
                console.log(this.context.addIncome)
               this.context.addIncome(data)
            if(type.value === '-')
                console.log(this.context.addExpenses)
                this.context.addExpenses(data)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
        }) 
    };

    render() {
        return (
            <section className='AddBuxInflux'>
                <form
                    className='AddBuxinflux__form'
                    onSubmit={this.handleSubmit}
                >
                    <select name='type'>
                        <option value='+'>+</option>
                        <option value='-'>-</option>
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
                    <button type='submit'>Save</button>
                </form>
            </section>
        )
    }
}

export default AddIncomeExpense;
