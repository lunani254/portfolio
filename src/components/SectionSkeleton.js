import React from 'react';
import '../styles/SectionSkeleton.css';

/**
 * SectionSkeleton
 * ---------------
 * Minimalist skeleton placeholder for lazy-loaded sections. Instead of
 * a bare "Loading..." string, we paint the approximate shape of the
 * real section with a shimmering pulse — the same pattern modern
 * native apps use. This keeps the layout stable while JS/CSS stream
 * in, so on slow connections the page never "jumps" when a chunk
 * arrives.
 *
 * Variants roughly mirror each real section's silhouette.
 */
function SectionSkeleton({ variant = 'default', minHeight = '60vh', label }) {
  return (
    <div
      className={`section-skeleton skeleton-${variant}`}
      style={{ minHeight }}
      role="status"
      aria-busy="true"
      aria-label={label || 'Loading section'}
    >
      <div className="skeleton-inner">
        <div className="skeleton-header">
          <span className="skeleton-line skeleton-title pulse" />
          <span className="skeleton-line skeleton-subtitle pulse" />
          <span className="skeleton-line skeleton-divider pulse" />
        </div>

        {variant === 'tech' && (
          <div className="skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-chip pulse" style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        )}

        {variant === 'journey' && (
          <div className="skeleton-journey">
            <span className="skeleton-rail pulse" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-milestone" style={{ animationDelay: `${i * 120}ms` }}>
                <span className="skeleton-dot pulse" />
                <span className="skeleton-card pulse" />
              </div>
            ))}
          </div>
        )}

        {variant === 'portfolio' && (
          <div className="skeleton-card-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-project pulse" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="skeleton-line skeleton-small" />
                <span className="skeleton-line skeleton-xs" />
                <span className="skeleton-line skeleton-xs short" />
              </div>
            ))}
          </div>
        )}

        {variant === 'footer' && (
          <div className="skeleton-footer-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="skeleton-line skeleton-footer-line pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        )}

        {variant === 'default' && (
          <div className="skeleton-default-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="skeleton-line pulse" style={{ animationDelay: `${i * 90}ms` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionSkeleton;
