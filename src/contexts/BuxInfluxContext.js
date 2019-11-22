import React from 'react';

export default React.createContext({
    income: [],
    expenses: [],
    created: '',
    addIncome: () => {},
    addExpenses: () => {},
    deleteIncome: () => {},
    deleteExpenses: () => {},

})