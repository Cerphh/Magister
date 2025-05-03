import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/Signup';
import JobBoard from './pages/JobBoard';
import ResourceHub from './pages/ResourceHub';
import Events from './pages/Events'; // ✅ Import the Events page
import LoginForm from './pages/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/resources" element={<ResourceHub />} />
        <Route path="/events" element={<Events />} /> {/* ✅ Added Events route */}
      </Routes>
    </Router>
  );
};

export default App;
