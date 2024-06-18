import React from 'react';
import '../Description.css';
import profileImage from '../Images/profile.jpg';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

function Description() {
  return (
    <div className="description-container">
      <div className="description-text">
        <h2>FULL STACK DEVELOPER</h2>
        <p>Hi, I'm Victor Lunani, a passionate database administrator and front-end developer based in Nairobi, Kenya. With a keen eye for detail and a drive for excellence, I specialize in creating robust database solutions and engaging, user-friendly web interfaces. My expertise extends to Android, iOS, and web development, ensuring a seamless experience across all platforms.</p>
        <div className="description-buttons">
          <a href="/fullStackDeveloperVictor.pdf" target="_blank" rel="noopener noreferrer" className="resume-button">My Resume</a>
          <a href="mailto:lunanivictor06@gmail.com" className="hire-me-button">Hire Me</a>
        </div>
      </div>
      <div className="description-image">
        <img src={profileImage} alt="Profile" />
        <ul className="social-media">
          <li><a href="https://www.instagram.com/vikings_vic/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
          <li><a href="https://github.com/lunani254" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
          <li><a href="https://www.linkedin.com/in/victor-lunani-734943215/"><FaLinkedin /></a></li>
        </ul>
      </div>
    </div>
  );
}

export default Description;
