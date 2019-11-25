/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
// import TokenService from '../../services/token-service';
// import config from '../../config';

class AddIncomeExpense extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    static defaultProps = {
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
                    // this.props.history.push('/main')
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
                    // this.props.history.push('/main')
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
        
        // fetch(endpoints, {
        //     method: 'POST',
        //     body: JSON.stringify(newIncExp),
        //     headers: {
        //         'content-type': 'application/json',
        //         'authorization': `bearer ${TokenService.getAuthToken()}`,
        //     }
        // })
        // .then(res => {
        //     if(!res.ok) {
        //         return res.json().then(error => Promise.reject(error))
        //     }
        //     return res.json()
        // })
        // .then( data => {
    //         if(type.value === 'inc'){
    //             console.log(type.value)
    //             this.context.addIncome(data)
    //             this.props.history.push('/')
    //         }
               
    //         if(type.value === 'exp'){
    //             console.log(this.context.addExpenses)
    //             this.context.addExpenses(data)
    //             this.props.history.push('/')
                
    //         }
                
            

    //     })
    //     .catch(error => {
    //         console.error(error)
    //     }) 
    // };

    clearfields = () => {
        
    }

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