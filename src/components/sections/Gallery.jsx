import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../ui/Modal';
import { GALLERY_ITEMS } from '../../data/gallery';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length),
    []
  );
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % GALLERY_ITEMS.length), []);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, next, prev]);

  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Gallery">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="eyebrow">The Table</p>
          <h2 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3rem)] leading-tight">Gallery</h2>
          <div aria-hidden="true" className="mt-6 h-px w-16 bg-gold" />
        </div>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="gallery-card group relative mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              aria-label={`Open photo: ${item.caption}`}
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt=""
                fetchPriority="low"
                loading="lazy"
                decoding="async"
                width={item.width}
                height={item.height}
                className="gallery-media w-full"
              />
              <span className="gallery-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <span className="gallery-caption absolute bottom-3 left-4 right-4 text-left text-sm font-medium text-cream">
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <Modal open onClose={close} label="Photo viewer" onSwipeLeft={next} onSwipeRight={prev}>
            {(() => {
              const item = GALLERY_ITEMS[lightboxIndex];
              return (
                <div className="overflow-hidden">
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="(min-width: 768px) 640px, 100vw"
                    alt={item.caption}
                    width={item.width}
                    height={item.height}
                    decoding="async"
                    className="max-h-[50vh] max-h-[55dvh] w-full rounded-xl object-cover"
                  />
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-serif text-xl italic text-cream">{item.caption}</p>
                      <p
                        className="mt-2 text-xs uppercase tracking-[0.3em] text-cream-faint"
                        aria-live="polite"
                      >
                        {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous photo"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                      >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next photo"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                      >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Modal>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
