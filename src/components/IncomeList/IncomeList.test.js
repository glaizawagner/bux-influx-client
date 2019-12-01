import React from 'react';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import IncomeList from './IncomeList';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';

const contextValue = {
    income: [
        {
            iid: 1,
            date_created: '2019-11-12T16:28:32.615Z',
            type: 'inc',
            description: 'Salary',
            value: '3500.00',
            user_id: 1
        },
        {
            iid: 2,
            date_created: '2019-11-12T16:28:32.615Z',
            type: 'inc',
            description: 'Other Income',
            value: '3500.00',
            user_id: 2
        },
    ]
}

describe('Income List  component', () => {
    it('renders UI expected', () => {
        const tree = renderer
        .create(<BuxinfluxContext.Provider value={contextValue}>
                <IncomeList />
                </BuxinfluxContext.Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
    
    });
    
    // enzyme doesn't yet support React.createContext
    it.skip('renders Income in ul for each in array', () => {
        const props = {
            match: {
                params: {
                    eid: 'THIS_INCOME_ID'
                }
            }
        }

        const ul = (<IncomeList {...props} />, contextValue)
            .find('ul')
            expect(toJson(ul)).toMatchSnapshot()
    })

});