import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import "../portfolio.css";

function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const portfolioRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch("https://api.github.com/users/lunani254/repos")
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
        // Reset card refs array when repos change
        cardRefs.current = cardRefs.current.slice(0, data.length);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    // Observer for the main container
    const containerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          containerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer for the title
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          titleObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer for the cards with staggered delay
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay to card animations
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100); // 100ms delay between each card
          cardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Start observing elements
    if (portfolioRef.current) {
      containerObserver.observe(portfolioRef.current);
    }

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    cardRefs.current.forEach(card => {
      if (card) {
        cardObserver.observe(card);
      }
    });

    // Cleanup function
    return () => {
      if (portfolioRef.current) containerObserver.unobserve(portfolioRef.current);
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      cardRefs.current.forEach(card => {
        if (card) cardObserver.unobserve(card);
      });
    };
  }, [loading, repos]);

  if (loading) {
    return (
      <div className="portfolio-container" ref={portfolioRef}>
        <h1 className="portfolio-title" ref={titleRef}>My GitHub Projects</h1>
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container" ref={portfolioRef}>
      <h1 className="portfolio-title" ref={titleRef}>My GitHub Projects</h1>
      <div className="portfolio-grid">
        {repos.map((repo, index) => (
          <div 
            key={repo.id} 
            className="portfolio-card"
            ref={el => cardRefs.current[index] = el}
          >
            <h2>{repo.name}</h2>
            <p>{repo.description || "No description available."}</p>
            <div className="portfolio-card-footer">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="portfolio-card-link"
              >
                View Project
              </a>
              <div className="star-container">
                <Star size={18} fill="#f39c12" color="#f39c12" />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;