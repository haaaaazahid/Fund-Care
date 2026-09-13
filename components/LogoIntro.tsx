'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTRO_MS = 7600;
const COINS = [0, 60, 120, 180, 240, 300];

export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const audioRef = useRef<AudioContext | null>(null);
  const playedRef = useRef(false);

  const closeIntro = () => {
    setVisible(false);
    sessionStorage.setItem('fc-intro-seen', '1');
  };

  useEffect(() => {
    setMounted(true);
    if (reduced || sessionStorage.getItem('fc-intro-seen')) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(closeIntro, INTRO_MS);
    const onFirstInteraction = () => playSoundSequence();
    window.addEventListener('pointerdown', onFirstInteraction, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const getAudio = () => {
    if (typeof window === 'undefined') return null;
    if (!audioRef.current) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioRef.current = new AudioCtx();
      } catch {
        audioRef.current = null;
      }
    }
    return audioRef.current;
  };

  const tone = (
    frequency: number,
    delay: number,
    duration: number,
    volume: number,
    type: OscillatorType = 'sine',
  ) => {
    const audio = getAudio();
    if (!audio || !soundOn) return;
    const start = audio.currentTime + delay;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.06);
  };

  const playSoundSequence = async () => {
    if (playedRef.current || !soundOn) return;
    const audio = getAudio();
    if (!audio) return;
    try {
      if (audio.state === 'suspended') await audio.resume();
    } catch {
      return;
    }
    if (audio.state !== 'running') return;

    playedRef.current = true;
    tone(58, 0, 2.2, 0.008, 'sine');
    [0.55, 0.85, 1.15, 1.45, 1.75, 2.05].forEach((delay, i) => {
      tone(980 + i * 90, delay, 0.11, 0.011, 'triangle');
    });
    tone(520, 2.55, 0.55, 0.011, 'sine');
    tone(690, 3.02, 0.65, 0.013, 'sine');
    tone(880, 3.85, 0.5, 0.011, 'triangle');
    tone(760, 4.45, 0.9, 0.009, 'sine');
  };

  if (!mounted || reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030914]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Fund Care brand introduction"
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[min(85vw,900px)] w-[min(85vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,162,39,.18) 0%, rgba(201,162,39,.07) 28%, transparent 68%)' }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,239,181,.34) 0 1px, transparent 1.5px)', backgroundSize: '64px 64px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.1] }}
              transition={{ duration: 3.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-px w-[120vw] -translate-x-1/2 rotate-[-17deg] bg-gradient-to-r from-transparent via-[#d9b74b]/20 to-transparent blur-[1px]"
              initial={{ opacity: 0, x: '-25%' }}
              animate={{ opacity: [0, 1, 0], x: ['-25%', '25%'] }}
              transition={{ delay: 2.9, duration: 2.4, ease: 'easeInOut' }}
            />
          </div>

          <div className="absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-[41%] h-[min(58vw,470px)] w-[min(58vw,470px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="absolute left-1/2 top-[41%] h-[min(54vw,430px)] w-[min(54vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a227]/25"
              initial={{ opacity: 0, scale: 0.75, rotate: -20 }}
              animate={{ opacity: [0, 1, 0.55], scale: 1, rotate: 340 }}
              transition={{
                opacity: { duration: 1.2, delay: 0.35 },
                scale: { duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              }}
            />

            <motion.div
              className="absolute left-1/2 top-[41%] h-[min(49vw,390px)] w-[min(49vw,390px)] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.72, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 330 }}
              transition={{
                opacity: { duration: 1, delay: 0.7 },
                scale: { duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
              }}
            >
              {COINS.map((angle, index) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 46 * Math.cos(rad);
                const y = 50 + 46 * Math.sin(rad);
                return (
                  <motion.div
                    key={angle}
                    className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f4d976]/70 bg-[radial-gradient(circle_at_35%_30%,#fff1a8_0%,#d7ad32_38%,#9b7417_100%)] shadow-[0_0_18px_rgba(201,162,39,.22)]"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: [0.9, 1, 0.96, 1] }}
                    transition={{
                      opacity: { delay: 0.8 + index * 0.1, duration: 0.35 },
                      scale: { delay: 0.8 + index * 0.1, duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    <span className="absolute inset-[5px] rounded-full border border-[#fff1a8]/45" />
                    <span className="relative z-10 flex h-full w-full items-center justify-center font-serif text-[17px] text-[#17304e]">₹</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-[41%] z-10 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.78, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative h-[clamp(180px,23vw,230px)] w-[clamp(180px,23vw,230px)]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute inset-[-22px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(221,183,68,.25), transparent 67%)' }}
                  animate={{ scale: [0.94, 1.08, 0.96], opacity: [0.45, 0.8, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 rounded-full bg-[#f7efd9] shadow-[0_0_70px_rgba(214,173,56,.2)]" />
                <motion.div
                  className="absolute inset-[-9px] rounded-full border border-[#d8b64a]/60"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: [0, 1, 0.55], scale: [0.92, 1.03, 1] }}
                  transition={{ delay: 1.25, duration: 1.8 }}
                />
                <Image
                  src="/logo.svg"
                  alt="Fund Care"
                  fill
                  priority
                  className="relative z-10 object-contain p-2"
                  sizes="230px"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute left-[15%] right-[15%] top-[41%] h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#f4dc82]/70 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
              transition={{ delay: 3.8, duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>

          <motion.div
            className="absolute left-1/2 top-[72%] z-30 w-[min(90vw,620px)] -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 2.85, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mx-auto mb-4 h-px w-20 bg-gradient-to-r from-transparent via-[#d9b74b] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 3.25, duration: 0.8, ease: 'easeOut' }}
            />
            <p className="font-serif text-[clamp(17px,2.2vw,24px)] italic tracking-[0.08em] text-[#e2c879]">
              Invest today for better tomorrow.
            </p>
          </motion.div>

          <button
            type="button"
            className="absolute bottom-6 right-6 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-[#f3e9c7]/75 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
            onClick={() => {
              setSoundOn((value) => !value);
              if (!soundOn) playSoundSequence();
            }}
            aria-label={soundOn ? 'Mute intro sound' : 'Enable intro sound'}
          >
            {soundOn ? 'Sound on' : 'Sound off'}
          </button>

          <button
            type="button"
            className="absolute bottom-6 left-6 border-b border-white/15 pb-1 text-xs tracking-wide text-white/35 transition hover:text-white/75"
            onClick={closeIntro}
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
