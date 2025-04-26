import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Description from './components/Description';
import Tech from './components/Tech';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Navbar />
        <Description />
        <Tech />
        <Portfolio />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;