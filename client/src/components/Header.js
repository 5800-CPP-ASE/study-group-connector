import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="header">
      <h3>Study Group Connector</h3>
      <button className="logout" onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;