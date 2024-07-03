const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const QuizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      text: String,
      choices: [String],
      correctAnswer: String
    }
  ]
});

const Quiz = mongoose.model('Quiz', QuizSchema);

app.post('/api/quizzes', async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.send(quiz);
});

app.get('/api/quizzes', async (req, res) => {
  const quizzes = await Quiz.find();
  res.send(quizzes);
});

app.get('/api/quizzes/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.send(quiz);
});

app.post('/api/quizzes/:id/submit', async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      score++;
    }
  });
  res.send({ score });
});

module.exports = app;
