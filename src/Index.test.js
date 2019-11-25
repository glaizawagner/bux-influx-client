import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { BuxinfluxProvider } from './contexts/BuxInfluxContext'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <BuxinfluxProvider>
                <App />
            </BuxinfluxProvider> 
        </BrowserRouter>,div)
    ReactDOM.unmountComponentAtNode(div);
});