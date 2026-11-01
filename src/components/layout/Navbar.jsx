import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'Our Story' },
];

export default function Navbar() {
  const { y } = useScrollPosition();
  const scrolled = y > 24;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const linkClass = ({ isActive }) =>
    `relative py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 after:absolute after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-ember after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 ${
      isActive
        ? 'text-cream after:scale-x-100'
        : 'text-cream-muted after:scale-x-0 hover:text-cream'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'border-b border-cream/10 bg-charcoal/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 h-[2px] origin-left bg-ember"
        style={{ scaleX }}
      />

      <nav
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-12"
        aria-label="Primary"
      >
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="font-serif text-xl tracking-[0.24em] text-cream transition-colors hover:text-ember-soft"
        >
          EMBER <span className="text-ember">&</span> OAK
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button to="/reservations" size="sm">
              Reserve a Table
            </Button>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
