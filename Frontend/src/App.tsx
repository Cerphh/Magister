import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/Signup';
import RolePage from './pages/RolePage';
import JobListing from './pages/JobListing';
import ResourceHub from './pages/ResourceHub';
import { UserProfile } from './pages/UserProfile';
import Events from './pages/Events';
import LoginForm from './pages/LoginForm';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <div className="min-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/roles" element={<RolePage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/profile" element={<UserProfile userType="applicant" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
