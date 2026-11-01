import { useEffect, useRef, useState } from 'react';

/**
 * Defers mounting heavy below-the-fold sections until they are close to the
 * viewport. Keeps the initial render (and main-thread work) small on mobile
 * without changing the final layout.
 */
export default function DeferredSection({
  children,
  rootMargin = '1400px 0px',
  minHeight = '70vh',
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [ready, rootMargin]);

  return (
    <div ref={ref} style={ready ? undefined : { minHeight }}>
      {ready ? children : null}
    </div>
  );
}
