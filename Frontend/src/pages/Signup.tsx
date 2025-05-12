import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignup';

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState<'applicant' | 'employer' | ''>('');

  const { formData, handleChange, handleSubmit, error } = useSignUp(userType);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('userType');
    if (type === 'applicant' || type === 'employer') {
      setUserType(type);
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A2647] p-6">
      <div className="flex w-full max-w-[1500px] max-h-[700px] rounded-[40px] overflow-hidden shadow-2xl bg-white">
        {/* Left Side - Illustration */}
        <div className="w-full md:w-2/3 bg-[#F0F5F9] p-10 flex items-center justify-center">
          <img
            src="/src/assets/signupbg.png"
            alt="People collaborating"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[50%] bg-[#2C74B3] flex items-center justify-center p-12 text-white flex-col">
          <p className="text-base uppercase tracking-wide mt-6 text-white">
            Start for free as a {userType || '...'}
          </p>
          <h2 className="text-4xl font-bold mb-5 text-white">Create a new account</h2>

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-base mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="JUAN"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-xl bg-white text-black text-md"
                />
              </div>
              <div>
                <label className="block text-base mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="DELA CRUZ"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-xl bg-white text-black text-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-base mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-xl bg-white text-black text-md"
              />
            </div>

            <div>
              <label className="block text-base mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="8+ chars, upper & lower case"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-xl bg-white text-black text-md"
              />
            </div>

            <div>
              <label className="block text-base mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="........"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded-xl bg-white text-black text-md"
              />
            </div>

            <div className="flex items-start text-base">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2 mt-1 accent-[#2C74B3]"
              />
              <label>
                I've read and agree with{' '}
                <span className="underline text-[#C9D6DF] cursor-pointer">
                  Terms of Service and Privacy Policy
                </span>
              </label>
            </div>

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#144272] hover:bg-[#0A2647] transition-colors py-2 rounded-xl font-semibold text-md"
              disabled={!formData.agreeToTerms || formData.password !== formData.confirmPassword}
            >
              Sign Up
            </button>

            <p className="text-center text-base">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
