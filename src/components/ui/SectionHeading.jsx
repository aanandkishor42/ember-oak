import { m } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}) {
  return (
    <m.div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3rem)] leading-tight">{title}</h2>
      <div
        aria-hidden="true"
        className={cn('mt-6 h-px w-16 bg-gold', align === 'center' ? 'mx-auto' : 'ml-0')}
      />
      {description ? (
        <p className="mt-6 text-base leading-relaxed text-cream-muted">{description}</p>
      ) : null}
    </m.div>
  );
}
