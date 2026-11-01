import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { IMAGES } from '../../utils/images';

const HEADLINE = ['Where', 'fire', 'meets', 'oak.'];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const prefersReduced = useReducedMotion();

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Introduction">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="The dining room of Ember & Oak at dusk, lit by the glow of the open hearth"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/70 to-charcoal"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 pb-28 pt-32 text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Modern Fire Kitchen
        </motion.p>

        <h1 className="mt-6 font-serif text-[3.25rem] leading-[1.04] text-cream sm:text-6xl lg:text-7xl">
          {HEADLINE.map((word, i) => {
            const isLast = i === HEADLINE.length - 1;
            return (
              <span
                key={word}
                className="mr-[0.28em] inline-block overflow-hidden pb-2 align-bottom"
              >
                <motion.span
                  className="inline-block"
                  style={isLast ? { fontStyle: 'italic', color: '#D9622B' } : undefined}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.35 + i * 0.13,
                  }}
                >
                  {word}
                  {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          className="mt-9 max-w-2xl text-lg font-light leading-relaxed text-cream-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          A modern fire kitchen where oak smoke and open flame turn humble ingredients into quiet
          luxury.
        </motion.p>

        <motion.div
          className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          <Button to="/menu" size="lg">
            Explore the Menu
          </Button>
          <Button to="/reservations" size="lg" variant="outline">
            Book a Table
          </Button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToStory}
        aria-label="Scroll to our story"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/70 transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
        animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-7 w-7" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
