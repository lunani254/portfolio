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

// Layout constants for the road
const VIEWBOX_WIDTH = 400;
const SLOT_HEIGHT = 360; // vertical space per milestone
const SWING = 120; // how far the road swings left/right of center
const CENTER_X = VIEWBOX_WIDTH / 2;

const Journey = () => {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [progress, setProgress] = useState(0); // 0..1
  const [pathLength, setPathLength] = useState(1);

  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const milestoneRefs = useRef([]);

  const totalHeight = milestones.length * SLOT_HEIGHT;

  // Compute milestone waypoints: alternating left/right of center
  const waypoints = useMemo(() => {
    return milestones.map((m, i) => {
      const y = (i + 0.5) * SLOT_HEIGHT;
      const side = i % 2 === 0 ? 1 : -1; // 1 = right, -1 = left
      const x = CENTER_X + side * SWING;
      return { x, y, side };
    });
  }, []);

  // Build a smooth winding path through all waypoints
  const pathD = useMemo(() => {
    if (waypoints.length === 0) return '';
    const first = waypoints[0];
    const last = waypoints[waypoints.length - 1];

    let d = `M ${CENTER_X} 0`;
    // Entry curve from top center to first waypoint
    d += ` C ${CENTER_X} ${SLOT_HEIGHT * 0.3}, ${first.x} ${SLOT_HEIGHT * 0.25}, ${first.x} ${first.y}`;
    for (let i = 1; i < waypoints.length; i++) {
      const prev = waypoints[i - 1];
      const curr = waypoints[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    // Exit curve back to center bottom
    d += ` C ${last.x} ${last.y + SLOT_HEIGHT * 0.3}, ${CENTER_X} ${last.y + SLOT_HEIGHT * 0.25}, ${CENTER_X} ${totalHeight}`;
    return d;
  }, [waypoints, totalHeight]);

  // Measure the path length so we can animate the dash offset
  useEffect(() => {
    if (pathRef.current && typeof pathRef.current.getTotalLength === 'function') {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  // Drive progress from scroll position within the timeline
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const distance = vh * 0.5 - rect.top;
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

  // Observe each milestone so it lights up as it enters view
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
      { threshold: 0.3 }
    );
    milestoneRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = useMemo(() => {
    const education = milestones.filter((m) => m.type === 'education').length;
    const work = milestones.filter((m) => m.type === 'work').length;
    return { education, work };
  }, []);

  const dashOffset = pathLength * (1 - progress);

  return (
    <section id="journey" className="journey-section">
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
          <div className="journey-legend">
            <span className="journey-legend-item">
              <span className="journey-legend-dot start"></span> Start
            </span>
            <span className="journey-legend-item">
              <span className="journey-legend-dot now"></span> Still going
            </span>
          </div>
        </div>

        <div
          className="journey-timeline"
          ref={timelineRef}
          style={{ minHeight: `${totalHeight}px` }}
        >
          {/* Winding road SVG */}
          <svg
            className="journey-road"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${totalHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="roadProgressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5e3bee" />
                <stop offset="35%" stopColor="#f39c12" />
                <stop offset="65%" stopColor="#e74c3c" />
                <stop offset="100%" stopColor="#27ae60" />
              </linearGradient>
              <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Road base: wide faded line */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="46"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Road edge outline */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="44"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lane markings (dashed white center) */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
              strokeDasharray="14 18"
              fill="none"
            />
            {/* Progress road fill */}
            <path
              ref={pathRef}
              d={pathD}
              stroke="url(#roadProgressGrad)"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength}
              strokeDashoffset={dashOffset}
              opacity="0.55"
              filter="url(#roadGlow)"
              style={{ transition: 'stroke-dashoffset 0.25s linear' }}
            />
            {/* Progress lane markings (white dashes appear as you advance) */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2"
              strokeDasharray="14 18"
              fill="none"
              strokeDashoffset={dashOffset}
              style={{
                strokeDasharray: `${pathLength * progress} ${pathLength}`,
                transition: 'stroke-dasharray 0.25s linear',
              }}
            />
          </svg>

          {/* Milestones anchored at waypoints */}
          <div className="journey-waypoints">
            {milestones.map((m, i) => {
              const wp = waypoints[i];
              const leftPct = (wp.x / VIEWBOX_WIDTH) * 100;
              const topPct = (wp.y / totalHeight) * 100;
              const isVisible = visibleIds.has(m.id);
              const cardSide = wp.side > 0 ? 'left' : 'right'; // card goes opposite the icon

              return (
                <div
                  key={m.id}
                  data-id={m.id}
                  ref={(el) => (milestoneRefs.current[i] = el)}
                  className={`journey-waypoint ${isVisible ? 'reached' : ''} card-${cardSide}`}
                  style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                >
                  <div
                    className="journey-icon-circle"
                    style={{
                      background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`,
                    }}
                  >
                    <div className="journey-icon">{m.icon}</div>
                  </div>
                  {isVisible && (
                    <div
                      className="journey-pulse"
                      style={{ backgroundColor: m.color }}
                    />
                  )}

                  <div
                    className={`journey-card ${isVisible ? 'visible' : ''}`}
                    style={{
                      borderLeftColor: m.color,
                      // Expose color to ::after so the pin dot matches the milestone
                      '--milestone-color': m.color,
                    }}
                  >
                    <div
                      className="journey-date-badge"
                      style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }}
                    >
                      {m.date}
                    </div>
                    <div className="journey-card-content">
                      <h3 className="journey-card-title">{m.title}</h3>
                      <h4 className="journey-card-subtitle" style={{ color: m.color }}>
                        {m.subtitle}
                      </h4>
                      {m.institution && (
                        <p className="journey-card-location">
                          <FaMapMarkerAlt className="journey-location-icon" />
                          {m.institution}
                        </p>
                      )}
                      {m.location && (
                        <p className="journey-card-location">
                          <FaMapMarkerAlt className="journey-location-icon" />
                          {m.location}
                        </p>
                      )}
                      <p className="journey-card-description">{m.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Traveller dot that rides the road as you scroll */}
          <svg
            className="journey-traveller"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${totalHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={pathD}
              stroke="transparent"
              strokeWidth="0"
              fill="none"
              id="traveller-path"
            />
            <circle
              r="8"
              fill="#ffffff"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(94,59,238,0.9))',
                offsetPath: `path("${pathD}")`,
                offsetDistance: `${progress * 100}%`,
              }}
            />
          </svg>
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
    </section>
  );
};

export default Journey;
