import { m } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { SITE } from '../../data/site';

export default function HoursLocation() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Hours and location"
    >
      <div className="mx-auto grid w-full max-w-7xl items-start gap-14 px-6 md:px-10 lg:grid-cols-5 lg:gap-20 lg:px-12">
        <div className="lg:col-span-2">
          <p className="eyebrow">Visit</p>
          <h2 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3rem)] leading-tight">
            Find the fire
          </h2>
          <div aria-hidden="true" className="mt-6 h-px w-16 bg-gold" />

          <div className="mt-12 space-y-6">
            {SITE.hours.map((h) => (
              <div
                key={h.days}
                className="flex items-baseline justify-between gap-6 border-b border-cream/10 pb-3"
              >
                <span className="text-cream-muted">{h.days}</span>
                <span className="font-serif text-lg text-cream">{h.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4 text-sm text-cream-muted">
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
              {SITE.address}
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
              {SITE.phone}
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
              {SITE.email}
            </p>
            <p className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
              Private dining: by appointment
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-cream/10 sm:h-[480px]">
            <div className="map-placeholder absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="flex items-center gap-2 text-sm font-medium text-cream">
                <MapPin className="h-4 w-4 text-ember" aria-hidden="true" />
                {SITE.address}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">
                Find us on Hearthstone Lane
              </p>
            </div>
          </div>
          <m.a
            href="https://maps.google.com/?q=128+Hearthstone+Lane+Portland+OR"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-full border border-cream/15 px-6 text-sm font-medium text-cream transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Get directions
          </m.a>
        </div>
      </div>
    </section>
  );
}
