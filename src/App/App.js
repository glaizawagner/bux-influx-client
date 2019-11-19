import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
import BuxInfluxContext from '../BuxInfluxContext';
import AddBuxInflux from '../AddBuxInflux/AddBuxInflux';
import BudgetFilter from '../BudgetFilter/BudgetFilter';

export class App extends Component {
    state = {
        buxinfluxs: [],
    };

    setBuxinfluxs = buxinfluxs => {
        this.setState({
            buxinfluxs,
        })
    }

    handleAddBuxInflux = buxinflux => {
        this.setState({
            income: [
                ...this.state.buxinfluxs,
                buxinflux
            ]
        })
    }

    handleDeleteBuxInflux = buxinfluxid => {
        const newBuxinflux = this.setState.buxinfluxs.filter(bi => 
            bi.id !== buxinfluxid  
        )
        this.setState({
            buxinfluxs: newBuxinflux
        })
    }

    componentDidMount() {
        // console.log(config.API_ENDPOINT);
        fetch(config.API_ENDPOINT, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',    
            }
        })
        .then( res => {
            if(!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        }) 
        .then(([income, expenses]) => {
            this.setState({ income, expenses })
        })
        .then(this.setBuxinfluxs)
        .catch(error => {
            console.error( { error })
        })
    }

    render() {
        const contextValue = {
            buxinfluxs: this.state.buxinfluxs,
            addBuxinflux: this.handleAddBuxInflux,
            deleteBuxinfluxs: this.handleDeleteBuxInflux
        }
        return(
            <main className='App'>
                 <h1> Bux Influx</h1>
                 <BuxInfluxContext.Provider value={contextValue}>
                    <div className='content' aria-live='polite'>
                        <Route
                            exact
                            path='/'
                            component={BudgetFilter}
                        />
                        <Route
                            exact
                            path='/'
                            component={AddBuxInflux}
                        />
                    </div>
                </BuxInfluxContext.Provider> 
            </main>       
        );
    }
}

export default App;


