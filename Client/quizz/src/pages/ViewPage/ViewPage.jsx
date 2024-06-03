import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

import "./ViewPage.css"
import Dashboard from '../../components/Quiz/DashBoard/Dashboard';
import Analytics from '../../components/Quiz/Analytics/Analytics';
import CreateQuiz from '../../components/Quiz/CreateQuiz/CreateQuiz';

const ViewPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        alert('Logged out');
        navigate('/');
    };

    return (
        <div className="view-page">
            <div className="sidebar">
                <Link to="/view/dashboard">Dashboard</Link>
                <Link to="/view/analytics">Analytics</Link>
                <Link to="/view/create-quiz">Create Quiz</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="create-quiz" element={<CreateQuiz />} />
                    <Route index element={<Dashboard />} /> 
                </Routes>
            </div>
        </div>
    );
};

export default ViewPage;
