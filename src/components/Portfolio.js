import React from 'react';
import '../portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h2>PORTFOLIO</h2>
      <div className='project'>
        <div className='video-container'>
          <iframe 
            src="https://www.youtube.com/embed/K7OfIonjjnI" 
            title="my stacks" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
        <div className='description'>
          <h3>MOBILE APP REACT NATIVE</h3>
          <p>The React Native app for auctions enhances security and integration of payment systems by incorporating action functionality and data retrieval from Firebase.</p>
        </div>
      </div>
      <a href="https://github.com/lunani254" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#333' }}>
        <h3>more on Github</h3>
      </a>
    </div>
  );
}

export default Portfolio;