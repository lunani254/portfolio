import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import '../Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Detect active section based on scroll position
    const sections = ['home', 'about', 'tech', 'portfolio', 'footer'];
    const scrollSpy = () => {
      const current = sections.map(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { 
            id: section, 
            visible: rect.top <= 150 && rect.bottom >= 150
          };
        }
        return { id: section, visible: false };
      }).find(section => section.visible);

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', scrollSpy);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', scrollSpy);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <span className="logo-text">
            <span className="logo-highlight">L</span>UNANI
          </span>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <Link 
              to="home" 
              spy={true}
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
              <span className="nav-indicator"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="about" 
              spy={true}
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
              <span className="nav-indicator"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="tech" 
              spy={true}
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeSection === 'tech' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Tech Stack
              <span className="nav-indicator"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="portfolio" 
              spy={true}
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Portfolio
              <span className="nav-indicator"></span>
            </Link>
          </li>
          <li className="nav-item">
            <a 
              href="/fullStackDeveloperVictor.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link resume-link"
              onClick={closeMenu}
            >
              Resume
              <svg className="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L8 11H16L12 15Z" fill="currentColor"/>
                <path d="M12 3V11M12 15L8 11H16L12 15ZM21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <Link 
              to="footer" 
              spy={true}
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeSection === 'footer' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
              <span className="nav-indicator"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;