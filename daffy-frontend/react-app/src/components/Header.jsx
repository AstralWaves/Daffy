import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-left">
          <div className="brand-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <i className="fas fa-star brand-icon"></i>
            <span className="brand-name">Daffy</span>
          </div>
        </div>
        
        <div className="nav-center">
          <form onSubmit={handleSearch} className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search Daffy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        
        <div className="nav-right">
          <Link to="/friends" className="nav-btn" title="Friends">
            <i className="fas fa-users"></i>
          </Link>
          <button className="nav-btn" onclick="toggleTheme()" title="Toggle dark mode">
            <i className="fas fa-moon"></i>
          </button>
          <button className="nav-btn" title="Notifications">
            <i className="fas fa-bell"></i>
          </button>
          <div className="user-menu">
            <img 
              src={user?.avatar || `https://via.placeholder.com/32x32/FFD700/000000?text=${user?.firstName?.charAt(0) || 'U'}`} 
              alt="Profile" 
              className="user-avatar" 
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <div className={`user-dropdown ${showDropdown ? 'show' : ''}`}>
              <div className="user-info">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-email">{user?.email}</span>
              </div>
              <div className="dropdown-actions">
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user"></i> Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <i className="fas fa-cog"></i> Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

