import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Description from './components/Description';
import Tech from './components/Tech';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Journey from './components/Journey';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <ErrorBoundary>
      <div className="App" id="home">
        <Navbar />
        <Description />
        <Tech />
        <Journey />
        <Portfolio />
        <Footer />
        <Analytics />
      </div>
    </ErrorBoundary>
  );
}

export default App;
