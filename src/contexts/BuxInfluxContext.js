import React from 'react';

const BuxinfluxContext = React.createContext({
    income: [],
    expenses: [],
    created: '',
    error: null,
    currentUser: null,
    setLoggedIn: () => {},
    setLoggedInUser: () => {},
    setError: () => {},
    clearError: () => {},
    setIncome: () => {},
    addIncome: () => {},
    setExpenses: () => {},
    addExpenses: () => {},
    deleteIncome: () => {},
    deleteExpenses: () => {},
})

export default BuxinfluxContext;