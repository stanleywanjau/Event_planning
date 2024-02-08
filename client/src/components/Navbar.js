// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/guests" className="nav-link">Guest List</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Event List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
