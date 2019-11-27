import React from 'react';
import { Link } from 'react-router-dom';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
import BuxInfluxPage from '../../components/BuxinfluxPage/BuxinfluxPage';
import IncomeList from '../../components/IncomeList/IncomeList';
import ExpenseList from '../../components/ExpenseList/ExpenseList';

class UserPage extends React.Component {
    state = {
        user: this.context.currentUser,
        income: [],
        expenses: []

    }

    static contextType = BuxinfluxContext;

    
    componentDidMount = () => {
        this.context.clearError()
        // console.log(this.context.currentUser);
        if(!this.context.currentUser) {
            this.context.clearIncome()
            this.context.clearExpenses()
        }

        BuxinfluxApiService.getUserAllIncome(this.context.currentUser)
        .then((income) => {
            this.context.setIncome(income)

        })
        .catch((e) => this.context.setError(e));

        BuxinfluxApiService.getUserAllExpenses(this.context.currentUser)
        .then((expense) => {
            console.log(`user page: ${expense}`);
            this.context.setExpenses(expense)
        })
        .catch((e) => this.context.setError(e));
    }

    render() {
        return (
            <>
            <section>
                <h2> Bux Influx</h2>
                <BuxInfluxPage /> 
                <IncomeList />
                <ExpenseList />
            </section> 
            </>
        )
    }
}

export default UserPage;