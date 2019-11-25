/* eslint-disable no-useless-constructor */
/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import BuxinfluxContext from '../../contexts/BuxinfluxContext';

class BudgetFilter extends Component {

    static contextType = BuxinfluxContext;

    render() {
        
        console.log(this.context.created);
            return (
                <>
                    <BuxinfluxContext.Consumer> 
                        {(context) => (
                             <div className="BudgetFilter">
                                <label htmlFor="created">Available Budget in:</label>
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