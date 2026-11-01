import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { m } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { SITE } from '../../data/site';

const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'Our Story' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) || []).filter(
        (el) => el.offsetParent !== null
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <m.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-charcoal-deep md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <m.div
        className="flex min-h-dvh flex-col px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))] sm:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-5 top-[calc(1.25rem+env(safe-area-inset-top))] flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <m.nav aria-label="Mobile" variants={item}>
          {MOBILE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex min-h-[44px] items-center py-2 font-serif text-[clamp(2rem,9vw,3rem)] leading-[1.05] transition-colors duration-300 ${
                  isActive ? 'text-ember' : 'text-cream hover:text-ember-soft'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </m.nav>

        <m.div variants={item} className="mt-auto space-y-4 pt-10 text-cream-muted">
          <p className="eyebrow">Find the fire</p>
          <p className="text-sm leading-relaxed">{SITE.address}</p>
          <p className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
            Tue – Sun · 5:00 PM – 11:00 PM
          </p>
        </m.div>
      </m.div>
    </m.div>,
    document.body
  );
}
