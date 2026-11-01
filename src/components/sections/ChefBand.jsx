import { m } from 'framer-motion';
import { Flame } from 'lucide-react';
import Button from '../ui/Button';
import { IMAGES } from '../../utils/images';

export default function ChefBand() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Meet the chef">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="relative">
          <m.img
            src={IMAGES.storySmall.src}
            srcSet={IMAGES.storySmall.srcSet}
            sizes="(min-width: 1024px) 560px, 100vw"
            width={IMAGES.storySmall.width}
            height={IMAGES.storySmall.height}
            alt="Chef Marisol Vega at the open hearth of the kitchen"
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            className="h-[420px] w-full rounded-3xl border border-cream/10 object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <m.div
            className="absolute -bottom-5 -right-3 flex h-24 w-24 items-center justify-center rounded-full bg-ember shadow-glow sm:h-28 sm:w-28 md:-right-6 lg:h-32 lg:w-32"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <Flame className="h-10 w-10 text-cream lg:h-12 lg:w-12" aria-hidden="true" />
          </m.div>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">The Chef</p>
          <h2 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3rem)] leading-tight">
            Chef Marisol Vega
          </h2>
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
