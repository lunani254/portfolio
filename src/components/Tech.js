import React, { useEffect, useRef } from 'react';
import '../styles/Tech.css';
import {
  FaReact,
  FaHtml5,
  FaCss3,
  FaPhp,
  FaJava,
  FaGitSquare,
  FaGithub,
  FaFigma,
  FaNodeJs,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import { TbBrandReactNative } from 'react-icons/tb';
import { IoLogoJavascript } from 'react-icons/io';
import { SiFirebase, SiKotlin, SiPython, SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';
import { DiMysql } from 'react-icons/di';

function Tech() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const techScrollRef = useRef(null);

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
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (techScrollRef.current) observer.observe(techScrollRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (techScrollRef.current) observer.unobserve(techScrollRef.current);
    };
  }, []);

  const techList = [
    { name: 'React', icon: <FaReact />, link: 'https://reactjs.org/' },
    { name: 'React Native', icon: <TbBrandReactNative />, link: 'https://reactnative.dev/' },
    { name: 'HTML5', icon: <FaHtml5 />, link: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
    { name: 'CSS3', icon: <FaCss3 />, link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'JavaScript', icon: <IoLogoJavascript />, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'TypeScript', icon: <SiTypescript />, link: 'https://www.typescriptlang.org/' },
    { name: 'MySQL', icon: <DiMysql />, link: 'https://www.mysql.com/' },
    { name: 'PHP', icon: <FaPhp />, link: 'https://www.php.net/' },
    { name: 'Java', icon: <FaJava />, link: 'https://www.java.com/' },
    { name: 'Git', icon: <FaGitSquare />, link: 'https://git-scm.com/' },
    { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/' },
    { name: 'Kotlin', icon: <SiKotlin />, link: 'https://kotlinlang.org/' },
    { name: 'Figma', icon: <FaFigma />, link: 'https://www.figma.com/' },
    { name: 'Firebase', icon: <SiFirebase />, link: 'https://firebase.google.com/' },
    { name: 'Python', icon: <SiPython />, link: 'https://www.python.org/' },
    { name: 'Node.js', icon: <FaNodeJs />, link: 'https://nodejs.org/' },
    { name: 'Docker', icon: <FaDocker />, link: 'https://www.docker.com/' },
    { name: 'AWS', icon: <FaAws />, link: 'https://aws.amazon.com/' },
    { name: 'MongoDB', icon: <SiMongodb />, link: 'https://www.mongodb.com/' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, link: 'https://www.postgresql.org/' },
  ];

  return (
    <section id="tech" className="tech-section" ref={sectionRef}>
      <div className="tech-container">
        <h2 className="tech-title" ref={titleRef}>
          Technologies I Use
        </h2>
        <div className="tech-scroll-wrapper" ref={techScrollRef}>
          <div className="tech-scroll">
            {techList.concat(techList).map((tech, index) => (
              <a
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-item"
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tech-icon">{tech.icon}</div>
                <span className="tech-name">{tech.name}</span>
                <span className="tech-tooltip">{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tech;