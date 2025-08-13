import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/auth.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: '',
    department: '',
    semester: '',
    joiningYear: '',
    graduationYear: '',
    terms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ level: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Populate years dynamically
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1990; y--) {
    years.push(y);
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'password') checkPasswordStrength(value);
    validateField(name, value);
  };

  // Password strength check
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    let level = '', text = '';
    if (strength <= 2) { level = 'weak'; text = 'Weak'; }
    else if (strength <= 3) { level = 'fair'; text = 'Fair'; }
    else if (strength <= 4) { level = 'good'; text = 'Good'; }
    else { level = 'strong'; text = 'Strong'; }

    setPasswordStrength({ level, text });
  };

  // Field validation
  const validateField = (name, value) => {
    let error = '';
    if (!value && name !== 'phone' && name !== 'newsletter') error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
    if (name === 'username' && value && value.length < 3) error = 'Username must be at least 3 characters';
    if (name === 'password' && value && value.length < 6) error = 'Password must be at least 6 characters';
    if (name === 'confirmPassword' && value !== formData.password) error = 'Passwords do not match';
    if (name === 'terms' && !formData.terms) error = 'You must agree to terms';

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) isValid = false;
    });

    if (isValid) {
      const payload = { ...formData };
      if (formData.userType !== 'student') delete payload.semester;
      if (formData.userType !== 'teacher') delete payload.joiningYear;
      if (formData.userType !== 'alumni') delete payload.graduationYear;
      delete payload.confirmPassword;

      const result = await signup(payload);
      
      if (result.success) {
        showSuccess('Account created successfully! Welcome to Daffy!');
        // Create a mock user object and set it in localStorage
        const mockUser = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          userType: formData.userType,
          department: formData.department,
          semester: formData.semester,
          joiningYear: formData.joiningYear,
          graduationYear: formData.graduationYear,
          avatar: `https://via.placeholder.com/150x150/FFD700/000000?text=${formData.firstName.charAt(0)}`,
          coverImage: 'https://via.placeholder.com/1200x300/1a1a1a/FFD700?text=Daffy+Social'
        };
        
        // Store user data and token in localStorage
        localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Force page reload to update auth state
        window.location.href = '/home';
      } else {
        showError(result.error);
      }
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
           <h2>Create Account</h2>
           <p>Join Daffy to connect with friends and share your moments</p>
         </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
                         <div className="form-group">
               <label htmlFor="firstName">First Name</label>
               <div className="input-wrapper">
                 <i className="fas fa-user"></i>
                 <input
                   type="text"
                   id="firstName"
                   name="firstName"
                   placeholder="Enter first name"
                   value={formData.firstName}
                   onChange={handleChange}
                   required
                 />
               </div>
               {errors.firstName && <span className="error-message">{errors.firstName}</span>}
             </div>
                         <div className="form-group">
               <label htmlFor="lastName">Last Name</label>
               <div className="input-wrapper">
                 <i className="fas fa-user"></i>
                 <input
                   type="text"
                   id="lastName"
                   name="lastName"
                   placeholder="Enter last name"
                   value={formData.lastName}
                   onChange={handleChange}
                   required
                 />
               </div>
               {errors.lastName && <span className="error-message">{errors.lastName}</span>}
             </div>
          </div>

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
             <label htmlFor="username">Username</label>
             <div className="input-wrapper">
               <i className="fas fa-at"></i>
               <input
                 type="text"
                 id="username"
                 name="username"
                 placeholder="Choose a username"
                 value={formData.username}
                 onChange={handleChange}
                 required
               />
             </div>
             {errors.username && <span className="error-message">{errors.username}</span>}
           </div>

                                <div className="form-group">
             <label htmlFor="password">Password</label>
             <div className="input-wrapper">
               <i className="fas fa-lock"></i>
               <input
                 type={showPassword ? 'text' : 'password'}
                 id="password"
                 name="password"
                 placeholder="Create a password"
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
            <div className="password-strength" id="password-strength">
              <div className="strength-bar">
                <div className={`strength-fill ${passwordStrength.level}`} id="strength-fill"></div>
              </div>
              <span className="strength-text" id="strength-text">
                {passwordStrength.text ? `Password strength: ${passwordStrength.text}` : 'Password strength'}
              </span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

                                <div className="form-group">
             <label htmlFor="confirmPassword">Confirm Password</label>
             <div className="input-wrapper">
               <i className="fas fa-lock"></i>
               <input
                 type={showConfirmPassword ? 'text' : 'password'}
                 id="confirmPassword"
                 name="confirmPassword"
                 placeholder="Confirm your password"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 required
               />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

                                <div className="form-group">
             <label htmlFor="phone">Phone Number</label>
             <div className="input-wrapper">
               <i className="fas fa-phone"></i>
               <input
                 type="tel"
                 id="phone"
                 name="phone"
                 placeholder="Enter phone number"
                 value={formData.phone}
                 onChange={handleChange}
                 required
               />
             </div>
             {errors.phone && <span className="error-message">{errors.phone}</span>}
           </div>

                                <div className="form-group">
             <label htmlFor="userType">User Type</label>
             <div className="input-wrapper">
               <i className="fas fa-users"></i>
               <select
                 id="userType"
                 name="userType"
                 value={formData.userType}
                 onChange={handleChange}
                 required
               >
                <option value="">Select User Type</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            {errors.userType && <span className="error-message">{errors.userType}</span>}
          </div>

                                <div className="form-group">
             <label htmlFor="department">Department</label>
             <div className="input-wrapper">
               <i className="fas fa-building"></i>
               <select
                 id="department"
                 name="department"
                 value={formData.department}
                 onChange={handleChange}
                 required
               >
                <option value="">Select Department</option>
                <option value="cse">Computer Science & Engineering</option>
                <option value="eee">Electrical & Electronic Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="mechanical">Mechanical Engineering</option>
                <option value="ipe">Industrial & Production Engineering</option>
                <option value="textile">Textile Engineering</option>
                <option value="architecture">Architecture</option>
                <option value="urp">Urban & Regional Planning</option>
                <option value="bme">Biomedical Engineering</option>
                <option value="ce">Computer Engineering</option>
                <option value="sw">Software Engineering</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="ds">Data Science</option>
                <option value="cyber">Cybersecurity</option>
                <option value="business">Business Administration</option>
                <option value="economics">Economics</option>
                <option value="english">English</option>
                <option value="law">Law</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="nursing">Nursing</option>
                <option value="public_health">Public Health</option>
                <option value="nutrition">Nutrition & Food Engineering</option>
                <option value="agriculture">Agriculture</option>
                <option value="fisheries">Fisheries</option>
                <option value="veterinary">Veterinary Medicine</option>
              </select>
            </div>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          {formData.userType === 'student' && (
                                      <div className="form-group" id="semesterGroup">
               <label htmlFor="semester">Semester</label>
               <div className="input-wrapper">
                 <i className="fas fa-graduation-cap"></i>
                 <select
                   id="semester"
                   name="semester"
                   value={formData.semester}
                   onChange={handleChange}
                   required
                 >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                  <option value="9">9th Semester</option>
                  <option value="10">10th Semester</option>
                  <option value="11">11th Semester</option>
                  <option value="12">12th Semester</option>
                </select>
              </div>
              {errors.semester && <span className="error-message">{errors.semester}</span>}
            </div>
          )}

          {formData.userType === 'teacher' && (
                                      <div className="form-group" id="joiningYearGroup">
               <label htmlFor="joiningYear">Joining Year</label>
               <div className="input-wrapper">
                 <i className="fas fa-calendar"></i>
                 <select
                   id="joiningYear"
                   name="joiningYear"
                   value={formData.joiningYear}
                   onChange={handleChange}
                   required
                 >
                  <option value="">Select Joining Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {errors.joiningYear && <span className="error-message">{errors.joiningYear}</span>}
            </div>
          )}

          {formData.userType === 'alumni' && (
                                      <div className="form-group" id="graduationYearGroup">
               <label htmlFor="graduationYear">Graduation Year</label>
               <div className="input-wrapper">
                 <i className="fas fa-calendar-check"></i>
                 <select
                   id="graduationYear"
                   name="graduationYear"
                   value={formData.graduationYear}
                   onChange={handleChange}
                   required
                 >
                  <option value="">Select Graduation Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {errors.graduationYear && <span className="error-message">{errors.graduationYear}</span>}
            </div>
          )}

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
            </label>
            {errors.terms && <span className="error-message">{errors.terms}</span>}
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Subscribe to newsletter and updates
            </label>
          </div>

          <button type="submit" className="btn-primary">
            <i className="fas fa-user-plus"></i>
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;