import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : '?';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Trav<span>elo</span>
        </Link>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/wishlist" 
            className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}
          >
            Wishlist {!isAuthenticated && '❤️'}
          </Link>
          
          {isAuthenticated ? (
            <>
              <button 
                className="nav-link logout-link" 
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="user-menu">
                <div className="user-avatar">
                  {getInitials(user?.name)}
                </div>
                <span className="user-name">{user?.name}</span>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    👤 Profile
                  </Link>
                  <Link to="/bookings" className="dropdown-item">
                    📅 My Bookings
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    ⚙️ Settings
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/register" className="register-button">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;