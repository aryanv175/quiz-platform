import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import QuizList from './components/QuizList';
import QuizResult from './components/QuizResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/take-quiz/:id" component={TakeQuiz} />
        <Route path="/quizzes" component={QuizList} />
        <Route path="/quiz-result/:id" component={QuizResult} />
      </Routes>
    </Router>
  );
}

export default App;
