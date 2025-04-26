import { useEffect, useState } from "react";
import "../portfolio.css";

function Portfolio() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/lunani254/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((error) => console.error("Error fetching repos:", error));
  }, []);

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">My GitHub Projects</h1>
      <div className="portfolio-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="portfolio-card">
            <h2>{repo.name}</h2>
            <p>{repo.description || "No description available."}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
            <p>⭐ {repo.stargazers_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
