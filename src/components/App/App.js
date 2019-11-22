import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import config from '../../config';
// import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import BuxInfluxContext from '../../contexts/BuxInfluxContext';
import AddIncomeExpense from '../../components/AddIncomeExpense/AddIncomeExpense';
import BudgetFilter from '../../components/BudgetFilter/BudgetFilter';
import Balance from '../../components/Balance/Balance';
import ExpenseList from '../../components/ExpenseList/ExpenseList';
import IncomeList from '../../components/IncomeList/IncomeList';
import LoginPage from '../../routes/LoginPage/LoginPage'
import moment from 'moment';

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            income: [],
            expenses: [],
            created: moment(new Date()).format("YYYY-MM-DD")
        };
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
  
        return(
            <main className='App'>
                 <h1> Bux Influx</h1>
                 <BuxInfluxContext.Provider value={contextValue}>
                    <div className='content' aria-live='polite'>
                        <Switch>
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

                            <Route
                                exact
                                path='/'
                                component={IncomeList}
                            />

                            <Route
                                exact
                                path='/'
                                component={ExpenseList}
                            />

                            <PublicOnlyRoute
                                path={'/login'}
                                component={LoginPage}
                            />
                            
                        </Switch>
                    </div>

                </BuxInfluxContext.Provider> 
            </main>       
        );
    }
}

export default App;


