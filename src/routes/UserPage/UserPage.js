import React from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
import BuxInfluxPage from '../../components/BuxinfluxPage/BuxinfluxPage';
import IncomeList from '../../components/IncomeList/IncomeList';
import ExpenseList from '../../components/ExpenseList/ExpenseList';

class UserPage extends React.Component {
    state = {
        user: this.context.currentUser,
        username: this.context.username,
        income: [],
        expenses: []

    }

    static contextType = BuxinfluxContext;

    
    componentDidMount = () => {
        this.context.clearError()

        if(!this.context.currentUser) {
            this.context.clearIncome()
            this.context.clearExpenses()
        }

        // console.log(this.context.username)
        // console.log(this.context.setUserName(this.context.currentUser))
        BuxinfluxApiService.getUserAllIncome(this.context.currentUser)
        .then((income) => {
            this.context.setIncome(income)
        })
        .catch((e) => this.context.setError(e));

        BuxinfluxApiService.getUserAllExpenses(this.context.currentUser)
        .then((expense) => {
            
            this.context.setExpenses(expense)
        })
        .catch((e) => this.context.setError(e));
    }

    render() {
        // const user = this.context.currentUser;
        // console.log(user.user_name);

        // console.log(user.user_name)
        return (
            <>
                {/* <h2> Welcome back {user ? ', ' + user.user_name : ''} </h2> */}
                <section className="bux-main">
                    <BuxInfluxPage /> 
                    <IncomeList />
                    <ExpenseList />
                </section> 
            </>
        )
    }
}

export default UserPage;