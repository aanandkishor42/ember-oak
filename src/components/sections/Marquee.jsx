const ITEMS = ['Wood-Fired', 'Oak-Smoked', 'Open Flame', 'Handcrafted', 'Est. 2012'];

export default function Marquee({ items = ITEMS }) {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-charcoal-deep py-6">
      <div className="flex w-max items-center motion-safe:animate-marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap font-serif text-2xl italic text-cream/70 md:text-3xl">
                  {item}
                </span>
                <span className="mx-7 h-1.5 w-1.5 rotate-45 bg-ember md:mx-9" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
