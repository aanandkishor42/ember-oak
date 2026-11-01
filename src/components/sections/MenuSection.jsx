import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Leaf, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { MENU_CATEGORIES, getDishesByCategory } from '../../data/menu';

export default function MenuSection() {
  const [active, setActive] = useState(MENU_CATEGORIES[0]);
  const dishes = getDishesByCategory(active);

  return (
    <section id="menu" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
        <SectionHeading
          eyebrow="The Menu"
          title="Forged in flame, plated with intent"
          description="Every dish is cooked over live oak fire. Menus shift with the seasons — what follows is tonight's iteration."
        />

        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(category)}
                className={`rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${
                  isActive
                    ? 'border-ember bg-ember text-cream shadow-glow'
                    : 'border-cream/15 text-cream-muted hover:border-ember/60 hover:text-cream'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ul className="grid gap-5 md:grid-cols-2">
                {dishes.map((dish, index) => (
                  <motion.li
                    key={dish.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                    className="rounded-2xl border border-cream/10 bg-charcoal-panel p-6 transition-colors duration-300 hover:border-ember/40"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-xl leading-snug">{dish.name}</h3>
                      <span className="font-serif text-xl italic text-ember-soft">
                        ${dish.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-cream-muted">
                      {dish.description}
                    </p>
                    {(dish.veg || dish.spicy || dish.chefPick) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {dish.chefPick ? (
                          <Badge variant="chef">
                            <Sparkles className="h-3 w-3" aria-hidden="true" /> Chef&rsquo;s Pick
                          </Badge>
                        ) : null}
                        {dish.veg ? (
                          <Badge variant="veg">
                            <Leaf className="h-3 w-3" aria-hidden="true" /> Vegetarian
                          </Badge>
                        ) : null}
                        {dish.spicy ? (
                          <Badge variant="spicy">
                            <Flame className="h-3 w-3" aria-hidden="true" /> Spicy
                          </Badge>
                        ) : null}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
