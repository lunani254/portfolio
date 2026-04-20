import React, { useEffect, useRef } from 'react';
import '../styles/Description.css';
import profileImage from '../Images/profile.jpg';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
  FaDocker,
  FaGitAlt,
} from 'react-icons/fa';

function Description() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const textEl = textRef.current;
    const imageEl = imageRef.current;
    const skillsEl = skillsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (containerEl) observer.observe(containerEl);
    if (textEl) observer.observe(textEl);
    if (imageEl) observer.observe(imageEl);
    if (skillsEl) observer.observe(skillsEl);

    return () => observer.disconnect();
  }, []);

  const skillsList = [
    { name: 'Frontend Development', icon: <FaCode />, description: 'React, Vue, Angular' },
    { name: 'Backend Development', icon: <FaServer />, description: 'Node.js, Django, Spring' },
    { name: 'Database Management', icon: <FaDatabase />, description: 'MySQL, MongoDB, PostgreSQL' },
    { name: 'Mobile Development', icon: <FaMobile />, description: 'React Native, Flutter' },
    { name: 'DevOps', icon: <FaDocker />, description: 'Docker, CI/CD, AWS' },
    { name: 'Version Control', icon: <FaGitAlt />, description: 'Git, GitHub' },
  ];

  return (
    <div id="about" className="hero-section" ref={containerRef}>
      <div className="hero-content">
        <div className="hero-text" ref={textRef}>
          <div className="headline-container">
            <h1 className="hero-greeting">
              Hello, I'm <span className="highlight-text">Victor Lunani</span>
            </h1>
            <h2 className="hero-title">FULL STACK DEVELOPER</h2>
          </div>

          <div className="typing-text">
            I build <span className="typing-words"></span>
          </div>

          <p className="hero-description">
            I'm a versatile full stack developer and database administrator based in Nairobi, Kenya, with expertise in creating seamless digital experiences. I blend technical excellence with creative problem-solving to deliver robust, user-centered solutions.
          </p>

          <p className="hero-description">
            With over 5 years of experience in web and mobile development, I've developed a comprehensive skill set that covers every aspect of the development lifecycle, from database architecture and API development to responsive frontend interfaces and deployment.
          </p>

          <div className="hero-buttons">
            <a
              href="/fullStackDeveloperVictor.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <span>Download Resume</span>
              <svg className="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L8 11H16L12 15Z" fill="currentColor" />
                <path d="M12 3V11M12 15L8 11H16L12 15ZM21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
            <a href="mailto:lunanivictor06@gmail.com" className="secondary-button">
              <span>Let's Work Together</span>
              <svg className="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-image" ref={imageRef}>
          <div className="profile-container">
            <div className="profile-background"></div>
            <img src={profileImage} alt="Victor Lunani, Full Stack Developer" className="profile-img" />
            <div className="experience-badge">5+ Years</div>
          </div>

          <ul className="social-links">
            <li className="social-item">
              <a href="https://github.com/lunani254" target="_blank" rel="noopener noreferrer" className="social-link github">
                <FaGithub />
                <span className="social-tooltip">GitHub</span>
              </a>
            </li>
            <li className="social-item">
              <a href="https://www.linkedin.com/in/victor-lunani-734943215/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <FaLinkedin />
                <span className="social-tooltip">LinkedIn</span>
              </a>
            </li>
            <li className="social-item">
              <a href="https://www.instagram.com/vikings_vic/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <FaInstagram />
                <span className="social-tooltip">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="skills-section" ref={skillsRef}>
        <h3 className="skills-title">Tech Stack &amp; Expertise</h3>
        <div className="skills-container">
          {skillsList.map((skill, index) => (
            <div className="skill-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-icon">{skill.icon}</div>
              <h4 className="skill-name">{skill.name}</h4>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Description;
