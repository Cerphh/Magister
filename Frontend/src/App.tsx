// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/Signup';
import JobBoard from './pages/JobBoard';
import ResourceHub from './pages/ResourceHub';
import { UserProfile } from './pages/UserProfile';
import Events from './pages/Events';
import LoginForm from './pages/LoginForm';


const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<SignUpForm />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/resources" element={<ResourceHub />} />
        <Route path="/profile" element={<UserProfile userType="applicant" />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
};

export default App;
