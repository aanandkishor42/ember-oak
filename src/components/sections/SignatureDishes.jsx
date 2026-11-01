import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import DishCard from '../ui/DishCard';
import { getSignatureDishes } from '../../data/menu';

export default function SignatureDishes() {
  const trackRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild;
    const amount = firstCard ? firstCard.getBoundingClientRect().width + 24 : 420;
    el.scrollBy({
      left: dir * amount,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  const signatures = getSignatureDishes();

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            align="left"
            eyebrow="The Fire&rsquo;s Favorites"
            title="Signature dishes"
            description="Three plates that define the room — the ones regulars ask for by name, the ones the fire itself seems to have chosen."
            className="max-w-md"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll to previous signature dish"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll to next signature dish"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-14 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-6">
            {signatures.map((dish) => (
              <div key={dish.id} className="w-[85%] shrink-0 snap-start sm:w-[70%] lg:w-[46%]">
                <DishCard dish={dish} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
