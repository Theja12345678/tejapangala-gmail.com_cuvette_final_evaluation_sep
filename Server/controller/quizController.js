const Quiz = require('../models/Quiz');
const jwt=require("jsonwebtoken")
const Submission=require("../models/Submission")
const createQuiz = async (req, res) => {
  try {
    const { quizName,
      quizType,
      questions,
      timer } = req.body;



      
    const quiz = new Quiz({ quizName,
      quizType,
      questions,
      timer });
    await quiz.save();
    
    const shareableLink = ` http://localhost:5173//quiz/${quiz._id}`;
    res.json({ quizId: quiz._id, shareableLink,  message: 'Quiz created successfully', quiz: quiz });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Failed to create quiz' });
  }
};




const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
} catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    quiz.impressions += 1;
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



   





const getDashboard= async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    const totalQuizzes = quizzes.length;
    const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
    const totalImpressions = quizzes.reduce((sum, quiz) => sum + quiz.impressions, 0);
    const trendingQuizzes = quizzes.filter(quiz => quiz.impressions > 10);

    res.status(200).json({
        totalQuizzes,
        totalQuestions,
        totalImpressions,
        trendingQuizzes
    });
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}

const deleteQuiz= async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ "message": 'Quiz deleted' });
}

const getQuestions=async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
}

const submitQuiz=async (req, res) => {
  try {
    const { answers } = req.body;
    const quizId = req.params.id;

    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

   
    for (const answer of answers) {
      const question = await Quiz.findById(answer.questionName);
      if (!question) {
        return res.status(404).json({ message: `Question with ID ${answer.questionName} not found` });
      }
    }

    const submission = new Submission({
      quizId,
      answers,
      submittedAt: new Date()
    });

    await submission.save();

    res.status(200).json({ message: 'Quiz submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createQuiz, getQuiz, getAllQuizzes,  getDashboard, deleteQuiz,getQuestions,submitQuiz };
