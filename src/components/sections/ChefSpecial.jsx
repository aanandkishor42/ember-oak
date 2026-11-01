import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Flame } from 'lucide-react';
import Button from '../ui/Button';
import { IMAGES } from '../../utils/images';

export default function ChefSpecial() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '22%']);
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[560px] overflow-hidden">
      <motion.div style={prefersReduced ? undefined : { y }} className="absolute inset-0">
        <img
          src={IMAGES.chefSpecial}
          alt="Chef Marisol Vega cooking over the open oak flame"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          Chef&rsquo;s Special
        </motion.p>

        <motion.blockquote
          className="mt-6 font-serif text-3xl leading-snug text-cream italic md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          &ldquo;The fire is not a tool. It is a conversation — and we have been listening for
          years.&rdquo;
        </motion.blockquote>

        <motion.p
          className="mt-6 text-sm uppercase tracking-[0.28em] text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <Flame className="mr-2 inline h-4 w-4 text-ember" aria-hidden="true" />
          Chef Marisol Vega
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <Button to="/reservations" size="lg">
            Book the Tasting
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
