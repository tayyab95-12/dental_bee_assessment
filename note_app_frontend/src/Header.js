import React from 'react';
import {useNavigate} from 'react-router-dom';

function Header(){
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <header>
      <h1>Note Taking App</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;