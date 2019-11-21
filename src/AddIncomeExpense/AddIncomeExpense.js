/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import BuxInfluxContext from '../BuxInfluxContext';
import config from '../config';

class AddIncomeExpense extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = BuxInfluxContext;


    handleSubmit = e => {
        e.preventDefault();

        const { type, description, value } = e.target;
        let endpoints;

        const newIncExp = {
            date_created: this.context.created,
            type: type.value,
            description: description.value,
            value: value.value
        }
        
        // console.log(type.value);

        if(type.value === 'inc') {
             endpoints = `${config.API_ENDPOINT}/income`
             console.log(endpoints)
        } 
        if(type.value === 'exp') {
            endpoints = `${config.API_ENDPOINT}/expenses`
            console.log(endpoints)
        }
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
            if(type.value === 'inc'){
                console.log(type.value)
               
                this.context.addIncome(data)
                this.props.history.push('/')
            }
               
            if(type.value === 'exp'){
                console.log(this.context.addExpenses)
                this.context.addExpenses(data)
                this.props.history.push('/')
                
            }
                
            description.value = ''
            value.value = ''

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
                    <button type='submit'>Save</button>
                </form>
            </section>
        )
    }
}

export default AddIncomeExpense;
