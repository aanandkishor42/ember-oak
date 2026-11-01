import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Mail, Phone } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { SITE } from '../../data/site';

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  notes: '',
};

const INITIAL_ERRORS = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
};

function validate(values) {
  const errors = { ...INITIAL_ERRORS };
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (!values.phone.trim()) errors.phone = 'Phone number is required.';
  else if (values.phone.replace(/\D/g, '').length < 7)
    errors.phone = 'Please enter a valid phone number.';
  if (!values.date) errors.date = 'Please choose a date.';
  else if (new Date(`${values.date}T00:00:00`) < new Date(new Date().toDateString()))
    errors.date = 'Please choose a future date.';
  if (!values.time) errors.time = 'Please choose a time.';
  if (!values.guests) errors.guests = 'Please select the number of guests.';
  return errors;
}

export default function ReservationSection() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [confirmed, setConfirmed] = useState(null);

  const setValue = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some((err) => err)) return;

    setStatus('loading');
    setTimeout(() => {
      setConfirmed({ ...values });
      setStatus('success');
    }, 1800);
  };

  const reset = () => {
    setValues(INITIAL_VALUES);
    setErrors(INITIAL_ERRORS);
    setStatus('idle');
    setConfirmed(null);
  };

  const formatDate = (value) => {
    if (!value) return '';
    return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="reservations" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="mx-auto grid w-full max-w-7xl items-start gap-14 px-6 md:px-10 lg:grid-cols-5 lg:gap-20 lg:px-12">
        <div className="lg:col-span-2">
          <p className="eyebrow">Reservations</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Reserve a table by the fire
          </h2>
          <div aria-hidden="true" className="mt-6 h-px w-16 bg-gold" />

          <p className="mt-8 text-base leading-relaxed text-cream-muted">
            Tables are released 30 days in advance and evenings at the hearth sell out weeks ahead.
            For private events and the chef&rsquo;s tasting menu, our private dining room seats up
            to 18.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-cream-muted">
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-ember" aria-hidden="true" />
              <span>
                Tue – Sun · <span className="text-cream">5:00 PM – 11:00 PM</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-ember" aria-hidden="true" />
              <span>{SITE.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-ember" aria-hidden="true" />
              <span>{SITE.privateEmail}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="rounded-3xl border border-ember/40 bg-charcoal-panel p-8 text-center sm:p-12"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <motion.div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ember"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                >
                  <Check className="h-9 w-9 text-cream" aria-hidden="true" />
                </motion.div>
                <h3 className="mt-8 font-serif text-3xl">You&rsquo;re on the list</h3>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream-muted">
                  Thank you, {confirmed?.name?.split(' ')[0] || 'friend'}. Your table at the fire is
                  being held. We&rsquo;ll confirm by email shortly.
                </p>
                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-cream/10 bg-charcoal/60 p-5 text-left text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-cream-muted">Date</span>
                    <span className="text-cream">{formatDate(confirmed?.date)}</span>
                  </div>
                  <div className="mt-2 flex justify-between gap-4">
                    <span className="text-cream-muted">Time</span>
                    <span className="text-cream">{confirmed?.time}</span>
                  </div>
                  <div className="mt-2 flex justify-between gap-4">
                    <span className="text-cream-muted">Guests</span>
                    <span className="text-cream">{confirmed?.guests}</span>
                  </div>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button to="/" size="lg">
                    Back to the Fire
                  </Button>
                  <Button size="lg" variant="outline" onClick={reset}>
                    Make another reservation
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                className="rounded-3xl border border-cream/10 bg-charcoal-panel p-6 sm:p-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <h3 className="font-serif text-3xl">Request a reservation</h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Fields marked <span className="text-red-300">*</span> are required.
                </p>

                <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
                  <div className="sm:col-span-2">
                    <Input
                      label="Full name"
                      name="name"
                      autoComplete="name"
                      placeholder="Ada Marlowe"
                      value={values.name}
                      onChange={setValue}
                      error={errors.name}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="ada@example.com"
                      value={values.email}
                      onChange={setValue}
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={values.phone}
                      onChange={setValue}
                      error={errors.phone}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-cream-muted"
                    >
                      Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={values.guests}
                      onChange={setValue}
                      className="h-12 w-full rounded-xl border border-cream/15 bg-charcoal-panel px-4 text-[15px] text-cream focus:border-ember focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-charcoal-panel">
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Input
                      label="Date"
                      name="date"
                      type="date"
                      value={values.date}
                      onChange={setValue}
                      error={errors.date}
                    />
                  </div>

                  <div>
                    <Input
                      label="Time"
                      name="time"
                      type="time"
                      value={values.time}
                      onChange={setValue}
                      error={errors.time}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-cream-muted"
                    >
                      Special requests{' '}
                      <span className="font-normal normal-case tracking-normal text-cream-faint">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={values.notes}
                      onChange={setValue}
                      placeholder="Allergies, celebrations, window seat…"
                      className="h-auto w-full rounded-xl border border-cream/15 bg-charcoal-panel px-4 py-3 text-[15px] text-cream placeholder:text-cream-faint focus:border-ember focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    {status === 'loading' ? (
                      <button
                        type="submit"
                        disabled
                        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ember/60 px-9 text-base font-medium text-cream sm:w-auto"
                      >
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream"
                          aria-hidden="true"
                        />
                        Requesting…
                      </button>
                    ) : (
                      <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Request Reservation
                      </Button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
