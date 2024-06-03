import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionAnalysis.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const QuestionAnalysis = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/api/v1/quiz/${quizId}/questions`)
      .then(response => setQuiz(response.data))
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-name">{quiz.quizName}</h1>
        <div className="quiz-meta">
          <span>Created on: {new Date(quiz.createdAt).toLocaleDateString()}</span>
          <span>Impressions: {quiz.impressions}</span>
        </div>
      </div>
      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((question, index) => (
          <div key={index} className="question-block">
            <h2>Q.{index + 1}</h2>
            <p>{question.text}</p>
            <div className="stats-container">
              <div className="stat-box">
                <span>No. of attempts: {question.attempts || 0}</span>
              </div>
              <div className="stat-box">
                <span>No. correct: {question.correct || 0}</span>
              </div>
              <div className="stat-box">
                <span>No. incorrect: {question.incorrect || 0}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No questions found</div>
      )}
    </div>
  );
};

export default QuestionAnalysis;
