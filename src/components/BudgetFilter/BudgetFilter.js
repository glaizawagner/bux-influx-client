/* eslint-disable no-useless-constructor */
/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';
import './BudgetFilter.css';

class BudgetFilter extends Component {

    static contextType = BuxinfluxContext;

    render() {
        
            return (
                <>
                    <BuxinfluxContext.Consumer> 
                        {(context) => (
                             <div id="BudgetFilter">
                                <label htmlFor="created">Available Budget in: </label>
                                <input type="date" id="created" name="created"
                                        value={this.context.created}
                                        onChange={ (e) => {this.context.onDateChange(e.target.value)} }/>
                            </div>
                        )}
                    </BuxinfluxContext.Consumer>
                </>
            );
    }
   
}

export default BudgetFilter;