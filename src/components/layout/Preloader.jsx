import { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let raf = null;
    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(100, Math.round((elapsed / 1200) * 100));
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !exiting) {
      const t = setTimeout(() => setExiting(true), 150);
      return () => clearTimeout(t);
    }
  }, [progress, exiting]);

  const handleAnimationComplete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <m.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-charcoal"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={handleAnimationComplete}
        >
          <m.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Flame className="h-8 w-8 text-ember" aria-hidden="true" />
            <p className="font-serif text-4xl tracking-[0.34em] text-cream">EMBER</p>
            <p className="font-serif text-4xl tracking-[0.34em] text-ember-soft">
              &amp; <span className="italic">OAK</span>
            </p>
          </m.div>
          <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.4em] text-cream-faint">
            {Math.min(progress, 100)}%
          </p>
        </m.div>
      )}
      {exiting && (
        <m.div
          className="fixed inset-0 z-[110] bg-charcoal"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </AnimatePresence>
  );
}
