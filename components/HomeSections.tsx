'use client';

import { useRef, useState, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useInView, animate } from 'framer-motion';
import { useEffect } from 'react';
import { services } from '@/lib/services';

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function ServicesGrid() {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal className="max-w-[600px] mb-14">
          <div className="section-kicker">Services</div>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-tight text-navy dark:text-ink font-serif">
            Financial planning built around your goals.
          </h2>
          <p className="text-muted mt-3.5 text-base max-w-[520px]">
            Six areas where Fund Care advises clients most often — each with its own dedicated planning process. Two more live on the full services page.
          </p>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)]">
        {services.slice(0, 6).map((s, i) => (
          <TiltCard key={s.slug}>
            <div className="font-serif text-xs text-gold-dark dark:text-gold mb-4.5">0{i + 1}</div>
            <h3 className="text-[19px] text-navy dark:text-ink mb-2.5 font-medium">{s.name}</h3>
            <p className="text-sm text-muted mb-4.5">{s.description}</p>
            <Link href={`/services#${s.slug}`} className="text-[13px] text-gold-dark dark:text-gold border-b border-transparent hover:border-gold-dark dark:hover:border-gold pb-0.5">
              Explore service <span className="inline-block ml-1">→</span>
            </Link>
          </TiltCard>
        ))}
      </div>
      <div className="wrap mt-7">
        <Link href="/services" className="text-[13px] text-gold-dark dark:text-gold">View all 8 services →</Link>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--bg)] p-8 hover:bg-gold-pale dark:hover:bg-[#152a4d] transition-colors"
    >
      {children}
    </motion.div>
  );
}

const steps = [
  ['Understand', 'Your goals, income, and obligations'],
  ['Plan', 'A strategy matched to your timeline'],
  ['Invest', 'Deploy capital with discipline'],
  ['Protect', 'Insure against the unexpected'],
  ['Review', 'Adjust as life changes'],
  ['Grow', 'Compound progress over decades'],
];

export function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      if (i >= steps.length) { clearInterval(timer); return; }
      setActive(i);
    }, 500);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section className="bg-gold-pale dark:bg-[var(--surface)] dark:border-y dark:border-[var(--line)]" ref={ref}>
      <div className="wrap">
        <Reveal className="max-w-[600px] mb-14">
          <div className="section-kicker">Our approach</div>
          <h2 className="text-[clamp(28px,3.4vw,38px)] text-navy dark:text-ink font-serif">Your financial journey</h2>
          <p className="text-muted mt-3.5">The same six stages guide every plan Fund Care builds, in order.</p>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-between relative mt-5 pt-8 gap-7 md:gap-0">
          <div className="hidden md:block absolute top-[9px] left-0 right-0 h-px bg-[var(--line)]" />
          {steps.map(([title, desc], i) => (
            <div key={title} className={`flex-1 pr-3 relative transition-transform ${active === i ? '-translate-y-1' : ''}`}>
              <div className="relative w-[11px] h-[11px] rounded-full border-2 mb-4" style={{
                background: active === i ? 'var(--gold)' : 'var(--surface, #fff)',
                borderColor: active === i ? 'var(--gold)' : 'var(--muted)',
                boxShadow: active === i ? '0 0 0 5px rgba(201,162,39,.2)' : 'none',
              }}>
                {active === i && (
                  <motion.span
                    className="absolute -inset-1.5 rounded-full border border-gold"
                    animate={{ scale: [0.6, 1.8], opacity: [0.9, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </div>
              <h4 className="text-[15.5px] text-navy dark:text-ink mb-1.5 font-semibold font-sans">{title}</h4>
              <p className="text-[13px] text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: 12, suffix: '+', label: 'Years of Experience' },
  { value: 480, suffix: '+', label: 'Families Guided' },
  { value: 900, suffix: '+', label: 'Plans Created' },
  { value: 35, suffix: '+', label: 'Client Families Served (demo)' },
];

export function StatsCounter() {
  return (
    <section className="bg-navy dark:bg-[var(--surface)] dark:border-y dark:border-[var(--line)] text-white">
      <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="border-l border-white/15 pl-5">
      <div className="font-serif text-[34px] text-gold">{display}{suffix}</div>
      <div className="text-[13.5px] text-white/65 mt-1.5">{label}</div>
      <div className="text-[11px] text-white/40 mt-1 italic">Editable in CMS</div>
    </div>
  );
}
