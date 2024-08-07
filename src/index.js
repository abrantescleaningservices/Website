import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Areas/Home/Home';
import reportWebVitals from './reportWebVitals';
import './../src/Utils/responsive.css'
import "./../src/Areas/Home/Style.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
