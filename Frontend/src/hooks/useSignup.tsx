import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const useSignUp = (userType: string) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      userType,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('User signed up:', response.data);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
  };
};
