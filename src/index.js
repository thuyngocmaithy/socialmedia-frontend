import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { AccountOtherProvider } from './context/AccountOtherContext';
import { CountAccessProvider } from './context/CountAccessContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <ThemeProvider>
        <GlobalStyles>
            <AccountOtherProvider>
                <CountAccessProvider>
                    <App />
                </CountAccessProvider>
            </AccountOtherProvider>
        </GlobalStyles>
    </ThemeProvider>,
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
