import { useEffect, useRef, useState } from 'react';
import {
  m,
  useMotionValue,
  animate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { IMAGES } from '../../utils/images';
import { useInView } from '../../hooks/useInView';
import { useMediaQuery } from '../../hooks/useMediaQuery';

function Counter({ to, suffix, duration = 2000, reduceMotion }) {
  const { ref: invRef, inView } = useInView({ threshold: 0.4 });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(motionValue, to, {
      duration: reduceMotion ? 0 : duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        const rounded = Math.round(v);
        setDisplay(to >= 1000 ? `${Math.round(rounded / 1000)}K${suffix}` : `${rounded}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, motionValue, to, duration, suffix, reduceMotion]);

  return (
    <span ref={invRef} className="font-serif text-4xl text-cream sm:text-5xl">
      {display}
    </span>
  );
}

const STATS = [
  { value: 14, suffix: '', label: 'Years of fire' },
  { value: 482000, suffix: '', label: 'Dishes served', format: (v) => `${Math.round(v / 1000)}K` },
  { value: 12, suffix: '', label: 'International awards' },
];

export default function About() {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const parallaxStyle = prefersReduced || isMobile ? undefined : { y };

  return (
    <section id="story" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div ref={imageRef} className="relative">
          <m.img
            src={IMAGES.storyMain.src}
            srcSet={IMAGES.storyMain.srcSet}
            sizes="(min-width: 1024px) 560px, 100vw"
            width={IMAGES.storyMain.width}
            height={IMAGES.storyMain.height}
            alt="The warm dining room of Ember & Oak, lit by candlelight and the hearth glow"
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            style={parallaxStyle}
            className="h-[420px] w-full rounded-3xl border border-cream/10 object-cover md:h-[520px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <m.img
            src={IMAGES.storySmall.src}
            srcSet={IMAGES.storySmall.srcSet}
            sizes="224px"
            width={IMAGES.storySmall.width}
            height={IMAGES.storySmall.height}
            alt="Chef Marisol Vega plating a dish at the open hearth"
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            className="absolute -bottom-8 -right-3 h-56 w-56 max-w-[60%] rounded-3xl border-4 border-charcoal object-cover shadow-2xl md:-right-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          />
        </div>

        <div>
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3rem)] leading-tight">
              A flame that has burned for over a decade
            </h2>
            <div aria-hidden="true" className="mt-6 h-px w-16 bg-gold" />
          </div>

          <m.div
            className="mt-10 space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-base leading-relaxed text-cream-muted">
              EMBER &amp; OAK began in 2012 with a single wood-fired hearth and a stubborn belief:
              that fire is the first and finest chef. What started as twelve tables in a converted
              mill is now one of the city&rsquo;s most sought-after rooms — but the fire never
              changed.
            </p>
            <p className="text-base leading-relaxed text-cream-muted">
              Chef Marisol Vega cooks by feel and instinct, tending a hand-built oak grill over
              hours, sometimes all night, until the smoke does the seasoning for her. Every plate
              that leaves the pass tells the story of the burn.
            </p>
          </m.div>

          <dl className="mt-12 grid grid-cols-3 gap-3 border-y border-cream/10 py-8 sm:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="order-2 mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-cream-faint sm:text-xs sm:tracking-[0.18em]">
                  {stat.label}
                </dt>
                <dd className="order-1">
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                    reduceMotion={prefersReduced}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
