import React, { useState } from 'react';
import axios from 'axios';
import styles from './SignUp.module.css';

export default function SignUp({ onSwitchToLogin, onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    gender: 'other', // Added gender field
    role: 'patient'  // Added role field
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear specific error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    setServerMessage('');
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Confirm email validation
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }
    
    // Phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }
    
    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setServerMessage('');

    try {
      // Prepare data for backend
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
        gender: formData.gender,
        role: formData.role
      };

      console.log('Sending data to backend:', userData);

      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData
      );

      console.log('Response from backend:', response.data);

      if (response.data.success) {
        setServerMessage({
          type: 'success',
          text: '✅ Account created successfully! Redirecting...'
        });

        // Save token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Call success callback if provided
        if (onSignUpSuccess) {
          onSignUpSuccess(response.data.user);
        }

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);

        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          confirmEmail: '',
          phone: '',
          dateOfBirth: '',
          password: '',
          confirmPassword: '',
          gender: 'other',
          role: 'patient'
        });
      }

    } catch (error) {
      console.error('Sign up error:', error.response?.data || error.message);
      
      let errorMessage = '❌ An error occurred during sign up';
      
      if (error.response?.data) {
        if (error.response.data.message === 'User already exists with this email') {
          errorMessage = '❌ This email is already registered';
        } else {
          errorMessage = `❌ ${error.response.data.message}`;
        }
      }
      
      setServerMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    // Add Google OAuth logic here
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign up clicked');
    // Add Facebook OAuth logic here
  };

  return (
    <div className={styles.signupPage}>
      <button className={styles.backBtn} onClick={() => window.history.back()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <div className={styles.logo}>D. Murphy</div>
      
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>
            Already have an account? <button 
              onClick={onSwitchToLogin} 
              className={styles.link}
              disabled={loading}
            >
              Log In
            </button>
          </p>

          {/* Server message */}
          {serverMessage && (
            <div className={`${styles.message} ${serverMessage.type === 'success' ? styles.successMessage : styles.errorMessage}`}>
              {serverMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="confirmEmail"
                placeholder="Confirm Email *"
                value={formData.confirmEmail}
                onChange={handleChange}
                className={`${styles.input} ${errors.confirmEmail ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.confirmEmail && <span className={styles.errorText}>{errors.confirmEmail}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth *"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`${styles.input} ${errors.dateOfBirth ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.dateOfBirth && <span className={styles.errorText}>{errors.dateOfBirth}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Choose a Password *"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                required
                disabled={loading}
              />
              {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            {/* Hidden fields for gender and role */}
            <input type="hidden" name="gender" value={formData.gender} />
            <input type="hidden" name="role" value={formData.role} />

            <button 
              type="submit" 
              className={styles.signupBtn}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>

        <div className={styles.rightSection}>
          <button 
            onClick={handleGoogleSignUp} 
            className={styles.socialBtn}
            disabled={loading}
          >
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button 
            onClick={handleFacebookSignUp} 
            className={styles.facebookBtn}
            disabled={loading}
          >
            <svg className={styles.facebookIcon} viewBox="0 0 24 24" fill="#ffffff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}