import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/components/App/App'
import { BuxinfluxProvider } from './contexts/BuxInfluxContext';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <BuxinfluxProvider>
            <App />
        </BuxinfluxProvider> 
    </BrowserRouter>,
    document.getElementById('root')
);