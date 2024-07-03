import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({ title: '', questions: [] });
  const [question, setQuestion] = useState({ text: '', choices: [], correctAnswer: '' });

  const addQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ text: '', choices: [], correctAnswer: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/quizzes', quiz);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} placeholder="Quiz Title" required />
      <input type="text" value={question.text} onChange={(e) => setQuestion({ ...question, text: e.target.value })} placeholder="Question" required />
      <input type="text" value={question.choices[0]} onChange={(e) => setQuestion({ ...question, choices: [e.target.value, ...question.choices.slice(1)] })} placeholder="Choice 1" required />
      <input type="text" value={question.choices[1]} onChange={(e) => setQuestion({ ...question, choices: [question.choices[0], e.target.value, ...question.choices.slice(2)] })} placeholder="Choice 2" required />
      <input type="text" value={question.choices[2]} onChange={(e) => setQuestion({ ...question, choices: [question.choices[0], question.choices[1], e.target.value, ...question.choices.slice(3)] })} placeholder="Choice 3" required />
      <input type="text" value={question.choices[3]} onChange={(e) => setQuestion({ ...question, choices: [question.choices[0], question.choices[1], question.choices[2], e.target.value] })} placeholder="Choice 4" required />
      <input type="text" value={question.correctAnswer} onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })} placeholder="Correct Answer" required />
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default CreateQuiz;
