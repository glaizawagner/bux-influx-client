import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
// import BuxinfluxApiService from '../../services/buxinflux-api-service.js';
import BudgetFilter from '../../components/BudgetFilter/BudgetFilter';
import Balance from '../../components/Balance/Balance';
import AddIncomeExpense from '../../components/AddIncomeExpense/AddIncomeExpense';
// import IncomeList from '../../components/IncomeList/IncomeList';
// import ExpenseList from '../../components/ExpenseList/ExpenseList';
import './BuxinfluxPage.css';

export default class BuxinfluxPage extends Component {
    static defaultProps = {
        match: { params: {} },

    }

    static contextType = BuxinfluxContext;

    componentDidMount() {
        this.context.clearError();
    }

    // componentWillMount() {
    //     this.context.clearIncome()
    //     this.context.clearExpenses()
    // }

    render() {
        // const { income, expenses } = this.context;
        // const { userid } = this.props.match.params;
        // const user = this.context.userid;
        // console.log(`user buxpage : ${user}`);

        return (
            <>
                {/* <h2> Welcome back{ user ? ', ' + user.username : ''} </h2> */}
                <span className='bux-title'> Bux influx </span>
                <BudgetFilter/>
                <Balance />
                <AddIncomeExpense />
            </>
        )      
    }
}

