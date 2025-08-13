import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    
    if (token && currentUser) {
      setUser(JSON.parse(currentUser));
      setIsAuthenticated(true);
      
      // Set default auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      // For demo purposes, simulate successful login
      // In a real app, this would be an API call
      console.log('Login attempt:', { email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user data
      const mockUser = {
        firstName: 'Demo',
        lastName: 'User',
        email: email,
        username: email.split('@')[0],
        phone: '+1234567890',
        userType: 'student',
        department: 'Computer Science & Engineering',
        semester: '3',
        avatar: `https://via.placeholder.com/150x150/FFD700/000000?text=D`,
        coverImage: 'https://via.placeholder.com/1200x300/1a1a1a/FFD700?text=Daffy+Social'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      // Set default auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed. Please check your credentials.' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      // For demo purposes, simulate successful signup
      // In a real app, this would be an API call
      console.log('Signup data:', userData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      return { 
        success: false, 
        error: 'Signup failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
