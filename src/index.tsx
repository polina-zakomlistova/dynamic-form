import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'app/styles/index.scss';
import { StoreProvider } from 'app/providers/store';
import App from './app/App';

render(
    <React.StrictMode>
        <StoreProvider>
            <Router>
                <App />
            </Router>
        </StoreProvider>
    </React.StrictMode>,

    document.getElementById('root'),
);
