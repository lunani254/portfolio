import React, { useEffect, useRef } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  const footerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (footerRef.current) observer.observe(footerRef.current);
    if (titleRef.current) observer.observe(titleRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  return (
    <footer className="footer" id="footer" ref={footerRef}>
      <div className="footer-container">
        <h2 className="footer-title" ref={titleRef}>
          Get In Touch
        </h2>
        <div className="contact-section">
          <div className="contact-icons">
            <a
              href="https://wa.me/254768016771"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon whatsapp"
            >
              <FaWhatsapp />
              <span className="contact-tooltip">WhatsApp</span>
            </a>
            <a href="tel:+254768016771" className="contact-icon phone">
              <FaPhoneAlt />
              <span className="contact-tooltip">Call Me</span>
            </a>
            <a
              href="https://github.com/lunani254"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon github"
            >
              <FaGithub />
              <span className="contact-tooltip">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/victor-lunani-734943215/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon linkedin"
            >
              <FaLinkedin />
              <span className="contact-tooltip">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/vikings_vic/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon instagram"
            >
              <FaInstagram />
              <span className="contact-tooltip">Instagram</span>
            </a>
          </div>
          <div className="contact-email">
            <a href="mailto:lunanivictor06@gmail.com" className="email-link">
              lunanivictor06@gmail.com
              <span className="contact-tooltip">Send Email</span>
            </a>
          </div>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Lunani Victor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;