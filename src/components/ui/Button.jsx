import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const VARIANTS = {
  primary: 'bg-ember-dark text-cream shadow-glow hover:bg-[#8C3A15] focus-visible:bg-[#8C3A15]',
  outline:
    'border border-cream/25 bg-transparent text-cream hover:border-ember hover:text-ember focus-visible:border-ember',
  ghost: 'bg-transparent text-cream/80 hover:text-cream focus-visible:text-cream',
};

const SIZES = {
  sm: 'h-11 px-5 text-sm',
  md: 'h-12 px-7 text-base',
  lg: 'h-14 px-9 text-base',
};

export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}) {
  const classes = cn(
    'btn-lift relative inline-flex min-h-[44px] items-center justify-center gap-2 overflow-hidden rounded-full font-medium',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const content = (
    <>
      {children}
      {variant === 'primary' ? (
        <span
          aria-hidden="true"
          className="btn-shine pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cream/25 to-transparent"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
