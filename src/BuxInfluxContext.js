import React from 'react';

export default React.createContext({
    income: [],
    expenses: [],
    addIncome: () => {},
    addExpenses: () => {},
    deleteIncome: () => {},
    deleteExpenses: () => {},

})