
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Description from './components/Description';
import Tech from './components/Tech';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Description />
      <Tech />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;
