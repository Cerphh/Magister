import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "/src/assets/applicant.png";
import "../styles/LoginForm.css";
import useLogin from "../hooks/useLogin";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="background">
      <div className="container-wrapper">
        <div className="form-container">
          <div className="form-box">
            <div className="form-header font-extrabold ">
              <h2>Log In</h2>
              <p>Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-field text-black">
                <label>EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="input-field text-black">
                <label>PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="........"
                  required
                />
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>

            <div className="signup-footer">
              <p>
                Didn't have an account? <Link to="/">Sign Up</Link>
              </p>
            </div>
          </div>

          <div className="illustration-box">
            <img
              src={loginImage}
              alt="Login Graphics"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
