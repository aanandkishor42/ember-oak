import { m } from 'framer-motion';
import { cn } from '../../utils/cn';
import Badge from './Badge';

const dishSrcSet = (src) => {
  if (!src || !src.includes('images.unsplash.com') || !/[?&]w=\d+/.test(src)) return undefined;
  return [400, 600, 900, 1200]
    .map((width) => `${src.replace(/([?&])w=\d+/, `$1w=${width}`)} ${width}w`)
    .join(', ');
};

export default function DishCard({ dish, className }) {
  return (
    <m.article
      className={cn(
        'card-zoom group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-panel',
        className
      )}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {dish.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={dish.image}
            srcSet={dishSrcSet(dish.image)}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
            alt=""
            width={900}
            height={675}
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            className="card-media h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-panel/90 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl leading-snug">{dish.name}</h3>
          <p className="font-serif text-2xl italic text-ember-soft">${dish.price}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-cream-muted">{dish.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {dish.chefPick ? <Badge variant="chef">Chef&rsquo;s Pick</Badge> : null}
          {dish.veg ? <Badge variant="veg">Vegetarian</Badge> : null}
          {dish.spicy ? <Badge variant="spicy">Spicy</Badge> : null}
        </div>
      </div>
    </m.article>
  );
}
