import React, { Suspense, lazy } from 'react';
import { Analytics } from "@vercel/analytics/next"
import './styles/App.css';
import Navbar from './components/Navbar';
import Description from './components/Description';
import ErrorBoundary from './components/ErrorBoundary';
import SectionSkeleton from './components/SectionSkeleton';
import { Analytics } from '@vercel/analytics/react';

// Lazy-load below-the-fold sections so the initial bundle stays small
// and the first paint happens faster in production.
const Tech = lazy(() => import('./components/Tech'));
const Journey = lazy(() => import('./components/Journey'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <ErrorBoundary>
      <div className="App" id="home">
        <Navbar />
        <Description />
        <Suspense fallback={<SectionSkeleton variant="tech" minHeight="70vh" label="Loading tech stack" />}>
          <Tech />
        </Suspense>
        <Suspense fallback={<SectionSkeleton variant="journey" minHeight="90vh" label="Loading journey" />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<SectionSkeleton variant="portfolio" minHeight="80vh" label="Loading portfolio" />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<SectionSkeleton variant="footer" minHeight="30vh" label="Loading footer" />}>
          <Footer />
        </Suspense>
        <Analytics />
      </div>
    </ErrorBoundary>
  );
}

export default App;
