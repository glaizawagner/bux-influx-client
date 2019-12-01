import React from 'react';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import ExpenseList from './ExpenseList';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';

const contextValue = {
    expenses: [
        {
            eid: 1,
            date_created: '2019-11-12T16:28:32.615Z',
            type: 'exp',
            description: 'Salary',
            value: '3500.00',
            percentage: '17.00',
            user_id: 1
        },
        {
            eid: 2,
            date_created: '2019-11-12T16:28:32.615Z',
            type: 'exp',
            description: 'Other Expenses',
            value: '1500.00',
            percentage: '15.00',
            user_id: 2
        }
    ]
}

describe('Expense List  component', () => {
    it('renders UI expected', () => {
        const tree = renderer
        .create(<BuxinfluxContext.Provider value={contextValue}>
                <ExpenseList />
                </BuxinfluxContext.Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
    
    });
    
    // enzyme doesn't yet support React.createContext
    it.skip('renders Expense in ul for each in array', () => {
        const props = {
            match: {
                params: {
                    eid: 'THIS_EXPENSE_ID'
                }
            }
        }

        const ul = (<ExpenseList {...props} />, contextValue)
            .find('ul')
            expect(toJson(ul)).toMatchSnapshot()
    })

});