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
        // const { iid, eid } = this.props.match.params;

        // console.log(this.context.currentUser)
        // this.context.clearError()
        // console.log(`Bux page: ${this.currentUser}`);
        // BuxinfluxApiService.getIncome(this.context.currentUser)
        //     // .then(console.log(`for set income`))
        //     .then(this.context.setIncome)
        //     .catch(this.context.setError)
        //     // .catch('for set error')
        // BuxinfluxApiService.getExpenses(eid)
        //     // .then('for set expenses')
        //     .then(this.context.setExpenses)
        //     .catch(this.context.setError)
        //     // .catch('for set error')
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
                
                <BudgetFilter/>
                <Balance />
                <AddIncomeExpense />
            </>
        )      
    }
    // render() {
    //     console.log('rendering bux influx page')
    //     const { error, income, expenses } = this.context;
    //     console.log(error)
    //     let content
    //     if (error) {
    //       content = (error.error === `Buxinflux doesn't exist`)
    //         ? <p className='red'>Thing not found</p>
    //         : <p className='red'>There was an error</p>
    //     } else if (!income.iid || !expenses.eid) {
    //       content = <div className='loading' />
    //     } else {
    //       content = this.renderBuxInfluxPage()
    //     }
    //     return (
    //       <section className='BuxinfluxPage'>
    //         {content}
    //       </section>
    //     )
    // }

}

// function IncomeList({ income = [] }) {
//     return(
//         <p className='BuxinfluxPage__content'>
//             {income.content}
//             {expenses.content}
//         </p>
//     )
// }