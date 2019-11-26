import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import PrivateRoute from '../../components/Utils/PrivateRoute';
import PublicOnlyRoute from '../../components/Utils/PublicOnlyRoute';
import TokenService from '../../services/token-service';
import BuxinfluxApiService from '../../services/buxinflux-api-service';
import Header from '../Header/Header';
import LandingPage from '../../components/LandingPage/LandingPage'
import BuxinfluxPage from '../../components/BuxinfluxPage/BuxinfluxPage';
import LoginPage from '../LoginPage/LoginPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import moment from 'moment';
import './App.css'
import UsersApiService from '../../services/users-api-service';
import helpers from '../../components/helpers/helpers';

export class App extends Component {
    state = {
        income: [],
        expenses: [],
        totalBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        totalPercentage: '',
        percentage: -1,
        created: moment(new Date()).format("YYYY-MM-DD"),
        error: null,
        currentUser: null,
        isLoaded: false,
        loggedIn: TokenService.hasAuthToken()
        ? true
        : false
    }
    
    setLoggedIn = () => {
        this.setState({
            loggedIn: TokenService.hasAuthToken()
                ? true
                : false
        })
    }

    setLoggedInUser = user => {
        this.setState({
            currentUser: user
        })
    }

    setError = err => {
        console.error(err)
        this.setState({ 
            error: err.error 
        })
    }
    
    clearError = () => {
        this.setState({ 
            error: null 
        })
    }

    setIncome = income => {
        this.setState({
            income
        })
    }

    setExpenses = expenses => {
        this.setState({
            expenses
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

    deleteIncome = iid => {
        // BuxinfluxApiService.deleteIncome()
        //     .then(res => {
        //         this.setState({
        //             income: this.state.income.filter(inc => inc.iid !== i_id)
        //         })
        //     })
        // )
        const updatedIncome = this.state.income.filter(inc => inc.iid !== iid)
        this.setState({
            income: updatedIncome
        })
    }

    handleDeleteExpenses = eid => {
        const updatedExpenses = this.state.expenses.filter(exp => exp.eid !== eid)
        this.setState({  
            expenses: updatedExpenses
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

    getAllIncome = () => {
        BuxinfluxApiService.getAllIncome()
            .then(res => {
                this.setState({
                    income: res
                })
            })
            .catch((e) => this.setError(e));
    }

    getAllExpenses = () => {
        BuxinfluxApiService.getAllExpenses()
            .then(res => {
                this.setState({
                    expenses: res
                })
            })
            .catch((e) => this.setError(e));
    }

    handleTotalExpenses = () => {
        let te = this.state.expenses.reduce((prevBal, curItem) => {
            if((curItem.value > 0) && (helpers.formatDate(this.state.created)===helpers.formatDate(curItem.date_created))) {
                return prevBal += parseFloat(curItem.value);
            }else{
                return prevBal;
            }
        }, 0);
        return te;
    }

    handleTotalIncome = () => {
        let ti = this.state.income.reduce((prevBal, curItem) => {
            if((curItem.value > 0) && (helpers.formatDate(this.state.created)===helpers.formatDate(curItem.date_created))) {
                return prevBal += parseFloat(curItem.value);
            }else{
                return prevBal;
            }
        }, 0);
        return ti;  
    }

    handleTotalBalance = () => {
        let tb = this.handleTotalIncome() - this.handleTotalExpenses();
        return tb;
    }

    handleTotalPercentage = () => {
        let tp = this.state.expenses.reduce((prevBal, curItem) => {
            if((curItem.percentage > 0) & (helpers.formatDate(this.state.created)===helpers.formatDate(curItem.date_created))) {
                return prevBal += parseFloat(curItem.percentage);
            }else{
                return prevBal;
            }
        }, 0);
        return tp;  
     
    }

    toggleIncomeEditing = index => {
        this.setState({
            income: this.state.income.map((income, incomeIndex) => {
                if(incomeIndex === index){
                    return {
                        ...income,
                        isEditing: !income.isEditing
                    }
                }
                return income;
            })
        });
    }

    handleIncomeUpdate = (event, index) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            income: this.state.income.map((income, incomeIndex) => {
                if(incomeIndex === index) {
                    return {
                        ...income,
                        [name]: value
                    }
                }
                return income;
            })
        });
    }

    componentDidMount(){
        if(this.state.loggedIn) {
            UsersApiService.getLoggedInUser()
                .then(res => {
                    this.setLoggedInUser(res);
                })
                .catch((e) => this.setError(e));

            this.getAllIncome();
            this.getAllExpenses();
        };
    }

    render() {
        const contextValue = {
            income: this.state.income,
            addIncome: this.handleAddIncome,
            setIncome: this.setIncome,
            deleteIncome: this.deleteIncome,
            expenses: this.state.expenses,
            setExpenses: this.setExpenses,
            addExpenses: this.handleAddExpenses,
            deleteExpenses: this.handleDeleteExpenses,
            getAllIncome: this.getAllIncome,
            getAllExpenses: this.getAllExpenses,
            created: this.state.created,
            onDateChange: this.handleDateChange,
            currentUser: this.currentUser,
            setLoggedIn: this.setLoggedIn,
            loggedIn: this.state.loggedIn,
            setLoggedInUser: this.setLoggedInUser,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            // totalIncome: this.ti,
            totalExpenses: this.state.totalExpenses,
            onChangeIncome: this.handleTotalIncome,
            onChangeExpenses: this.handleTotalExpenses,
            onChangeBalance: this.handleTotalBalance,
            totalPercentage: this.state.totalPercentage,
            handleTotalPercentage: this.handleTotalPercentage,
            toggleIncomeEditing: this.toggleIncomeEditing,
            handleIncomeUpdate: this.handleIncomeUpdate

        };
        console.log(`For error: ${this.error}`)
        console.log(`For current user: ${this.currentUser}`);
        console.log(`For loggein: ${this.loggedIn}`);
        console.log(`For set loggedin: ${this.setLoggedIn}`);
        console.log(`For created: ${this.state.created}`);
        console.log(`For date change: ${this.onDateChange}`);

        return (
        <BuxinfluxContext.Provider value = {contextValue}>
            <div className='App'>
                <header>
                    <Header />
                </header>
                <main className='App__main'>
                    {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
                    <ErrorBoundary>
                        <Switch>
                            <Route exact path='/' component={LandingPage} />
                            {/* <Route path ='/' component={BuxinfluxPage} /> */}
                            <PublicOnlyRoute path='/login' component={LoginPage}/>
                            <PublicOnlyRoute path='/register' component={RegistrationPage}/>
                            <PrivateRoute path='/main' component={BuxinfluxPage}/>
                            <Route path='/not-found-page' component={NotFoundPage}/>
                        </Switch> 
                    </ErrorBoundary>                                 
                </main>
            </div>
         </BuxinfluxContext.Provider>
        );
    }
}

export default App;


