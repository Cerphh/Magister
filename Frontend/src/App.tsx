import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/Signup'; // Adjust the path if needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        

      </Routes>
    </Router>
  );
};

export default App;
