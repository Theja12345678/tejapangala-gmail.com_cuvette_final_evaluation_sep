const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   options: [{ type: String, required: true }],
//   answer: { type: String },
//   type: { type: String, enum: ['Q&A', 'Poll'], required: true },
//   timer: { type: Number, default: 30 }, 
// });

const quizSchema = new mongoose.Schema({
  
    quizName: String,
    quizType: String,
    createdAt: { type: Date, default: Date.now },
    questions: [{
        text: String,
        options: [String],
        correctOptionIndex: Number
    }],
    
    timer: Number,
    impressions: { type: Number, default: 0 }
},


);

module.exports = mongoose.model('Quiz', quizSchema);
