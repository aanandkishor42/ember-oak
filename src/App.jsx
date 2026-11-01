import { lazy, Suspense, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Preloader from './components/layout/Preloader';

const HomePage = lazy(() => import('./pages/Home'));
const MenuPage = lazy(() => import('./pages/Menu'));
const ReservationsPage = lazy(() => import('./pages/Reservations'));
const AboutPage = lazy(() => import('./pages/About'));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span
        className="h-7 w-7 animate-spin rounded-full border-2 border-cream/20 border-t-ember"
        aria-hidden="true"
      />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function App() {
  const prefersReduced = useReducedMotion();
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return !sessionStorage.getItem('ember-oak-preloader-seen');
    } catch {
      return true;
    }
  });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handlePreloaderDone = () => {
    try {
      sessionStorage.setItem('ember-oak-preloader-seen', 'true');
    } catch {
      /* storage unavailable — proceed anyway */
    }
    setLoading(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {loading ? <Preloader onDone={handlePreloaderDone} /> : null}
        <div className="grain" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[3000] focus:rounded-full focus:bg-ember-dark focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <Navbar />
        <m.main
          id="main"
          key={location.pathname}
          tabIndex={-1}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="min-h-dvh bg-charcoal"
        >
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </m.main>
        <Footer />
        <BackToTop />
      </MotionConfig>
    </LazyMotion>
  );
}
