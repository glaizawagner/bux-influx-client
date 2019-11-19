/* eslint-disable react/require-render-return */
import React, { Component } from 'react';

class BudgetFilter extends Component {
    render() {
        return (
            <div className="BudgetFilter">
                <label for="start">Available Budget in:</label>

                <input type="date" id="start" name="trip-start"
                    value="2019-11-19"
                    min="2019-01-01" max="2019-12-31"/>
            </div>
        );
    }
}

export default BudgetFilter;