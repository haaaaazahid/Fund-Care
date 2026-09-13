'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/services';
import { useTheme } from '@/lib/theme-provider';

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [svcAccordion, setSvcAccordion] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-[100] backdrop-blur-md border-b border-[var(--line)]" style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}>
        <nav className="wrap flex items-center justify-between py-4 relative">
          <Link href="/" className="flex items-center gap-2.5 font-serif text-xl font-semibold text-navy dark:text-ink">
            <Image src="/logo.svg" alt="Fund Care" width={38} height={38} />
            Fund Care
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            <li><Link href="/" className="nav-link text-sm">Home</Link></li>
            <li><Link href="/about" className="nav-link text-sm">About</Link></li>
            <li
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                className="nav-link text-sm flex items-center gap-1"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen((v) => !v)}
              >
                Services <span className={`text-[10px] transition-transform ${megaOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+1px)] left-1/2 -translate-x-1/2 w-[min(760px,86vw)] bg-[var(--surface)] border border-[var(--line)] shadow-2xl p-2 grid grid-cols-2 gap-0.5"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services#${s.slug}`}
                        className="group block p-4 rounded-sm hover:bg-gold-pale"
                      >
                        <span className="flex items-center justify-between text-sm text-navy dark:text-ink font-medium">
                          {s.name}
                          <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-gold-dark dark:text-gold">→</span>
                        </span>
                        <span className="block text-xs text-muted mt-1">{s.description}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li><Link href="/calculators" className="nav-link text-sm">Calculators</Link></li>
            <li><Link href="/insights" className="nav-link text-sm">Insights</Link></li>
            <li><Link href="/contact" className="nav-link text-sm">Contact</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-sm"
            >
              {theme === 'dark' ? '☀' : '◐'}
            </button>
            <Link href="/book-appointment" className="hidden md:inline-flex btn-gold">
              Book Appointment
            </Link>
            <button className="md:hidden text-2xl" aria-label="Open menu" onClick={() => setMobileOpen(true)}>☰</button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[var(--bg)] overflow-y-auto"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-[var(--line)]">
              <Link href="/" className="flex items-center gap-2 font-serif text-lg" onClick={() => setMobileOpen(false)}>
                <Image src="/logo.svg" alt="Fund Care" width={30} height={30} /> Fund Care
              </Link>
              <button className="text-2xl" aria-label="Close menu" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            <div className="px-6 pb-10">
              <Link href="/" className="mobile-link" onClick={() => setMobileOpen(false)}>Home</Link>
              <button
                className="mobile-link w-full text-left flex justify-between items-center"
                aria-expanded={svcAccordion}
                onClick={() => setSvcAccordion((v) => !v)}
              >
                Services <span>▾</span>
              </button>
              <div className={`overflow-hidden transition-[max-height] duration-300 ${svcAccordion ? 'max-h-[600px]' : 'max-h-0'}`}>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services#${s.slug}`}
                    className="block pl-4 py-2.5 text-sm text-muted font-sans"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <Link href="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/calculators" className="mobile-link" onClick={() => setMobileOpen(false)}>Calculators</Link>
              <Link href="/insights" className="mobile-link" onClick={() => setMobileOpen(false)}>Insights</Link>
              <Link href="/contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Contact</Link>
              <Link href="/book-appointment" className="btn-gold w-full justify-center mt-5" onClick={() => setMobileOpen(false)}>
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
