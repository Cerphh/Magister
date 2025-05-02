import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/Signup'; // Adjust the path if needed
import JobBoard from './pages/JobBoard'; // Make sure the path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/Jobboard" element={<JobBoard />} /> {/* New route added */}
      </Routes>
    </Router>
  );
};

export default App;
