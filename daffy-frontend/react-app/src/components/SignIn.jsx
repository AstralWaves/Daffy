import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/auth.css'; // Auth CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useNotification();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
    if (name === 'password' && value && value.length < 6) error = 'Password must be at least 6 characters';

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (key !== 'rememberMe' && !validateField(key, formData[key])) isValid = false;
    });

    if (isValid) {
      setLoading(true);
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Force page reload to update auth state
        window.location.href = '/home';
      } else {
        showError(result.error);
      }
      
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
                 <div className="auth-header">
           <div className="brand-logo">
             <i className="fas fa-star"></i>
             <h1>Daffy</h1>
           </div>
           <h2>Welcome Back</h2>
           <p>Sign in to your account to continue</p>
         </div>
        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
             <label htmlFor="email">Email Address</label>
             <div className="input-wrapper">
               <i className="fas fa-envelope"></i>
               <input
                 type="email"
                 id="email"
                 name="email"
                 placeholder="Enter your email"
                 value={formData.email}
                 onChange={handleChange}
                 required
               />
             </div>
             {errors.email && <span className="error-message">{errors.email}</span>}
           </div>
                            <div className="form-group">
             <label htmlFor="password">Password</label>
             <div className="input-wrapper">
               <i className="fas fa-lock"></i>
               <input
                 type={showPassword ? 'text' : 'password'}
                 id="password"
                 name="password"
                 placeholder="Enter your password"
                 value={formData.password}
                 onChange={handleChange}
                 required
               />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-options">
          <label className="checkbox-label">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
            <span className="checkmark"></span>
            Remember me
          </label>
          <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          <i className="fas fa-sign-in-alt"></i>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  </div>
  );
};

export default Signin;