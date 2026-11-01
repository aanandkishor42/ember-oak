import { cn } from '../../utils/cn';

export default function Input({ label, error, hint, className, id, ...rest }) {
  const inputId = id ?? rest.name ?? 'field';
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-cream-muted"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          'h-12 w-full rounded-xl border bg-charcoal-panel px-4 text-base text-cream transition-colors duration-300 placeholder:text-cream-faint focus:border-ember focus:outline-none',
          error ? 'border-red-500/70 focus:border-red-500' : 'border-cream/15'
        )}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-2 text-sm text-cream-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
