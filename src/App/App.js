import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
import BuxInfluxContext from '../BuxInfluxContext';
import AddIncomeExpense from '../AddIncomeExpense/AddIncomeExpense';
import BudgetFilter from '../BudgetFilter/BudgetFilter';
import Balance from '../Balance/Balance';
import ExpenseList from '../ExpenseList/ExpenseList';
import IncomeList from '../IncomeList/IncomeList';

export class App extends Component {
    state = {
        income: [],
        expenses: [],
    };

    setIncome = income => {
        this.setState({
            income,
        })
    }

    handleAddIncome = inc => {
        this.setState({
            income: [
                ...this.state.income,
                inc
            ]
        })
    }

    handleAddExpenses = exp => {
        this.setState({
            income: [
                ...this.state.expenses,
                exp
            ]
        })
    }

    handleDeleteIncome = i_id => {
        this.setState({
            income: this.state.income.filter(inc => inc.iid !== i_id)
        })
    }


    handleDeleteExpenses = e_id => {
        this.setState({
            expenses: this.state.income.filter(exp => exp.eid !== e_id)
        })
    }

    componentDidMount() {
        // console.log(`Endpoints ${config.API_ENDPOINT}`);
        Promise.all([
            fetch(`${config.API_ENDPOINT}/income`),
            fetch(`${config.API_ENDPOINT}/expenses`)
        ])
        .then(([incRes, expRes]) => {
            if(!incRes.ok) 
                return incRes.json().then(error => Promise.reject(error))
            if(!expRes.ok)
                return expRes.json().then(error => Promise.reject(error))
            
            return Promise.all([
                incRes.json(),
                expRes.json(),
            ])
        }) 
        .then(([income, expenses]) => {
            this.setState({ income, expenses })
        })
        .catch(error => {
            console.error( { error })
        })
    }

    renderMainRoutes() {
        return(
            <>
                <Route
                    exact
                    path='/'
                    component={BudgetFilter}
                />
                <Route
                    exact
                    path='/'
                    component={Balance}
                />

                <Route
                    exact
                    path='/'
                    component={AddIncomeExpense}
                />

                {['/','/income/:iid'].map(path => 
                    <Route
                        key={path}
                        path={path}
                        component={IncomeList}
                    />
                )}

                {['/','/expenses/:eid'].map(path => 
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={ExpenseList}
                    />
                )}
                
            </>
        )   
    }
    
    render() {
        const contextValue = {
            income: this.state.income,
            addIncome: this.handleAddIncome,
            deleteIncome: this.handleDeleteIncome,
            expenses: this.state.expenses,
            addExpenses: this.handleAddExpenses,
            deleteExpenses: this.handleDeleteExpenses,
        }
        return(
            <main className='App'>
                 <h1> Bux Influx</h1>
                 <BuxInfluxContext.Provider value={contextValue}>
                    <div className='content' aria-live='polite'>
                        {this.renderMainRoutes()}
                    </div>
                </BuxInfluxContext.Provider> 
            </main>       
        );
    }
}

export default App;


