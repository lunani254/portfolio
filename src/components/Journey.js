import React, { useEffect, useRef, useState } from 'react';
import '../styles/Journey.css';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaCode, 
  FaNetworkWired,
  FaServer,
  FaLaptopCode,
  FaWifi,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Journey = () => {
  const [visibleMilestones, setVisibleMilestones] = useState([]);
  const sectionRef = useRef(null);

  const milestones = [
    {
      id: 1,
      type: 'education',
      icon: <FaGraduationCap />,
      title: 'Started University',
      subtitle: 'BSc Computer Science & IT',
      institution: 'The East African University',
      date: '2020',
      description: 'Began my journey in computer science, building a strong foundation in programming, networking, and system architecture.',
      color: '#5e3bee'
    },
    {
      id: 2,
      type: 'work',
      icon: <FaNetworkWired />,
      title: 'IT Industrial Attaché',
      subtitle: 'Kenya Power & Lighting Co. (KPLC)',
      location: 'Western Region, Kenya',
      date: 'May 2023 - Aug 2023',
      description: 'Hands-on experience in enterprise LAN/WAN cabling, fiber optic splicing, switch/router configuration, and telecommunications equipment maintenance.',
      color: '#f39c12'
    },
    {
      id: 3,
      type: 'work',
      icon: <FaServer />,
      title: 'IT Assistant',
      subtitle: 'Powerstar Supermarket',
      location: 'Nairobi, Kenya',
      date: 'Sep 2023 - Sep 2025',
      description: 'Managed POS systems, CCTV installations, server maintenance, and provided comprehensive IT support across multiple retail locations.',
      color: '#e74c3c'
    },
    {
      id: 4,
      type: 'education',
      icon: <FaGraduationCap />,
      title: 'Graduated',
      subtitle: 'BSc Computer Science & IT',
      institution: 'The East African University',
      date: 'Dec 2024',
      description: 'Successfully completed my degree with expertise in full-stack development, database administration, and system architecture.',
      color: '#5e3bee'
    },
    {
      id: 5,
      type: 'work',
      icon: <FaWifi />,
      title: 'Airtel HBB Installer',
      subtitle: 'Airtel Networks Kenya',
      location: 'Nairobi, Kenya',
      date: '2025 - Present',
      description: 'Installing and configuring Home Broadband services, troubleshooting network connectivity, and ensuring optimal customer experience with fiber optic technology.',
      color: '#e74c3c'
    },
    {
      id: 6,
      type: 'coding',
      icon: <FaLaptopCode />,
      title: 'Full Stack Developer',
      subtitle: 'Freelance & Personal Projects',
      date: '2020 - Present',
      description: 'Building responsive web applications, mobile apps, and robust database solutions using React, Node.js, Django, and modern development tools.',
      color: '#27ae60'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            milestones.forEach((milestone, index) => {
              setTimeout(() => {
                setVisibleMilestones((prev) => [...new Set([...prev, milestone.id])]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="journey-section">
      {/* Background Effects */}
      <div className="journey-bg-effects">
        <div className="journey-bg-blur-1"></div>
        <div className="journey-bg-blur-2"></div>
      </div>

      <div className="journey-container">
        {/* Section Header */}
        <div className="journey-header">
          <h2 className="journey-title">My Journey</h2>
          <p className="journey-subtitle">
            From education to professional experience and coding expertise
          </p>
          <div className="journey-divider"></div>
        </div>

        {/* Timeline Container */}
        <div className="journey-timeline">
          {/* Curved Path SVG */}
          <svg 
            className={`journey-svg-path ${visibleMilestones.length > 0 ? 'visible' : ''}`}
            style={{ minHeight: `${milestones.length * 280}px` }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5e3bee" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#e74c3c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#27ae60" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d={`M 50 0 Q 200 100, 50 200 T 50 400 Q 200 500, 50 600 T 50 800 Q 200 900, 50 1000 T 50 1200 Q 200 1300, 50 1400 T 50 ${milestones.length * 280}`}
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              className="journey-path-line"
            />
          </svg>

          {/* Milestones */}
          <div className="journey-milestones">
            {milestones.map((milestone, index) => {
              const isVisible = visibleMilestones.includes(milestone.id);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className={`journey-milestone ${
                    isLeft ? 'journey-milestone-left' : 'journey-milestone-right'
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`journey-content ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="journey-card-wrapper">
                      {/* Card */}
                      <div 
                        className="journey-card"
                        style={{ borderLeftColor: milestone.color }}
                      >
                        {/* Date Badge */}
                        <div className="journey-date-badge">
                          {milestone.date}
                        </div>

                        {/* Content */}
                        <div className="journey-card-content">
                          <h3 className="journey-card-title">
                            {milestone.title}
                          </h3>
                          <h4 className="journey-card-subtitle">
                            {milestone.subtitle}
                          </h4>
                          {milestone.institution && (
                            <p className="journey-card-location">
                              <FaMapMarkerAlt className="journey-location-icon" />
                              {milestone.institution}
                            </p>
                          )}
                          {milestone.location && (
                            <p className="journey-card-location">
                              <FaMapMarkerAlt className="journey-location-icon" />
                              {milestone.location}
                            </p>
                          )}
                          <p className="journey-card-description">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Connector Line to Circle (Desktop) */}
                      <div className={`journey-connector ${isLeft ? 'journey-connector-left' : 'journey-connector-right'}`}></div>
                    </div>
                  </div>

                  {/* Center Circle Icon */}
                  <div className="journey-icon-wrapper">
                    <div
                      className={`journey-icon-circle ${isVisible ? 'visible' : ''}`}
                      style={{ 
                        background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}dd)`,
                        transitionDelay: `${index * 100 + 200}ms`
                      }}
                    >
                      <div className="journey-icon">
                        {milestone.icon}
                      </div>
                    </div>

                    {/* Pulse Effect */}
                    {isVisible && (
                      <div
                        className="journey-pulse"
                        style={{ backgroundColor: milestone.color }}
                      ></div>
                    )}
                  </div>

                  {/* Empty Space for alternating layout */}
                  <div className="journey-empty-space"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="journey-stats">
          <div className="journey-stat-card education">
            <FaGraduationCap className="journey-stat-icon education" />
            <h3 className="journey-stat-number">2</h3>
            <p className="journey-stat-label">Educational Milestones</p>
          </div>

          <div className="journey-stat-card work">
            <FaBriefcase className="journey-stat-icon work" />
            <h3 className="journey-stat-number">3</h3>
            <p className="journey-stat-label">Professional Roles</p>
          </div>

          <div className="journey-stat-card coding">
            <FaCode className="journey-stat-icon coding" />
            <h3 className="journey-stat-number">5+</h3>
            <p className="journey-stat-label">Years Coding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;