import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BuxinfluxContext from './contexts/BuxinfluxContext';
// import PrivateRoute from './components/Utils/PrivateRoute';
// import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import TokenService from './services/token-service';
import Header from './components/Header/Header';
import LandingPage from './routes/LandingPage/LandingPage'
// import BuxinfluxPage from './components/BuxinfluxPage/BuxinfluxPage';
import LoginPage from './routes/LoginPage/LoginPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import moment from 'moment';
import UsersApiService from './services/users-api-service';
import helpers from './components/helpers/helpers';
// import IncomeList from '../IncomeList/IncomeList';
import UserPage from './routes/UserPage/UserPage';
// import BuxinfluxApiService from './services/buxinflux-api-service';
// import NumberFormat from 'react-number-format';
import './App.css'

class App extends Component {
    state = {
        income: [],
        expenses: [],
        users: [],
        created: moment(new Date()).format("YYYY-MM-DD"),
        error: null,
        currentUser: null,
        username: null,
        loggedIn: TokenService.hasAuthToken()
        ? true : false
    }
    

    setUserName = (uName) => {
        this.setState({
            userName: uName
        })

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

    clearIncome = () => {
        this.setState({
            income: []
        })
    }

    setExpenses = expenses => {
        this.setState({
            expenses
        })
    }

    clearExpenses = () => {
        this.setState({
            expenses: []
        })
    }

    handleAddIncome = inc => {
        this.setState({
            income: [...this.state.income, inc]
        })
    }

    handleAddExpenses = exp => {
        this.setState({
            expenses: [...this.state.expenses, exp]
        })
    }

    deleteIncome = iid => {
        const updatedIncome = this.state.income.filter(inc => inc.iid !== iid)
        this.setState({
            income: updatedIncome
        })
    }

    deleteExpenses = eid => {
        const updatedExpenses = this.state.expenses.filter(exp => exp.eid !== eid)
        this.setState({  
            expenses: updatedExpenses
        })
    }

    logoutUser = () => {
        TokenService.clearAuthToken()
        this.setState({
            currentUser: null,
            loggedIn: TokenService.hasAuthToken()
                ? true 
                : false
        })
    }

    handleDateChange = (value) => {
        this.setState({
            created: value
        })
    }

    // handleTotalChange = value => {
    //     this.setState({
    //         // totalBalance: value
    //     })
    // }

    handleTotalExpenses = () => {
        let te = this.state.expenses.reduce((prevBal, curItem) => {
            if((curItem.value < 0) && (helpers.formatDate(this.state.created)===helpers.formatDate(curItem.date_created))) {
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
            return  ti;
    }

    handleTotalBalance = () => {
        let hi = this.handleTotalIncome();
        let he = this.handleTotalExpenses();
        let hb;

        if(hi >= he) {
            hb = hi + he;
            return hb;
        }
        if(he >= hi){
            hb = he + hi;
            return hb
        }
        return hb;
        
    }

    handleTotalPercentage = () => {
        // console.log(this.state.currentUser)
        let tp,checknum;
        let hi = this.handleTotalIncome();
        let he = this.handleTotalExpenses();
        checknum = Math.abs(he)
        // console.log(`he in total per: ${checknum}`)
        if(hi > checknum) {
               let tp = this.state.expenses.reduce((prevBal, curItem) => {
                if((curItem.percentage > 0) && (helpers.formatDate(this.state.created)===helpers.formatDate(curItem.date_created))) {
                    return prevBal += parseFloat(curItem.percentage);
                }else{
                    return prevBal;
                }
            }, 0);
            // console.log(`total percentage: ${tp}`)
            return tp;  
        }if(checknum > hi) {
            tp = 0;
            return tp;
        }
        
        
    }

    componentDidMount(){
        if(this.state.loggedIn) {
            UsersApiService.getLoggedInUser()
                .then(res => {
                    this.setLoggedInUser(res);
                })
                .catch((e) => this.setError(e));
        };
    }

    render() {
        const contextValue = {
            income: this.state.income,
            expenses: this.state.expenses,
            created: this.state.created,
            loggedIn: this.state.loggedIn,
            currentUser: this.state.currentUser,
            error: this.state.error,
            totalExpenses: this.state.totalExpenses,
            totalPercentage: this.state.totalPercentage,
            setLoggedIn: this.setLoggedIn,
            setLoggedInUser: this.setLoggedInUser,
            setError: this.setError,
            clearError: this.clearError,
            addIncome: this.handleAddIncome,
            setIncome: this.setIncome,
            deleteIncome: this.deleteIncome,
            setExpenses: this.setExpenses,
            addExpenses: this.handleAddExpenses,
            deleteExpenses: this.deleteExpenses,
            getAllIncome: this.getAllIncome,
            getAllExpenses: this.getAllExpenses,
            onDateChange: this.handleDateChange,
            onChangeIncome: this.handleTotalIncome,
            onChangeExpenses: this.handleTotalExpenses,
            onChangeBalance: this.handleTotalBalance,
            onChangePerc: this.handleTotalPercentage,
            clearIncome: this.clearIncome,
            clearExpenses: this.clearExpenses,
            logoutUser: this.logoutUser,
            userName: this.state.userName,
            setUserName: this.setUserName
            
        };

        // console.log(`app username: ${this.state.userName}`)
        // console.log(`app setUserName: ${this.setUserName}`)

        // console.log(`For current user: ${this.state.currentUser}`)
        // console.log(`For current user: ${this.user_id}`)

        return (
        <BuxinfluxContext.Provider value = {contextValue}>
            <main className='App'>
                <Header />
                <div className='App__main'>
                    {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/login' component={LoginPage}/>
                        <Route exact path='/register' component={RegistrationPage}/>
                        <Route exact path='/users/:user_id' component={UserPage} />
                        {/* <Route exact path='/main' component={BuxinfluxPage}/> */}
                        <Route exact path='/not-found' component={NotFoundPage}/>                               
                </div>
            </main>
         </BuxinfluxContext.Provider>
        );
    }
}

export default App;


