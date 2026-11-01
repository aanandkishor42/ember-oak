import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { SITE } from '../../data/site';

const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'Our Story' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-charcoal-deep md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="flex h-full flex-col px-8 pt-24 pb-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close menu"
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <motion.nav aria-label="Mobile" variants={item}>
          {MOBILE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group block font-serif text-5xl leading-none transition-colors duration-300 ${
                  isActive ? 'text-ember' : 'text-cream hover:text-ember-soft'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </motion.nav>

        <motion.div variants={item} className="mt-auto space-y-4 text-cream-muted">
          <p className="eyebrow">Find the fire</p>
          <p className="text-sm leading-relaxed">{SITE.address}</p>
          <p className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-ember" aria-hidden="true" />
            Tue – Sun · 5:00 PM – 11:00 PM
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
