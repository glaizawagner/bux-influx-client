import React from 'react';
import { shallow } from 'enzyme';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import toJson from 'enzyme-to-json'

describe('Expense Item  component', () => {
    const props = {
        eid: 1,
        date_created: '2019-11-12T16:28:32.615Z',
        type: 'exp',
        description: 'Salary',
        value: '3500.00',
        percentage: '17.00',
        user_id: 1
    };
    
    it('renders Expenses by default', () => {
        const wrapper = shallow(<ExpenseItem {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders Expense given props', () => {
        const wrapper = shallow(<ExpenseItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});