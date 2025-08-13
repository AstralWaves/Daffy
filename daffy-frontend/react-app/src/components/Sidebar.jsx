import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/home',
      icon: 'fas fa-home',
      label: 'Home'
    },
    {
      path: '/trends',
      icon: 'fas fa-fire',
      label: 'Trends'
    },
    {
      path: '/clubs',
      icon: 'fas fa-users',
      label: 'Clubs'
    },
    {
      path: '/settings',
      icon: 'fas fa-cog',
      label: 'Settings'
    }
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

