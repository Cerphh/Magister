import { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setError('');
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A2647] px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Illustration */}
        <div className="w-full md:w-1/2 bg-[#F0F5F9] p-10 flex items-center justify-center">
          <img
            src="/api/placeholder/500/400" // Replace with your actual illustration
            alt="People collaborating"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-[#205295] p-10 text-white">
          <p className="text-sm uppercase tracking-wide text-white/70">Start for free</p>
          <h2 className="text-3xl font-semibold mb-8">Create a new account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="JUAN"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="DELA CRUZ"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white text-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="juandelacruz"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white text-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="8+ chars, upper & lower case"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white text-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="........"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white text-black"
              />
            </div>

            <div className="flex items-start text-sm mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2 mt-1 accent-[#2C74B3]"
              />
              <label>
                I've read and agree with{' '}
                <span className="underline text-[#C9D6DF] cursor-pointer">Terms of Service and Privacy Policy</span>
              </label>
            </div>

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#144272] hover:bg-[#0A2647] transition-colors py-3 rounded-md font-semibold"
            >
              Sign Up
            </button>

            <p className="text-center text-sm mt-6">
              Already have an account?{' '}
              <span className="text-[#C9D6DF] hover:underline cursor-pointer">Sign In</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
