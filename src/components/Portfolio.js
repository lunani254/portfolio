import { useEffect, useState, useRef, useCallback } from 'react';
import { Star, GitFork, ExternalLink, Calendar, Code2, X, Eye, Globe } from 'lucide-react';
import '../styles/portfolio.css';

const GITHUB_USERNAME = 'lunani254';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideForks, setHideForks] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const portfolioRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  const fetchRepos = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Unexpected response shape');
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching repos:', err);
        setError(err.message || 'Failed to load projects');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  useEffect(() => {
    const portfolioEl = portfolioRef.current;
    const titleEl = titleRef.current;
    const currentCards = cardRefs.current.filter(Boolean);

    const options = { root: null, rootMargin: '0px', threshold: 0.1 };

    const simpleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          simpleObserver.unobserve(entry.target);
        }
      });
    }, options);

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), index * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    }, options);

    if (portfolioEl) simpleObserver.observe(portfolioEl);
    if (titleEl) simpleObserver.observe(titleEl);
    currentCards.forEach((card) => cardObserver.observe(card));

    return () => {
      simpleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, [loading, repos, hideForks]);

  // Close drawer on Esc
  useEffect(() => {
    if (!selectedRepo) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedRepo(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedRepo]);

  const visibleRepos = repos.filter((r) => (hideForks ? !r.fork : true));
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  return (
    <section id="portfolio" className="portfolio-section" ref={portfolioRef}>
      <div className="portfolio-container">
        <h1 className="portfolio-title" ref={titleRef}>
          My GitHub Projects
        </h1>
        <p className="portfolio-subtitle">
          A growing collection of open-source work. Click any project to preview details.
        </p>

        {!loading && !error && (
          <div className="portfolio-stats">
            <div className="portfolio-stat">
              <Code2 size={18} />
              <span>
                <strong>{visibleRepos.length}</strong> projects
              </span>
            </div>
            <div className="portfolio-stat">
              <Star size={18} />
              <span>
                <strong>{totalStars}</strong> stars
              </span>
            </div>
            <button
              type="button"
              className={`portfolio-toggle ${hideForks ? 'active' : ''}`}
              onClick={() => setHideForks((v) => !v)}
              aria-pressed={hideForks}
            >
              {hideForks ? 'Hiding forks' : 'Showing forks'}
            </button>
            <button type="button" className="portfolio-refresh" onClick={fetchRepos}>
              Refresh
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading"></div>
            <p className="loading-text">Fetching projects from GitHub...</p>
          </div>
        )}

        {error && !loading && (
          <div className="portfolio-error">
            <p>Could not load projects: {error}</p>
            <button type="button" onClick={fetchRepos} className="portfolio-refresh">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="portfolio-grid">
            {visibleRepos.map((repo, index) => (
              <button
                key={repo.id}
                type="button"
                className="portfolio-card"
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => setSelectedRepo(repo)}
                aria-label={`Open details for ${repo.name}`}
              >
                <div className="portfolio-card-head">
                  <h2 className="portfolio-card-title">{repo.name}</h2>
                  {repo.fork && <span className="portfolio-badge fork">Fork</span>}
                  {repo.archived && <span className="portfolio-badge archived">Archived</span>}
                </div>
                <p className="portfolio-card-description">
                  {repo.description || 'No description available.'}
                </p>
                <div className="portfolio-card-meta">
                  {repo.language && (
                    <span className="portfolio-lang">
                      <span className="lang-dot" /> {repo.language}
                    </span>
                  )}
                  <span className="portfolio-updated">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>
                <div className="portfolio-card-footer">
                  <span className="portfolio-card-link">
                    <Eye size={16} />
                    View Project
                  </span>
                  <div className="star-container">
                    <Star size={16} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedRepo && (
        <div className="portfolio-drawer-backdrop" onClick={() => setSelectedRepo(null)}>
          <aside
            className="portfolio-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-drawer-close"
              onClick={() => setSelectedRepo(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <header className="portfolio-drawer-head">
              <span className="portfolio-drawer-eyebrow">GitHub Project</span>
              <h2 id="drawer-title" className="portfolio-drawer-title">
                {selectedRepo.name}
              </h2>
              <p className="portfolio-drawer-desc">
                {selectedRepo.description || 'No description provided by the author.'}
              </p>
            </header>

            <div className="portfolio-drawer-grid">
              <div className="portfolio-drawer-stat">
                <Star size={16} />
                <span>
                  <strong>{selectedRepo.stargazers_count}</strong> stars
                </span>
              </div>
              <div className="portfolio-drawer-stat">
                <GitFork size={16} />
                <span>
                  <strong>{selectedRepo.forks_count}</strong> forks
                </span>
              </div>
              {selectedRepo.language && (
                <div className="portfolio-drawer-stat">
                  <Code2 size={16} />
                  <span>{selectedRepo.language}</span>
                </div>
              )}
              <div className="portfolio-drawer-stat">
                <Calendar size={16} />
                <span>Updated {formatDate(selectedRepo.updated_at)}</span>
              </div>
              <div className="portfolio-drawer-stat">
                <Calendar size={16} />
                <span>Created {formatDate(selectedRepo.created_at)}</span>
              </div>
            </div>

            {Array.isArray(selectedRepo.topics) && selectedRepo.topics.length > 0 && (
              <div className="portfolio-drawer-topics">
                {selectedRepo.topics.map((t) => (
                  <span key={t} className="portfolio-topic">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="portfolio-drawer-actions">
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-drawer-primary"
              >
                <ExternalLink size={16} />
                Open on GitHub
              </a>
              {selectedRepo.homepage && (
                <a
                  href={selectedRepo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-drawer-secondary"
                >
                  <Globe size={16} />
                  Live Site
                </a>
              )}
            </div>

            <footer className="portfolio-drawer-foot">
              <span>Default branch: {selectedRepo.default_branch || 'main'}</span>
              {selectedRepo.license && <span>License: {selectedRepo.license.spdx_id || selectedRepo.license.name}</span>}
              {selectedRepo.open_issues_count !== undefined && (
                <span>Open issues: {selectedRepo.open_issues_count}</span>
              )}
            </footer>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Portfolio;
