import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Flame, Leaf, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { MENU_CATEGORIES, getDishesByCategory } from '../../data/menu';

export default function MenuSection() {
  const [active, setActive] = useState(MENU_CATEGORIES[0]);
  const tabsRef = useRef([]);
  const dishes = getDishesByCategory(active);
  const activeIndex = MENU_CATEGORIES.indexOf(active);

  const onTabKeyDown = (event, index) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % MENU_CATEGORIES.length;
    if (event.key === 'ArrowLeft')
      nextIndex = (index - 1 + MENU_CATEGORIES.length) % MENU_CATEGORIES.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = MENU_CATEGORIES.length - 1;
    setActive(MENU_CATEGORIES[nextIndex]);
    tabsRef.current[nextIndex]?.focus();
  };

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
          className="mt-14 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {MENU_CATEGORIES.map((category, index) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`menu-tab-${index}`}
                aria-selected={isActive}
                aria-controls="menu-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(category)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember sm:px-6 ${
                  isActive
                    ? 'border-ember bg-ember-dark text-cream shadow-glow'
                    : 'border-cream/15 text-cream-muted hover:border-ember/60 hover:text-cream'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div
          className="mt-14"
          role="tabpanel"
          id="menu-panel"
          aria-labelledby={`menu-tab-${activeIndex}`}
        >
          <AnimatePresence mode="wait">
            <m.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ul className="grid gap-5 md:grid-cols-2">
                {dishes.map((dish, index) => (
                  <m.li
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
                  </m.li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
