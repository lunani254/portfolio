import React, { Suspense, lazy } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Description from './components/Description';
import ErrorBoundary from './components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';

// Lazy-load below-the-fold sections so the initial bundle stays small
// and the first paint happens faster in production.
const Tech = lazy(() => import('./components/Tech'));
const Journey = lazy(() => import('./components/Journey'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div
      style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a15',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '0.9rem',
      }}
      aria-hidden="true"
    >
      Loading…
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App" id="home">
        <Navbar />
        <Description />
        <Suspense fallback={<SectionFallback />}>
          <Tech />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
        <Analytics />
      </div>
    </ErrorBoundary>
  );
}

export default App;
