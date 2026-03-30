/* ============================================================
   APP.JSX — Root component
   Sets up React Router with 3 routes: Home, About, Projects.
   Wraps everything in the dark synthwave background shell.
   ============================================================ */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar      from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home        from './pages/Home';
import About       from './pages/About';
import Projects    from './pages/Projects';

export default function App() {
  // Controls the initial page fade-in on first load
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Scroll to top whenever the route changes */}
      <ScrollToTop />

      {/* Page wrapper — fades in on load */}
      <div
        className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        {/* Navigation bar — shown on every page */}
        <Navbar />

        {/* Page routes */}
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}
