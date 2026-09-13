'use client';

import { useState } from 'react';
import Link from 'next/link';
import { services } from '@/lib/services';
import { submitLead } from '@/lib/api';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  function submit() {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill in name, phone, and email.');
      return;
    }
    submitLead({ name: name.trim(), phone: phone.trim(), email: email.trim(), service, message })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error instanceof Error ? error.message : 'Could not send enquiry. Please try again.'));
  }

  if (submitted) {
    return (
      <div className="card p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gold-pale text-gold-dark flex items-center justify-center mx-auto mb-5 text-2xl">✓</div>
        <h3 className="text-navy dark:text-ink text-xl mb-2.5 font-serif">Enquiry received</h3>
        <p className="text-muted">Your enquiry has been sent securely to Fund Care. The team can review it from the admin dashboard.</p>
        <Link href="/" className="btn-outline inline-flex mt-6">Return home</Link>
      </div>
    );
  }

  return (
    <div className="card p-10">
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
        <label className="block text-[13.5px] text-muted mb-2">Which service are you interested in?</label>
        <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]">
          <option value="">Select a service</option>
          {services.map((s) => <option key={s.slug}>{s.name}</option>)}
          <option>General enquiry</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block text-[13.5px] text-muted mb-2">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] min-h-[100px]" />
      </div>
      <button className="btn-gold" onClick={submit}>Send enquiry</button>
    </div>
  );
}
