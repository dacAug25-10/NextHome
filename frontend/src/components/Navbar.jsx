import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

export default function Navbar() {
  const [authMode, setAuthMode] = useState('login');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthToggle = () => {
    if (authMode === 'login') {
      setAuthMode('register');
      navigate('/login');
    } else {
      setAuthMode('login');
      navigate('/register');
    }
    setMenuOpen(false); // close menu on click (mobile)
  };

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar navbar-custom navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">NextHome</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/pg-listings" onClick={() => setMenuOpen(false)}>
                PG Listings
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/book-pg" onClick={() => setMenuOpen(false)}>
                Book PG
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-auth"
                onClick={handleAuthToggle}
              >
                {authMode === 'login' ? 'Login' : 'Register'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
