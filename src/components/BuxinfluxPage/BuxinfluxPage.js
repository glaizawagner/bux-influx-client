import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxInfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
import BudgetFilter from '../../components/BudgetFilter/BudgetFilter';
import Balance from '../../components/Balance/Balance';
import AddIncomeExpense from '../../components/AddIncomeExpense/AddIncomeExpense';
import IncomeList from '../../components/IncomeList/IncomeList';
import ExpenseList from '../../components/ExpenseList/ExpenseList';
// import { Section } from '../../Utils/Utils'


export default class BuxinfluxPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = BuxinfluxContext;

    componentDidMount() {
        const { iid, eid } = this.props.match.params;
        this.context.clearError()
        BuxinfluxApiService.getIncome(iid)
            .then(this.context.setIncome)
            .catch(this.context.setError)
        BuxinfluxApiService.getExpenses(eid)
            .then(this.context.setExpenses)
            .catch(this.context.setError)
    }

    // componentWillMount() {
    //     this.context.clearIncome()
    //     this.context.clearExpenses()
    // }

    render() {
        // const { income, expenses } = this.context;
        return (
            <>
                <div className='BuxinfluxPage' />
                <h2>Bux Inlux</h2>

                <BudgetFilter />
                <Balance />
                <AddIncomeExpense />
                <IncomeList />
                <ExpenseList />

            </>
        )
            
    // }
    // render() {
    // //     const {error, income, expenses } = this.context;
    // //     let content
    //     if (error) {
    //       content = (error.error === `Buxinflux doesn't exist`)
    //         ? <p className='red'>Thing not found</p>
    //         : <p className='red'>There was an error</p>
    //     } else if (!income.iid && !expenses.eid) {
    //       content = <div className='loading' />
    //     } else {
    //       content = this.renderMain()
    //     }
    //     return (
    //       <Section className='BuxinfluxPage'>
    //         {content}
    //       </Section>
    //     )
    }

}