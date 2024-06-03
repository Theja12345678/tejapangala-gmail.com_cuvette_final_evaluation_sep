import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Analytics.css';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Analytics = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/quiz/all`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  const deleteQuiz = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`${backendUrl}/quiz/delete/${id}`);
        setQuizzes(quizzes.filter(quiz => quiz._id !== id));
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  const shareQuiz = (id) => {
    const link = `${window.location.origin}/quiz/${id}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const navigateToQuestions = (id) => {
    window.location.href = `/quiz/${id}/questions`;
  };

  const navigateToQuiz = (id) => {
    window.location.href =`/quiz-list/${id}`;
  };

  return (
    <div className="Analytics">
      <h1>Quiz Analysis</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Quiz Name</th>
            <th>Created On</th>
            <th>Impressions</th>
            <th>Actions</th>
            <th>Questions Analysis</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={quiz._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{index + 1}</td>
              <td>{quiz.quizName}</td>
              <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
              <td>{quiz.impressions}</td>
              <td>
              <button onClick={() =>navigateToQuiz(quiz._id)}>🖋</button>
                <button onClick={() => deleteQuiz(quiz._id)}>🗑</button>
                <button onClick={() => shareQuiz(quiz._id)}>🔗</button>
              </td>
              <td>
                <button onClick={() => navigateToQuestions(quiz._id)}>Analyze Questions</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Analytics;
