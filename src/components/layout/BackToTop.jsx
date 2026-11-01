import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export default function BackToTop() {
  const { y } = useScrollPosition();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(y > 600);
  }, [y]);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 bg-charcoal-panel text-cream shadow-lg transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
