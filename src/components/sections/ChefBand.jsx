import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import Button from '../ui/Button';
import { IMAGES } from '../../utils/images';

export default function ChefBand() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Meet the chef">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="relative">
          <motion.img
            src={IMAGES.storySmall}
            alt="Chef Marisol Vega at the open hearth of the kitchen"
            className="h-[420px] w-full rounded-3xl object-cover border border-cream/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute -bottom-5 -right-4 flex h-32 w-32 items-center justify-center rounded-full bg-ember shadow-glow md:-right-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <Flame className="h-12 w-12 text-cream" aria-hidden="true" />
          </motion.div>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">The Chef</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Chef Marisol Vega</h2>
          <div aria-hidden="true" className="mt-6 h-px w-16 bg-gold" />

          <p className="mt-8 text-base leading-relaxed text-cream-muted">
            Trained in Lyon and Barcelona, Marisol returned to Portland in 2012 to build a fire that
            could do justice to the ingredients of the Pacific Northwest. Her kitchen runs on a
            hand-built oak grill and an obsession with smoke.
          </p>
          <blockquote className="mt-6 border-l-2 border-ember pl-6 font-serif text-2xl italic text-cream">
            &ldquo;I don&rsquo;t cook with fire. I cook with the hours the fire chooses to
            burn.&rdquo;
          </blockquote>

          <div className="mt-10">
            <Button to="/reservations" size="lg" variant="outline">
              Book a Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
