const express = require('express');
const quizController = require('../controller/quizController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, quizController.createQuiz);

router.get('/all', quizController.getAllQuizzes);
router.get("/dashboard",quizController.getDashboard)
router.delete('/delete/:id', quizController.deleteQuiz)
router.get('/:id', quizController.getQuiz);
router.get('/:quizId/questions',quizController.getQuestions)
router.post('/:id/submit',quizController.submitQuiz);
module.exports = router;
