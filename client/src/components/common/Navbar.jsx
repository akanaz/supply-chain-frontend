import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏢 Supply Chain
        </Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          
          {user?.role === 'owner' && (
            <>
              <li className="nav-item">
                <Link to="/assignroles" className="nav-link">Assign Roles</Link>
              </li>
              <li className="nav-item">
                <Link to="/addproduct" className="nav-link">Add Product</Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item">
                <Link to="/supply" className="nav-link">Supply</Link>
              </li>
              <li className="nav-item">
                <Link to="/track" className="nav-link">Track</Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="user-info">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
