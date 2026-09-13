'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/services';
import { submitAppointment } from '@/lib/api';

const SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:30 PM'];

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');

  function confirm() {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill in name, phone, and email.');
      return;
    }
    if (!service || !date || !slot) return;
    submitAppointment({ service, date, time: slot, name: name.trim(), phone: phone.trim(), email: email.trim(), notes })
      .then(() => {
        setSummary(`${service} on ${date} at ${slot}, for ${name}. Your appointment request has been received.`);
        setStep(5);
      })
      .catch((error) => alert(error instanceof Error ? error.message : 'Could not submit booking. Please try again.'));
  }

  return (
    <div className="card max-w-[720px] p-10">
      <div className="flex gap-2 mb-9">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`flex-1 h-[3px] ${n <= step ? 'bg-gold-dark dark:bg-gold' : 'bg-[var(--line)]'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" {...fade}>
            <h3 className="mb-1.5 text-navy dark:text-ink text-[19px] font-serif">1. Choose a service</h3>
            <p className="text-muted text-[13.5px] mb-5">Select the area you'd like to discuss.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <div
                  key={s.slug}
                  onClick={() => setService(s.name)}
                  className={`border p-4 cursor-pointer text-sm ${service === s.name ? 'border-gold-dark bg-gold-pale' : 'border-[var(--line)]'}`}
                >
                  <b className="block text-navy dark:text-ink text-[14.5px] mb-1">{s.name}</b>
                  <span className="text-muted text-[12.5px]">{s.description}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-7">
              <button className="btn-gold" onClick={() => (service ? setStep(2) : alert('Please choose a service to continue.'))}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" {...fade}>
            <h3 className="mb-1.5 text-navy dark:text-ink text-[19px] font-serif">2. Choose a date</h3>
            <p className="text-muted text-[13.5px] mb-5">Pick any upcoming weekday.</p>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
            <div className="flex justify-between mt-7">
              <button className="btn-outline" onClick={() => setStep(1)}>Back</button>
              <button className="btn-gold" onClick={() => (date ? setStep(3) : alert('Please choose a date to continue.'))}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" {...fade}>
            <h3 className="mb-1.5 text-navy dark:text-ink text-[19px] font-serif">3. Choose a time</h3>
            <p className="text-muted text-[13.5px] mb-5">Available appointment slots for your selected date.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SLOTS.map((s) => (
                <div key={s} onClick={() => setSlot(s)} className={`border p-3 text-center text-[13.5px] cursor-pointer ${slot === s ? 'border-gold-dark bg-gold-pale text-gold-dark font-semibold' : 'border-[var(--line)]'}`}>
                  {s}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-7">
              <button className="btn-outline" onClick={() => setStep(2)}>Back</button>
              <button className="btn-gold" onClick={() => (slot ? setStep(4) : alert('Please choose a time slot to continue.'))}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" {...fade}>
            <h3 className="mb-4 text-navy dark:text-ink text-[19px] font-serif">4. Your details</h3>
            <div className="grid sm:grid-cols-2 gap-4.5 mb-4.5">
              <div>
                <label className="block text-[13.5px] text-muted mb-2">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
              </div>
              <div>
                <label className="block text-[13.5px] text-muted mb-2">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
              </div>
            </div>
            <div className="mb-4.5">
              <label className="block text-[13.5px] text-muted mb-2">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
            </div>
            <div className="mb-4.5">
              <label className="block text-[13.5px] text-muted mb-2">Anything specific you'd like to discuss? (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] min-h-[100px]" />
            </div>
            <div className="flex justify-between mt-7">
              <button className="btn-outline" onClick={() => setStep(3)}>Back</button>
              <button className="btn-gold" onClick={confirm}>Confirm booking</button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="s5" {...fade} className="text-center py-10 px-4">
            <div className="w-14 h-14 rounded-full bg-gold-pale text-gold-dark flex items-center justify-center mx-auto mb-5 text-2xl">✓</div>
            <h3 className="text-navy dark:text-ink text-[22px] mb-2.5 font-serif">Appointment requested</h3>
            <p className="text-muted mb-6">{summary}</p>
            <p className="text-xs text-muted italic border-t border-[var(--line)] pt-3.5">
              Your request has been saved to Fund Care. The team can review and confirm it from the admin dashboard.
            </p>
            <Link href="/" className="btn-outline inline-flex mt-5">Return home</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const fade = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: { duration: 0.25 },
};
