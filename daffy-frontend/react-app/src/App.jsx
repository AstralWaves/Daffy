import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import Trends from './pages/Trends';
import Clubs from './pages/Clubs';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Settings from './pages/Settings';
import './styles/App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const AppContent = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Header />
                  <Sidebar />
                  <main className="main-content">
                    <Home />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Header />
                  <Sidebar />
                  <main className="main-content">
                    <Trends />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Header />
                  <Sidebar />
                  <main className="main-content">
                    <Clubs />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Header />
                  <Sidebar />
                  <main className="main-content">
                    <Profile />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Header />
                  <Sidebar />
                  <main className="main-content">
                    <Friends />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Header />
                  <Sidebar />
                  <main className="main-content">
                    <Settings />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;