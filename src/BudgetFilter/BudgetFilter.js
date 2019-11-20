/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
// import BuxInfluxContext from '../BuxInfluxContext';
import moment from 'moment';

class BudgetFilter extends Component {
    constructor(props){
        super(props)
        this.state = {
            created: moment(new Date()).format("YYYY-MM-DD"),
        }
    }
    // static contextType = BuxInfluxContext;

    createdDate = dt => {
        this.setState ({created: dt})
    }

    
    render() {
        // console.log(this.state.created)
        const created  = this.state.created;
        console.log(created);
        return (
            <div className="BudgetFilter">
                <label htmlFor="created">Available Budget in:</label>

                <input type="date" id="created" name="created"
                    value={created}
                    min="2019/01/01" max="2019/12/31"
                    onChange={ev => this.createdDate(ev.target.value)}
                />
    
            </div>
        );
    }
}

export default BudgetFilter;