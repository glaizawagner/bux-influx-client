import React, { Component } from 'react';
import BuxInfluxContext from '../BuxInfluxContext';
import config from '../config';

class AddBuxInflux extends Component {
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

        const newBuxinflux = {
            date: new Date(),
            type: type.value,
            description: description.value,
            value: value.value
        }
        

        if(type.value === '+') {
             endpoints = `${config.API_ENDPOINT}/income`
        } 
        if(type.value === '-') {
            endpoints = `${config.API_ENDPOINT}/expenses`
        }

        console.log(`Endpoint ${endpoints}`)
        fetch(`${endpoints}`, {
            method: 'POST',
            body: JSON.stringify(newBuxinflux),
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
            this.context.addBuxinflux(data)
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

export default AddBuxInflux;
