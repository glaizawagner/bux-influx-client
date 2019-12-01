import React from 'react';
import { shallow } from 'enzyme';
import IncomeItem from './IncomeItem';
import toJson from 'enzyme-to-json'

describe('Income Item  component', () => {
    const props = {
        iid: 1,
        date_created: '2019-11-12T16:28:32.615Z',
        type: 'inc',
        description: 'Salary',
        value: '3500.00',
        user_id: 1
    }
    
    it('renders Income by default', () => {
        const wrapper = shallow(<IncomeItem {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders Income given props', () => {
        const wrapper = shallow(<IncomeItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});