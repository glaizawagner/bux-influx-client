import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/components/App/App'
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';

import {
    faGift,
    faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faGift, // logo
    farStar,
    fasStar,
)
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);