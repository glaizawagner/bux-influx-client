/* eslint-disable no-unexpected-multiline */
import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './RegistrationForm';
import { BrowserRouter } from 'react-router-dom';


describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render
      (<BrowserRouter> 
          <RegistrationForm /> 
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
});