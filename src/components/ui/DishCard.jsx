import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import Badge from './Badge';

export default function DishCard({ dish, className }) {
  return (
    <motion.article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-panel',
        className
      )}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {dish.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
    </motion.article>
  );
}
