import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployerDashboard from './pages/EmployerDashboard';
import Events from './pages/Events';
import JobListing from './pages/JobListing';
import LandingPage from './pages/LandingPage';
import LoginForm from './pages/LoginForm';
import MyJobs from './pages/MyJobs';
import ResourceHub from './pages/ResourceHub';
import RolePage from './pages/RolePage';
import SignUpForm from './pages/Signup';
import { UserProfile } from './pages/UserProfile';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/roles" element={<RolePage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/events" element={<Events />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/profile" element={<UserProfile userType="applicant" />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
