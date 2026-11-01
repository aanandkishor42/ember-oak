import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Testimonials">
      <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">
        <p className="eyebrow">Word of Mouth</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">From the table</h2>
        <div aria-hidden="true" className="mx-auto mt-6 h-px w-16 bg-gold" />

        <div className="relative mt-14 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="text-center"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div
                className="mb-6 flex justify-center gap-1"
                aria-label={`${TESTIMONIALS[index].rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < TESTIMONIALS[index].rating ? 'text-gold' : 'text-cream/15'}`}
                    fill={i < TESTIMONIALS[index].rating ? 'currentColor' : 'none'}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="font-serif text-2xl leading-snug text-cream italic md:text-3xl">
                &ldquo;{TESTIMONIALS[index].quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-medium text-cream">{TESTIMONIALS[index].name}</p>
                <p className="mt-1 text-sm text-cream-faint">{TESTIMONIALS[index].role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Testimonial pages">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${
                  i === index ? 'w-8 bg-ember' : 'w-2 bg-cream/20 hover:bg-cream/40'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
