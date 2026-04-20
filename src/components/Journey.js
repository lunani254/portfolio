import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/Journey.css';
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaNetworkWired,
  FaServer,
  FaLaptopCode,
  FaWifi,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const milestones = [
  {
    id: 1,
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Started University',
    subtitle: 'BSc Computer Science & IT',
    institution: 'The East African University',
    date: '2020',
    description:
      'Began my journey in computer science, building a strong foundation in programming, networking, and system architecture.',
    color: '#5e3bee',
  },
  {
    id: 2,
    type: 'work',
    icon: <FaNetworkWired />,
    title: 'IT Industrial Attaché',
    subtitle: 'Kenya Power & Lighting Co. (KPLC)',
    location: 'Western Region, Kenya',
    date: 'May 2023 to Aug 2023',
    description:
      'Hands-on experience in enterprise LAN/WAN cabling, fiber optic splicing, switch and router configuration, and telecommunications equipment maintenance.',
    color: '#f39c12',
  },
  {
    id: 3,
    type: 'work',
    icon: <FaServer />,
    title: 'IT Assistant',
    subtitle: 'Powerstar Supermarket',
    location: 'Nairobi, Kenya',
    date: 'Sep 2023 to Sep 2025',
    description:
      'Managed POS systems, CCTV installations, server maintenance, and provided comprehensive IT support across multiple retail locations.',
    color: '#e74c3c',
  },
  {
    id: 4,
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Graduated',
    subtitle: 'BSc Computer Science & IT',
    institution: 'The East African University',
    date: 'Dec 2024',
    description:
      'Successfully completed my degree with expertise in full-stack development, database administration, and system architecture.',
    color: '#5e3bee',
  },
  {
    id: 5,
    type: 'work',
    icon: <FaWifi />,
    title: 'Airtel HBB Installer',
    subtitle: 'Airtel Networks Kenya',
    location: 'Nairobi, Kenya',
    date: '2025 to Present',
    description:
      'Installing and configuring Home Broadband services, troubleshooting network connectivity, and ensuring optimal customer experience with fiber optic technology.',
    color: '#e74c3c',
  },
  {
    id: 6,
    type: 'coding',
    icon: <FaLaptopCode />,
    title: 'Full Stack Developer',
    subtitle: 'Freelance & Personal Projects',
    date: '2020 to Present',
    description:
      'Building responsive web applications, mobile apps, and robust database solutions using React, Node.js, Django, and modern development tools.',
    color: '#27ae60',
  },
];

const Journey = () => {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [progress, setProgress] = useState(0); // 0..1 for timeline fill
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const milestoneRefs = useRef([]);

  // Observe each milestone so it lights up individually as it enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.dataset.id);
          if (entry.isIntersecting) {
            setVisibleIds((prev) => {
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    milestoneRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Drive the center progress line based on scroll through the timeline
  useEffect(() => {
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const rect = timelineEl.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        // How far the top of the timeline has passed the middle of the viewport
        const distance = viewportH * 0.55 - rect.top;
        const ratio = Math.max(0, Math.min(1, distance / rect.height));
        setProgress(ratio);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const stats = useMemo(() => {
    const education = milestones.filter((m) => m.type === 'education').length;
    const work = milestones.filter((m) => m.type === 'work').length;
    const coding = milestones.filter((m) => m.type === 'coding').length;
    return { education, work, coding };
  }, []);

  return (
    <div ref={sectionRef} className="journey-section">
      <div className="journey-bg-effects">
        <div className="journey-bg-blur-1"></div>
        <div className="journey-bg-blur-2"></div>
      </div>

      <div className="journey-container">
        <div className="journey-header">
          <h2 className="journey-title">My Journey</h2>
          <p className="journey-subtitle">
            From education to professional experience and coding expertise.
          </p>
          <div className="journey-divider"></div>
        </div>

        <div className="journey-timeline" ref={timelineRef}>
          {/* Animated progress fill for the center line */}
          <div
            className="journey-progress-fill"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="journey-milestones">
            {milestones.map((milestone, index) => {
              const isVisible = visibleIds.has(milestone.id);
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={milestone.id}
                  data-id={milestone.id}
                  ref={(el) => (milestoneRefs.current[index] = el)}
                  className={`journey-milestone ${isLeft ? 'journey-milestone-left' : 'journey-milestone-right'} ${isVisible ? 'reached' : ''}`}
                >
                  <div className="journey-content">
                    <div className="journey-card-wrapper">
                      <div
                        className={`journey-card ${isVisible ? 'visible' : ''}`}
                        style={{ borderLeftColor: milestone.color }}
                      >
                        <div
                          className="journey-date-badge"
                          style={{ background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}cc)` }}
                        >
                          {milestone.date}
                        </div>

                        <div className="journey-card-content">
                          <h3 className="journey-card-title">{milestone.title}</h3>
                          <h4 className="journey-card-subtitle" style={{ color: milestone.color }}>
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
                          <p className="journey-card-description">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="journey-icon-wrapper">
                    <div
                      className={`journey-icon-circle ${isVisible ? 'visible' : ''}`}
                      style={{
                        background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}dd)`,
                      }}
                    >
                      <div className="journey-icon">{milestone.icon}</div>
                    </div>
                    {isVisible && (
                      <div
                        className="journey-pulse"
                        style={{ backgroundColor: milestone.color }}
                      ></div>
                    )}
                  </div>

                  <div className="journey-empty-space"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="journey-stats">
          <div className="journey-stat-card education">
            <FaGraduationCap className="journey-stat-icon education" />
            <h3 className="journey-stat-number">{stats.education}</h3>
            <p className="journey-stat-label">Educational Milestones</p>
          </div>

          <div className="journey-stat-card work">
            <FaBriefcase className="journey-stat-icon work" />
            <h3 className="journey-stat-number">{stats.work}</h3>
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
