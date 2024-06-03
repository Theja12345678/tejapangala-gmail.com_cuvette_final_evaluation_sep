import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { submitQuiz } from '../../../../api/quiz';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Quiz = ({ updateQuizList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    fetchQuizAndQuestions(id);
  }, [id]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const fetchQuizAndQuestions = async (quizId) => {
    try {
      const quizResponse = await axios.get(`${backendUrl}/quiz/${quizId}`);
      setQuiz(quizResponse.data);

      const questionsResponse = await axios.get(`${backendUrl}/quiz/${quizId}/questions`);
      setQuestions(questionsResponse.data);

      if (quizResponse.data.timer) {
        setTimeLeft(quizResponse.data.timer);
      }
    } catch (error) {
      console.error('Error fetching quiz and questions:', error);
    }
  };

  const handleAnswerChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmitQuiz = async (id) => {
    try {
      const submissionData = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer
        }))
      };
      await submitQuiz(id,submissionData);
      updateQuizList(); 
      navigate('/analytics');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz.quizName}</h1>
      {timeLeft !== null && <div>Time Left: {timeLeft}s</div>}
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h3>{question.text}</h3>
            <ul>
              {question.options.map((option) => (
                <li key={option}>
                  <label>
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      onChange={() => handleAnswerChange(question._id, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;
