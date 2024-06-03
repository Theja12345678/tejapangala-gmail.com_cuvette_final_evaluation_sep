import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import ViewPage from './pages/ViewPage/ViewPage';
import HomePage from './pages/HomePage/Homepage';
import CreateQuiz from './components/Quiz/DashBoard/Dashboard';
import Dashboard from './components/Quiz/DashBoard/Dashboard';
import Analytics from './components/Quiz/Analytics/Analytics';

import QuestionAnalysis from './components/Quiz/Analytics/QuestionAnalysis/QuestionAnalysis';
import QuizList from './components/Quiz/Analytics/QuizList/QuizList';
import Quiz from './components/Quiz/Analytics/Quiz/Quiz';


const App = () => {
    
    return (
        <Router>
          
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path="/view/*" element={<ViewPage />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/create" element={<CreateQuiz />} />
                <Route path="/analytic" element={<Analytics />} />

                <Route path="/quiz-list/:id" element={<QuizList />} />
      <Route path="/quiz/:id" element={<Quiz />} />
                
        
        <Route path="/quiz/:quizId/questions" element={<QuestionAnalysis/>} />
            </Routes>
        </Router>
    );
};

export default App;
