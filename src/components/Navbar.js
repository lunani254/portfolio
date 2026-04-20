import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import '../styles/Navbar.css';

// Scroll past the fixed navbar so target sections aren't hidden beneath it.
const SCROLL_OFFSET = -90;

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'journey', label: 'Journey' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'footer', label: 'Contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);

        const current = sectionIds
          .map((section) => {
            const el = document.getElementById(section);
            if (!el) return { id: section, visible: false };
            const rect = el.getBoundingClientRect();
            return { id: section, visible: rect.top <= 150 && rect.bottom >= 150 };
          })
          .find((s) => s.visible);

        if (current) setActiveSection(current.id);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <img src="/logo.svg" alt="lunaniDev logo" className="logo-mark" width="36" height="36" />
          <span className="logo-text">
            <span className="logo-highlight">lunani</span>Dev
          </span>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li className="nav-item" key={item.id}>
              <Link
                to={item.id}
                spy={true}
                smooth={true}
                duration={500}
                offset={SCROLL_OFFSET}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
                <span className="nav-indicator"></span>
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <a
              href="/fullStackDeveloperVictor.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link resume-link"
              onClick={closeMenu}
            >
              Resume
              <svg className="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 15L8 11H16L12 15Z" fill="currentColor" />
                <path d="M12 3V11M12 15L8 11H16L12 15ZM21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
