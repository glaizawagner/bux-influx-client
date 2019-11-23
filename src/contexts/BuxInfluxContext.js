import React, { Component } from 'react';
import moment from 'moment';

const BuxinfluxContext = React.createContext({
    income: [],
    expenses: [],
    created: '',
    error: null,
    addIncome: () => {},
    addExpenses: () => {},
    deleteIncome: () => {},
    deleteExpenses: () => {},

})

export default BuxinfluxContext;

export class BuxinfluxProvider extends Component {
    state = {
        income: [],
        expenses: [],
        created: moment(new Date()).format("YYYY-MM-DD"),
        error: null,
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    clearError = () => {
        this.setState({ error: null })
    }

    setIncome = income => {
        this.setState({
            income,
        })
    }

    setExpenses = expenses => {
        this.setState({
            expenses,
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
            expenses: [
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
            expenses: this.state.expenses.filter(exp => exp.eid !== e_id)
        })
    }

    handleDateChange = (value) => {
        this.setState({
            created: value
        })
    }

    handleTotalChange = value => {
        this.setState({
            totalBalance: value
        })
    }

    render() {
        const contextValue = {
            income: this.state.income,
            addIncome: this.handleAddIncome,
            deleteIncome: this.handleDeleteIncome,
            expenses: this.state.expenses,
            addExpenses: this.handleAddExpenses,
            deleteExpenses: this.handleDeleteExpenses,
            created: this.state.created,
            onDateChange: this.handleDateChange
        }
        return (
            <BuxinfluxContext.Provider value = {contextValue}>
                {this.props.children}
            </BuxinfluxContext.Provider>
        )
    }

}