import React, { useState } from 'react';

import './CreateQuiz.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { createQuiz } from '../../../api/quiz';

const timerOptions = [
  { label: 'No timer', value: 'No timer' },
  { label: '30 sec', value: '30' },
  { label: '60 sec', value: '60' },
  { label: '120 sec', value: '120' },
];

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');
  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [timer, setTimer] = useState('No timer');
  const [showQuizForm, setShowQuizForm] = useState(true);

  function createEmptyQuestion() {
    return {
      text: '',
      optionType: 'text',
      options: [
        { text: '', imageUrl: '' },
        { text: '', imageUrl: '' },
        { text: '', imageUrl: '' },
        { text: '', imageUrl: '' },
      ],
      correctOptionIndex: -1,
    };
  }

  const handleQuizNameChange = (e) => setQuizName(e.target.value);
  const handleQuizTypeChange = (e) => setQuizType(e.target.value);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOptionIndex = optionIndex;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, createEmptyQuestion()]);
    }
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length < 7) {
      newQuestions[questionIndex].options.push({ text: '', imageUrl: '' });
      setQuestions(newQuestions);
    }
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const clearForm = () => {
    setQuizName('');
    setQuizType('');
    setQuestions([createEmptyQuestion()]);
    setTimer('No timer');
  };

  const submitQuiz = async () => {
    const quiz = { quizName, quizType, questions, timer };
    try {
      const response = await  createQuiz(quiz);
      toast.success('Quiz Published SucessFully!');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Error creating quiz');
    }
  };

  return (
    <div>
      <button className='back' onClick={() => setShowQuizForm(true)}>Back</button>
      {showQuizForm && (
        <div className="modal">
          <h2>Create a new Quiz</h2>
          <div>
            <label>Quiz Name:</label>
            <input type="text" value={quizName} onChange={handleQuizNameChange} />
          </div>
          <div>
            <label>Quiz Type:</label>
            <select value={quizType} onChange={handleQuizTypeChange}>
              <option value="">Select Type</option>
              <option value="Q&A">Q&A</option>
              <option value="Poll">Poll</option>
            </select>
          </div>
          <button className='cancel' onClick={clearForm}>Cancel</button>
          <button className='continue' onClick={() => setShowQuizForm(false)}>Continue</button>
        </div>
      )}

      {!showQuizForm && (
        <div className="questions-section">
          {questions.map((question, index) => (
            <div key={index} className="question-form">
              <h3>Question {index + 1}</h3>
              <div>
                <label>Question Text:</label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                />
              </div>
              <div>
                <label>Option Type:</label>
                <select
                  value={question.optionType}
                  onChange={(e) => handleQuestionChange(index, 'optionType', e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="text&image">Text & Image</option>
                </select>
              </div>
              <div>
                <label>Options:</label>
                <div className="options-container">
                  {question.options.map((option, i) => (
                    <div key={i} className="option-row">
                      {question.optionType !== 'image' && (
                        <input
                          type="text"
                          placeholder="Option text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(index, i, 'text', e.target.value)}
                          style={{
                            backgroundColor:
                              question.correctOptionIndex === i ? 'lightgreen' : 'white',
                          }}
                          onClick={() => handleCorrectOptionChange(index, i)}
                        />
                      )}
                      {question.optionType !== 'text' && (
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={option.imageUrl}
                          onChange={(e) => handleOptionChange(index, i, 'imageUrl', e.target.value)}
                          style={{
                            backgroundColor:
                              question.correctOptionIndex === i ? 'lightgreen' : 'white',
                          }}
                          onClick={() => handleCorrectOptionChange(index, i)}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeOption(index, i)}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          marginLeft: '8px',
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
                {question.options.length < 7 && (
                  <button onClick={() => addOption(index)}>Add Option</button>
                )}
              </div>
            </div>
          ))}
          {questions.length < 5 && <button onClick={addQuestion}>Add Question</button>}
          <div className="timer-section">
            <label>Timer:</label>
            <div className="timer-buttons">
              {timerOptions.map((option) => (
                <button
                  key={option.value}
                  value={option.value}
                  onClick={() => setTimer(option.value)}
                  style={{
                    backgroundColor: timer === option.value ? 'red' : 'lightgray',
                    color: 'white',
                    margin: '5px',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={clearForm}>Cancel</button>
          <button onClick={submitQuiz}>Create Quiz</button>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
