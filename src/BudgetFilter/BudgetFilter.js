/* eslint-disable react/require-render-return */
import React, { Component } from 'react';

class BudgetFilter extends Component {

    handleFilter = ev => {
        this.setState({created: ev.target.value});
    }

    render() {
        return (
            <div className="BudgetFilter">
                <label htmlFor="created">Available Budget in:</label>

                <input type="date" id="created" name="created"
                    value="2019-11-19"
                    min="2019-01-01" max="2019-12-31"
                    onChange={this.handleFilter}/>
            </div>
        );
    }
}

export default BudgetFilter;