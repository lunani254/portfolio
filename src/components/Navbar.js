// Navbar.js
import React from 'react';
import { Link } from 'react-scroll';
import '../Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="animated-text">LUNANI</span>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">About Me</a>
        </li>
        <li className="nav-item">
          <a href="/fullStackDeveloperVictor.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">Resume</a>
        </li>
        <li className="nav-item">
          <Link to="footer" smooth={true} duration={500} className="nav-link">Contact Me</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
