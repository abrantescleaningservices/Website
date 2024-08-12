import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Areas/Home/Home';  // Isso continua como está
import Login from './Areas/Login/login'; // Importa o componente de login
import FeedbackManager from './Areas/Firebase/Feedbackmanager'; // Importa o componente de login
import reportWebVitals from './reportWebVitals';
import './../src/Utils/responsive.css';
import "./../src/Areas/Home/Style.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Isso continua levando ao Home.js */}
                <Route path="/feedback" element={<Login />} /> {/* Novo componente de login */}
                <Route path="/feedbackmanager" element={<FeedbackManager />} />

            </Routes>
        </Router>
    </React.StrictMode>
);



reportWebVitals();

