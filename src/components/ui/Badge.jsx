import { cn } from '../../utils/cn';

const VARIANTS = {
  veg: 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300',
  spicy: 'border-orange-900/60 bg-orange-950/40 text-orange-300',
  chef: 'border-gold-dark/60 bg-gold-dark/20 text-gold-soft',
};

export default function Badge({ variant, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
