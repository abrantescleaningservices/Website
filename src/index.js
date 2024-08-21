import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Areas/Home/Home';
import Login from './Areas/Login/login';
import FeedbackManager from './Areas/Firebase/Feedbackmanager';
import reportWebVitals from './reportWebVitals';
import './../src/Utils/responsive.css';
import "./../src/Areas/Home/Style.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feedback" element={<Login />} />
                <Route path="/feedbackmanager" element={<FeedbackManager />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
