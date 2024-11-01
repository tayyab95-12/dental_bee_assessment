// Header.js
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import './Header.css';

function Header(){
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Show logout success notification
    toast.success("Logged out successfully!");
    // Navigate to the login page
    navigate('/');
  };

  return (
    <header className="header-container">
      <div className="header-logo">
        <h1>NoteApp</h1>
      </div>
      <nav className="header-nav">
        <Link to="/notes" className="nav-link">My Notes</Link>
        <button onClick={handleLogout} className="logout-button">
          <span>Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="logout-icon" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-1"/>
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Header;