/* eslint-disable no-labels */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
// import TokenService from '../../services/token-service';
// import config from '../../config';
import './AddIncomeExpenses.css';
import { Icon } from '@iconify/react';
import checkCircle from '@iconify/icons-fa-regular/check-circle';
// function styleFn(provided, state) {
//   return { ...provided, color: state.isFocused ? 'blue' : 'red' };
// }

class AddIncomeExpense extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            formColor: '#4c924c',
            type: 'inc',
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

    setTypeVal = (e) => {
        this.setState({typeVal: e.target.value})
    }

    //  onChange(e){
    //     const re = /^[0-9\b]+./;
    //     if (e.target.value == '' || re.test(e.target.value)) {
    //         this.setState({value: e.target.value})
    //     }
    // }

    static contextType = BuxinfluxContext;

    handleSubmit = e => {
        e.preventDefault();

        const { type, description, value } = e.target;
        let perc ;

        console.log(`add inc/exp ${this.context.created}`);
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
            value: -Math.abs(value.value),
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
   
    handleTypeChange=(e)=>{
        const formColor1 = "#4c924c";
        const formColor2 = "#ff5033"

        this.setState({type: e.target.value})

        if(this.state.type=== 'exp') {
            this.setState({formColor: formColor1})
        }if(this.state.type === 'inc') {
            this.setState({formColor: formColor2})
        }
    }

    render() {
        return (
            
            <section className='AddBuxInflux'>
                <form
                    className='AddBuxinflux__form'
                    onSubmit={this.handleSubmit}
                    // onChange={this.handleTypeChange}
                    style = {{borderColor: this.state.formColor}}
                >
                    <select id = 'type' name='type' className='type' style = {{borderColor: this.state.formColor}} onChange={this.handleTypeChange} value={this.state.type} >
                        <option value='inc'>+</option>
                        <option value='exp'>-</option>
                    </select>
        
                    <input
                        type='description'
                        name='description'
                        id='description'
                        placeholder=' Add description'
                        style = {{borderColor: this.state.formColor}}
                        required
                    />
                    <input
                        type="number"
                        min="0.01"
                        step="0.000001"
                        // max="1.00"
                        name="value"
                        id="value"
                        style = {{borderColor: this.state.formColor}}
                        // onChange = {this.onChange}
                        placeholder=' Value'
                       
                        required
                    />
                        <button type='submit' className="btnSub" >
                        <Icon icon={checkCircle} className="checkIcon" style = {{color: this.state.formColor}}/> 

                        </button> 
                    
                </form>
            </section>
        )
    }
}

export default AddIncomeExpense;
