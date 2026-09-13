'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const lines = [['Plan', 'today.'], ['Build', 'tomorrow.'], ['Protect', 'what', 'matters.']];
const marqueeItems = ['Investment Planning', 'Insurance Planning', 'Retirement Planning', 'Tax Planning', 'Wealth Management', 'Estate Planning', 'Goal Planning', 'Mutual Fund Planning'];

export default function Hero() {
  let wordIndex = 0;
  return (
    <section className="pt-20 pb-24 relative overflow-hidden">
      <FloatingParticles />
      <div className="wrap grid md:grid-cols-[1.05fr_0.95fr] gap-16 items-center relative">
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.6 }}
            className="text-gold-dark dark:text-gold font-serif italic text-sm mb-5"
          >
            Invest today for better tomorrow.
          </motion.div>

          <h1 className="text-[clamp(36px,5vw,56px)] leading-[1.08] text-navy dark:text-ink mb-6 font-serif">
            {lines.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.map((word, wi) => {
                  const delay = 3.4 + wordIndex * 0.07;
                  wordIndex++;
                  return (
                    <motion.span
                      key={wi}
                      className="inline-block mr-3"
                      initial={{ opacity: 0, y: '100%', rotate: 2 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.0, duration: 0.6 }}
            className="text-lg text-muted max-w-[480px] mb-9"
          >
            Fund Care brings structure and clarity to your financial life — investment planning, protection, and long-term wealth strategy, guided by people who think in decades, not quarters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.15, duration: 0.6 }}
            className="flex gap-4 flex-wrap mb-11"
          >
            <Link href="/book-appointment" className="btn-gold">Book Appointment</Link>
            <Link href="/calculators" className="btn-outline">Explore Financial Tools</Link>
          </motion.div>

          <div className="flex gap-7 flex-wrap text-[13.5px] text-muted border-t border-[var(--line)] pt-5">
            <span className="flex items-center gap-2"><i className="w-[5px] h-[5px] bg-gold rounded-full inline-block" />Personal advisory approach</span>
            <span className="flex items-center gap-2"><i className="w-[5px] h-[5px] bg-gold rounded-full inline-block" />Goal-based planning</span>
            <span className="flex items-center gap-2"><i className="w-[5px] h-[5px] bg-gold rounded-full inline-block" />Transparent process</span>
          </div>

          <div className="border-t border-b border-[var(--line)] overflow-hidden whitespace-nowrap py-4.5 mt-14">
            <div className="inline-flex gap-12 animate-marquee">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="font-serif italic text-[15px] text-muted flex items-center gap-12">
                  {item}<span className="text-gold not-italic">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6, duration: 0.7 }}
          className="bg-navy dark:bg-[var(--surface)] dark:border dark:border-[var(--line)] rounded-sm p-9 relative overflow-hidden text-white shadow-2xl"
        >
          <div className="inline-block text-[10.5px] uppercase tracking-wider text-white/50 border border-white/15 rounded-full px-3 py-1 mb-5">
            Illustrative example
          </div>
          <div className="text-xs text-gold-pale/75 mb-1.5">Portfolio Growth</div>
          <div className="font-serif text-4xl mb-1">₹12,84,600</div>
          <div className="text-gold text-sm mb-6">+8.4% this year</div>
          <div className="h-[150px] mt-2">
            <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="w-full h-full">
              <motion.polyline
                points="0,95 40,88 80,92 120,60 160,68 200,40 240,48 280,20 320,26"
                fill="none" stroke="#C9A227" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 4, ease: 'easeOut' }}
              />
            </svg>
          </div>
          <div className="flex justify-between mt-5 text-xs text-white/55">
            <span>Demo data for illustration only</span>
            <span>SIP · Equity · Debt</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingParticles() {
  // Deterministic values keep server and client markup identical while preserving motion.
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 47 + 13) % 101,
    bottom: -20 - ((i * 17) % 41),
    drift: ((i * 23) % 41) - 20,
    duration: 7 + ((i * 19) % 81) / 10,
    delay: ((i * 29) % 81) / 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-gold opacity-50 animate-floatUp"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}px`,
            ['--drift' as any]: `${p.drift}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
