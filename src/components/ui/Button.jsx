import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

const VARIANTS = {
  primary: 'bg-ember text-cream shadow-glow hover:bg-ember-dark focus-visible:bg-ember-dark',
  outline:
    'border border-cream/25 bg-transparent text-cream hover:border-ember hover:text-ember focus-visible:border-ember',
  ghost: 'bg-transparent text-cream/80 hover:text-cream focus-visible:text-cream',
};

const SIZES = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-[15px]',
  lg: 'h-14 px-9 text-base',
};

export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  type,
  ...rest
}) {
  const navigate = useNavigate();

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
    type,
    ...rest,
  };

  const content = (
    <>
      {children}
      {variant === 'primary' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cream/25 to-transparent -translate-x-full transition-transform duration-700 hover:translate-x-full"
        />
      ) : null}
    </>
  );

  const motionClass = cn('group relative overflow-hidden', classes);

  if (to) {
    return (
      <motion.button className={motionClass} {...motionProps} onClick={() => navigate(to)}>
        {content}
      </motion.button>
    );
  }

  return (
    <motion.button className={motionClass} {...motionProps}>
      {content}
    </motion.button>
  );
}
