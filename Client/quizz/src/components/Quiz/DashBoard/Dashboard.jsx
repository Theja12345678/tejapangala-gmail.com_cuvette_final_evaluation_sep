import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [totalImpressions, setTotalImpressions] = useState(0);
    const [trendingQuizzes, setTrendingQuizzes] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/quiz/dashboard`);
                const data = response.data;
                setTotalQuizzes(data.totalQuizzes);
                setTotalQuestions(data.totalQuestions);
                setTotalImpressions(data.totalImpressions);
                setTrendingQuizzes(data.trendingQuizzes);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="content">
            <div className="stats">
                <div className="stat-box quiz-color">
                    <p className="stat-number">{totalQuizzes}</p>
                    <p className="stat-text">Quiz{totalQuizzes !== 1 ? 'zes' : ''} Created</p>
                </div>
                <div className="stat-box question-color">
                    <p className="stat-number">{totalQuestions}</p>
                    <p className="stat-text">Question{totalQuestions !== 1 ? 's' : ''} Created</p>
                </div>
                <div className="stat-box impression-color">
                    <p className="stat-number">{totalImpressions}</p>
                    <p className="stat-text">Impression{totalImpressions !== 1 ? 's' : ''}</p>
                </div>
            </div>
            <div className="trending-quizzes">
                <div>
                    <h3>Trending Quizzes</h3>
                </div>
                <div className="trending-quizzes-grid">
                    {trendingQuizzes.map((quiz, index) => (
                        <div key={index} className="trending-quiz-box">
                            <span className="quiz-name">{quiz.quizName}</span>
                            <span className="impressions">
                                <i className="fas fa-eye"></i> {quiz.impressions}
                            </span>
                            <span className="created-on">Created on {new Date(quiz.createdAt).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
