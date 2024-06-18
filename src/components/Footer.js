// Footer.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../Footer.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'show' : ''}`} id="footer">
      <div className="footer-content">
        <div className="footer tittle">
            <p>Get In Touch</p>
        </div>
        <div className="contact-icons">
          <a href="https://wa.me/254768016771" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="tel:+254768016771">
            <FontAwesomeIcon icon={faPhoneAlt} />
          </a>
        </div>
        <p>&copy; 2024 Lunani Victor. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
