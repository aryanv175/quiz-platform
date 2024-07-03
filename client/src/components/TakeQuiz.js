import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
      setQuiz(response.data);
      setAnswers(new Array(response.data.questions.length).fill(''));
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers });
    setScore(response.data.score);
    setSubmitted(true);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={index}>
            <h3>{question.text}</h3>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choiceIndex}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={choice}
                  checked={answers[index] === choice}
                  onChange={() => handleChange(index, choice)}
                />
                {choice}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
      {submitted && <h2>Your score: {score}/{quiz.questions.length}</h2>}
    </div>
  );
};

export default TakeQuiz;
