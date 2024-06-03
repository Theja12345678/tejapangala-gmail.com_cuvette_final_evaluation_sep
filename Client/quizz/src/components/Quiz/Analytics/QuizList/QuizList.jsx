import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const QuizList = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizAndQuestions(id);
  }, [id]);

  const fetchQuizAndQuestions = async (quizId) => {
    try {
     
      const quizResponse = await axios.get(`${backendUrl}/quiz/${quizId}`);
      console.log('Quiz Response:', quizResponse.data);
      setQuiz(quizResponse.data);

    
      const questionsResponse = await axios.get(`${backendUrl}/quiz/${quizId}/questions`);
      console.log('Questions Response:', questionsResponse.data);
      setQuestions(questionsResponse.data);

      setLoading(false); 
    } catch (error) {
      console.error('Error fetching quiz and questions:', error);
      setLoading(false); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>No quiz found</div>;
  }

  return (
    <div>
      <h1>{quiz.quizName}</h1>
      <p>Created On: {new Date(quiz.createdAt).toLocaleDateString()}</p>
      <p>Impressions: {quiz.impressions}</p>
      <h2>Questions</h2>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question._id}>{question.text}</li> 
          ))
        ) : (
          <li>No questions available</li>
        )}
      </ul>
      <Link to={`/quiz/${quiz._id}`}>
        <button>Attempt Quiz</button>
      </Link>
    </div>
  );
};

export default QuizList;
