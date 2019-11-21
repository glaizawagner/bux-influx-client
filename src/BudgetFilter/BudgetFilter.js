/* eslint-disable no-useless-constructor */
/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxInfluxContext from '../BuxInfluxContext';

class BudgetFilter extends Component {

    static contextType = BuxInfluxContext;

    render() {
            return (
                <>
                    <BuxInfluxContext.Consumer> 
                        {(context) => (
                             <div className="BudgetFilter">
                                <label htmlFor="created">Available Budget in:</label>
                                <input type="date" id="created" name="created"
                                        value={this.context.created}
                                        onChange={ (e) => {this.context.onDateChange(e.target.value)} }/>
                            </div>
                        )}
                    </BuxInfluxContext.Consumer>
                </>
            );
    }
   
}

export default BudgetFilter;