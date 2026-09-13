'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTRO_MS = 7200;

const COINS = [
  { x: 50, y: 4, delay: 0.10 },
  { x: 89, y: 28, delay: 0.20 },
  { x: 88, y: 72, delay: 0.30 },
  { x: 50, y: 96, delay: 0.40 },
  { x: 12, y: 72, delay: 0.50 },
  { x: 11, y: 28, delay: 0.60 },
];

export default function LogoIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const reduced = useReducedMotion();
  const audioRef = useRef<AudioContext | null>(null);
  const playedRef = useRef(false);

  const closeIntro = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('fc-intro-seen', '1');
    } catch {}
  };

  useEffect(() => {
    setMounted(true);
    if (reduced) return;

    try {
      if (sessionStorage.getItem('fc-intro-seen') === '1') return;
    } catch {}

    setVisible(true);
  }, [reduced]);

  useEffect(() => {
    if (!mounted || !visible) return;

    const timer = window.setTimeout(closeIntro, INTRO_MS);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeIntro();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, visible]);

  const getAudio = () => {
    if (typeof window === 'undefined') return null;

    if (!audioRef.current) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext?: typeof AudioContext;
            }
          ).webkitAudioContext;

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

    tone(72, 0, 1.7, 0.012);
    [0.25, 0.43, 0.61, 0.79, 0.97, 1.15].forEach((delay, index) => {
      tone(1100 + index * 110, delay, 0.12, 0.010, 'triangle');
    });
    tone(620, 1.55, 0.4, 0.012);
    tone(780, 2.05, 0.5, 0.013);
    tone(880, 2.75, 0.65, 0.012, 'triangle');
    tone(720, 3.55, 0.8, 0.010);
    tone(980, 4.55, 0.9, 0.010);
  };

  useEffect(() => {
    if (!mounted || !visible || reduced) return;

    const onFirstInteraction = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-intro-control]')) return;

      void playSoundSequence();
      window.removeEventListener('pointerdown', onFirstInteraction);
    };

    window.addEventListener('pointerdown', onFirstInteraction);

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
  }, [mounted, visible, reduced, soundOn]);

  if (!mounted || reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-[#06101f] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Fund Care brand introduction"
        >
          {/* Background: decorative only, never part of layout. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 42%, rgba(255,224,142,.22) 0 1px, transparent 1.5px)',
                backgroundSize: '52px 52px',
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 aspect-square w-[min(100vw,100dvh)] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(201,162,39,.17) 0%, rgba(201,162,39,.055) 32%, transparent 68%)',
              }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
            />
          </div>

          {/* Header-safe area. Controls never share the logo stage. */}
          <div className="absolute inset-x-0 top-0 z-30 flex justify-end px-4 pt-[max(16px,env(safe-area-inset-top))] sm:px-7">
            <button
              type="button"
              data-intro-control
              onClick={() => {
                if (soundOn) {
                  setSoundOn(false);
                } else {
                  setSoundOn(true);
                  void playSoundSequence();
                }
              }}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-[#f3e9c7]/80 shadow-lg backdrop-blur-md transition hover:bg-white/10 hover:text-white"
              aria-label={soundOn ? 'Mute intro sound' : 'Enable intro sound'}
            >
              {soundOn ? 'Sound on' : 'Sound off'}
            </button>
          </div>

          {/* Main content uses normal flex layout. This is the key anti-overlap structure. */}
          <main className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
            {/* Fixed aspect-ratio stage: logo + rings + coins stay together and centered. */}
            <div className="relative w-[min(76vw,54dvh,520px)] max-w-[520px] shrink-0 aspect-square">
              {/* Outer rings */}
              <motion.div
                className="absolute inset-[2%] rounded-full border border-[#d9b74b]/20"
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute inset-[9%] rounded-full border border-[#d9b74b]/35"
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 340 }}
                transition={{
                  opacity: { duration: 1, delay: 0.35 },
                  scale: { duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                }}
              />
              <motion.div
                className="absolute inset-[17%] rounded-full border border-white/[0.07]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.45 }}
              />

              {/* Coins: absolute to the stage, never the viewport. */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {COINS.map((coin, index) => (
                  <motion.div
                    key={index}
                    className="absolute left-1/2 top-1/2 h-[clamp(24px,4.8vw,42px)] w-[clamp(24px,4.8vw,42px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f7dd7d]/75 bg-[radial-gradient(circle_at_34%_28%,#fff3b4_0%,#e0b63b_38%,#986f13_100%)] shadow-[0_0_22px_rgba(224,182,59,.28)]"
                    style={{
                      left: `${coin.x}%`,
                      top: `${coin.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{
                      opacity: [0, 1, 1],
                      scale: [0.2, 1.08, 1],
                    }}
                    transition={{
                      delay: coin.delay,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="absolute inset-[18%] rounded-full border border-[#fff1a8]/50" />
                    <span className="relative flex h-full w-full items-center justify-center font-serif text-[11px] text-[#17304e] sm:text-sm">
                      ₹
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Central logo: one focal point. */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-10 w-[clamp(155px,30vw,235px)] -translate-x-1/2 -translate-y-1/2 aspect-square"
                initial={{ opacity: 0, scale: 0.78, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="absolute -inset-5 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(221,183,68,.27), transparent 68%)',
                  }}
                  animate={{
                    scale: [0.94, 1.08, 0.96],
                    opacity: [0.45, 0.78, 0.48],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 rounded-full bg-[#f7efd9] shadow-[0_0_70px_rgba(214,173,56,.2)]" />
                <motion.div
                  className="absolute -inset-2 rounded-full border border-[#d8b64a]/65"
                  animate={{ opacity: [0.25, 1, 0.45], scale: [0.97, 1.035, 1] }}
                  transition={{ delay: 1.25, duration: 1.8 }}
                />
                <Image
                  src="/logo.svg"
                  alt="Fund Care"
                  fill
                  priority
                  className="relative z-10 object-contain p-2"
                  sizes="(max-width: 640px) 38vw, 235px"
                />
              </motion.div>
            </div>

            {/* Motto is outside the stage with its own reserved row. */}
            <motion.div
              className="mt-[clamp(14px,2.5vh,28px)] w-full max-w-[720px] shrink-0 px-2 text-center"
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 2.65, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto mb-2.5 h-px w-14 bg-gradient-to-r from-transparent via-[#d9b74b] to-transparent sm:mb-3 sm:w-16" />
              <p className="font-serif text-[clamp(14px,2.1vw,22px)] italic leading-relaxed tracking-[0.07em] text-[#e2c879]">
                Invest today for better tomorrow.
              </p>
            </motion.div>
          </main>

          {/* Footer-safe area. Skip never competes with the main stage. */}
          <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-7">
            <button
              type="button"
              data-intro-control
              onClick={closeIntro}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs tracking-wide text-white/55 shadow-lg backdrop-blur-md transition hover:bg-white/10 hover:text-white/90"
            >
              Skip intro
            </button>

            <div className="pointer-events-none hidden text-[10px] uppercase tracking-[0.25em] text-white/20 sm:block">
              Fund Care
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
