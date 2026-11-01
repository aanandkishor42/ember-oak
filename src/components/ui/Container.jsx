import { cn } from '../../utils/cn';

export default function Container({ className, children }) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12', className)}>
      {children}
    </div>
  );
}
