import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { m } from 'framer-motion';
import { X } from 'lucide-react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, label, children, onSwipeLeft, onSwipeRight }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const touchStart = useRef(null);

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
      const nodes = Array.from(dialogRef.current?.querySelectorAll(FOCUSABLE) || []).filter(
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

  const handleTouchStart = (e) => {
    if (!onSwipeLeft && !onSwipeRight) return;
    touchStart.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null || (!onSwipeLeft && !onSwipeRight)) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) onSwipeLeft?.();
    else onSwipeRight?.();
  };

  return createPortal(
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 px-4 py-4 backdrop-blur-sm sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute right-[calc(1.25rem+env(safe-area-inset-right))] top-[calc(1.25rem+env(safe-area-inset-top))] z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-charcoal/70 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="max-h-[85vh] max-h-[85dvh] w-full max-w-2xl touch-pan-y overflow-y-auto rounded-2xl border border-cream/10 bg-charcoal-panel p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-8"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </m.div>
    </m.div>,
    document.body
  );
}
