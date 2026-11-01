import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { SITE } from '../../data/site';

const SOCIALS = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'Facebook', Icon: Facebook },
  { label: 'Twitter', Icon: Twitter },
  { label: 'YouTube', Icon: Youtube },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState('idle'); // idle | error | done

  const subscribe = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setNewsletterState('error');
      return;
    }
    setNewsletterState('done');
  };

  return (
    <footer className="border-t border-cream/10 bg-charcoal-deep">
      <div className="mx-auto w-full max-w-7xl px-6 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-16 md:px-10 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl tracking-[0.2em] text-cream">
              EMBER <span className="text-ember">&</span> OAK
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">
              {SITE.tagline} A modern fire kitchen where oak smoke and open flame turn humble
              ingredients into quiet luxury.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <m.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.12, rotate: -6 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={(e) => e.preventDefault()}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream-muted transition-colors hover:border-ember hover:text-ember"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </m.a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/reservations', label: 'Reservations' },
                { to: '/about', label: 'Our Story' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex min-h-[44px] items-center gap-1 text-sm text-cream-muted transition-colors hover:text-ember"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-cream-muted">
              <li>
                <MapPin className="mr-2 inline h-4 w-4 text-ember" aria-hidden="true" />
                {SITE.address}
              </li>
              <li>
                <Phone className="mr-2 inline h-4 w-4 text-ember" aria-hidden="true" />
                {SITE.phone}
              </li>
              <li>
                <Mail className="mr-2 inline h-4 w-4 text-ember" aria-hidden="true" />
                {SITE.email}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">The Hearth Letter</p>
            <p className="mt-4 text-sm leading-relaxed text-cream-muted">
              Fire stories, chef&rsquo;s notes and tables worth booking. Once a month.
            </p>
            {newsletterState === 'done' ? (
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-300">
                <Check className="h-4 w-4" aria-hidden="true" />
                You&rsquo;re on the list. Welcome to the fire.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-5 flex gap-2" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterState === 'error') setNewsletterState('idle');
                  }}
                  className="h-11 min-w-0 flex-1 rounded-full border border-cream/15 bg-charcoal-panel px-4 text-base text-cream placeholder:text-cream-faint focus:border-ember focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-full bg-ember-dark px-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-[#8C3A15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  Join
                </button>
                {newsletterState === 'error' ? (
                  <p role="alert" className="sr-only">
                    Please enter a valid email address.
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream-faint">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream-faint">Old Mill District · Portland, Oregon</p>
        </div>
      </div>
    </footer>
  );
}
