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
    <div className="flex items-center justify-center min-h-screen bg-[#0A2647] p-6">
  <div className="flex w-full max-w-[1900px] max-h-[900px] rounded-[40px] overflow-hidden shadow-2xl bg-white">


        {/* Left Side - Illustration */}
        <div className="w-full md:w-2/3 bg-[#F0F5F9] p-10 flex items-center justify-center">
          <img
            src="/src/assets/signupbg.png"
            alt="People collaborating"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[50%] bg-[#205295] flex items-center justify-center p-12 text-white flex-col">
  <p className="text-base uppercase tracking-wide text-white">Start for free</p>
  <h2 className="text-4xl font-bold mb-10 text-white">Create a new account</h2>

  <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-base mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="JUAN"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white text-black text-lg"
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
          className="w-full p-3 rounded-xl bg-white text-black text-lg"
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
        className="w-full p-3 rounded-xl bg-white text-black text-lg"
      />
    </div>

    <div>
      <label className="block text-base mb-2">Username</label>
      <input
        type="text"
        name="username"
        placeholder="juandelacruz"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-white text-black text-lg"
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
        className="w-full p-3 rounded-xl bg-white text-black text-lg"
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
        className="w-full p-3 rounded-xl bg-white text-black text-lg"
      />
    </div>

    <div className="flex items-start text-base mt-3">
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
      className="w-full bg-[#144272] hover:bg-[#0A2647] transition-colors py-4 rounded-xl font-semibold text-lg"
    >
      Sign Up
    </button>

    <p className="text-center text-base mt-10">
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
