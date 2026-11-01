import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Preloader from './components/layout/Preloader';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import MenuPage from './pages/Menu';
import ReservationsPage from './pages/Reservations';

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Preloader onDone={() => setLoading(false)} />
      <div className="grain" aria-hidden="true" />
      {!loading ? (
        <>
          <Navbar />
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="min-h-screen bg-charcoal"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.main>
          <Footer />
          <BackToTop />
        </>
      ) : null}
    </>
  );
}
