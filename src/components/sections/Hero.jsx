import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { IMAGES } from '../../utils/images';

const HEADLINE = ['Where', 'fire', 'meets', 'oak.'];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const motionStyle = prefersReduced || isMobile ? undefined : { y, scale };

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-dvh overflow-hidden" aria-label="Introduction">
      <m.div style={motionStyle} className="absolute inset-0">
        <img
          src={IMAGES.hero.src}
          srcSet={IMAGES.hero.srcSet}
          sizes="100vw"
          width={IMAGES.hero.width}
          height={IMAGES.hero.height}
          alt="The dining room of Ember & Oak at dusk, lit by the glow of the open hearth"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </m.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/70 to-charcoal"
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col items-center justify-center px-6 pb-28 pt-32 text-center">
        <m.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          The Modern Fire Kitchen
        </m.p>

        <h1 className="mt-6 font-serif text-[clamp(3rem,8.5vw,7rem)] leading-[1.04] text-cream">
          {HEADLINE.map((word, i) => {
            const isLast = i === HEADLINE.length - 1;
            return (
              <span
                key={word}
                className="mr-[0.28em] inline-block overflow-hidden pb-2 align-bottom"
              >
                <m.span
                  className="inline-block"
                  style={isLast ? { fontStyle: 'italic', color: '#D9622B' } : undefined}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05 + i * 0.06,
                  }}
                >
                  {word}
                  {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                </m.span>
              </span>
            );
          })}
        </h1>

        <m.p
          className="mt-9 max-w-2xl text-[clamp(1rem,2.4vw,1.125rem)] font-light leading-relaxed text-cream-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          A modern fire kitchen where oak smoke and open flame turn humble ingredients into quiet
          luxury.
        </m.p>

        <m.div
          className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button to="/menu" size="lg" className="w-full sm:w-auto">
            Explore the Menu
          </Button>
          <Button to="/reservations" size="lg" variant="outline" className="w-full sm:w-auto">
            Book a Table
          </Button>
        </m.div>
      </div>

      <m.button
        type="button"
        onClick={scrollToStory}
        aria-label="Scroll to our story"
        className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center text-cream/70 transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
        animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-7 w-7" aria-hidden="true" />
      </m.button>
    </section>
  );
}
