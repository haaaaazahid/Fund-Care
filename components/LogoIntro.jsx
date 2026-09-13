'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
const INTRO_MS = 7200;
const COIN_ANGLES = [12, 72, 132, 192, 252, 312];
export default function LogoIntro() {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const reduced = useReducedMotion();
    const audioRef = useRef(null);
    const playedRef = useRef(false);
    const closeIntro = () => {
        setVisible(false);
        try {
            sessionStorage.setItem('fc-intro-seen', '1');
        }
        catch {
            // Ignore storage restrictions.
        }
    };
    useEffect(() => {
        setMounted(true);
        if (reduced)
            return;
        try {
            if (sessionStorage.getItem('fc-intro-seen') === '1')
                return;
        }
        catch {
            // If storage is unavailable, still allow the intro to run once per mount.
        }
        setVisible(true);
    }, [reduced]);
    useEffect(() => {
        if (!mounted || !visible || reduced)
            return;
        const timer = window.setTimeout(closeIntro, INTRO_MS);
        const onKeyDown = (event) => {
            if (event.key === 'Escape')
                closeIntro();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [mounted, visible, reduced]);
    const getAudio = () => {
        if (typeof window === 'undefined')
            return null;
        if (!audioRef.current) {
            try {
                const AudioCtx = window.AudioContext ||
                    window.webkitAudioContext;
                if (AudioCtx)
                    audioRef.current = new AudioCtx();
            }
            catch {
                audioRef.current = null;
            }
        }
        return audioRef.current;
    };
    const tone = (frequency, delay, duration, volume, type = 'sine') => {
        const audio = getAudio();
        if (!audio || !soundOn)
            return;
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
    const coin = (delay) => {
        tone(1320, delay, 0.14, 0.018, 'triangle');
        tone(1980, delay + 0.025, 0.10, 0.009, 'sine');
    };
    const playSoundSequence = async () => {
        if (playedRef.current || !soundOn)
            return;
        const audio = getAudio();
        if (!audio)
            return;
        try {
            if (audio.state === 'suspended')
                await audio.resume();
        }
        catch {
            return;
        }
        if (audio.state !== 'running')
            return;
        playedRef.current = true;
        tone(72, 0, 1.7, 0.012, 'sine');
        [0.25, 0.43, 0.61, 0.79, 0.97, 1.15].forEach(coin);
        tone(620, 1.48, 0.38, 0.013, 'sine');
        tone(780, 2.00, 0.52, 0.014, 'sine');
        [2.18, 2.40, 2.62, 2.84].forEach((t) => coin(t));
        tone(860, 3.15, 0.70, 0.014, 'sine');
        tone(540, 3.82, 0.42, 0.011, 'triangle');
        tone(960, 4.34, 0.32, 0.014, 'triangle');
        tone(760, 4.82, 0.85, 0.016, 'sine');
        tone(1100, 5.65, 1.0, 0.010, 'sine');
    };
    useEffect(() => {
        if (!mounted || !visible || reduced)
            return;
        const onFirstInteraction = (event) => {
            const target = event.target;
            if (target?.closest('[data-intro-control]'))
                return;
            void playSoundSequence();
            window.removeEventListener('pointerdown', onFirstInteraction);
        };
        window.addEventListener('pointerdown', onFirstInteraction);
        return () => window.removeEventListener('pointerdown', onFirstInteraction);
    }, [mounted, visible, reduced, soundOn]);
    if (!mounted || reduced)
        return null;
    return (<AnimatePresence>
      {visible && (<motion.div className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-[#06101f] text-white" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }} role="dialog" aria-modal="true" aria-label="Fund Care brand introduction">
          {/* Background atmosphere — decorative only, never participates in layout. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <motion.div className="absolute left-1/2 top-1/2 h-[min(900px,100vw,100vh)] w-[min(900px,100vw,100vh)] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{
                background: 'radial-gradient(circle, rgba(201,162,39,.16) 0%, rgba(201,162,39,.055) 27%, transparent 68%)',
            }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1.05 }} transition={{ duration: 2.2, ease: 'easeOut' }}/>
            <motion.div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 50% 48%, rgba(255,224,142,.24) 0 1px, transparent 1.5px)',
                backgroundSize: '46px 46px',
            }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.35, 0.18] }} transition={{ duration: 2.8 }}/>
            <div className="absolute inset-x-0 top-[13%] mx-auto h-px w-[min(720px,78vw)] bg-gradient-to-r from-transparent via-[#d9b74b]/20 to-transparent"/>
          </div>

          {/* One responsive stage. All artwork lives inside this box, so nothing can collide with controls. */}
          <div className="absolute left-1/2 top-[43%] h-[min(66vh,66dvh,560px)] w-[min(82vw,66vh,66dvh,560px)] -translate-x-1/2 -translate-y-1/2 sm:top-[42%]">
            <svg viewBox="0 0 500 500" className="h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <radialGradient id="fc-disc" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#fffaf0"/>
                  <stop offset="78%" stopColor="#f7efd9"/>
                  <stop offset="100%" stopColor="#e8d8b2"/>
                </radialGradient>
                <linearGradient id="fc-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff0ae"/>
                  <stop offset="32%" stopColor="#e0b83e"/>
                  <stop offset="65%" stopColor="#b98816"/>
                  <stop offset="100%" stopColor="#f5d66d"/>
                </linearGradient>
                <filter id="fc-glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="7" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <path id="fc-motto" d="M 118 356 A 145 145 0 0 0 382 356" fill="none"/>
              </defs>

              {/* Coins enter first. */}
              <motion.g initial={{ opacity: 0, scale: 0.82, rotate: -8 }} animate={{ opacity: [0, 1, 1, 0.18], scale: [0.82, 1, 1.02, 1], rotate: [-8, 0, 0, 4] }} transition={{ duration: 2.15, times: [0, 0.18, 0.72, 1], ease: 'easeInOut' }}>
                <motion.g style={{ transformOrigin: '250px 250px' }} animate={{ rotate: 360 }} transition={{ duration: 2.7, ease: 'linear' }}>
                  {COIN_ANGLES.map((angle, index) => {
                const r = (angle * Math.PI) / 180;
                const radius = 188;
                const cx = 250 + radius * Math.cos(r);
                const cy = 250 + radius * Math.sin(r);
                return (<motion.g key={angle} initial={{ opacity: 0, scale: 0.25 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.09, duration: 0.38 }}>
                        <ellipse cx={cx + 3} cy={cy + 6} rx="25" ry="8" fill="rgba(0,0,0,.25)"/>
                        <ellipse cx={cx} cy={cy} rx="25" ry="17" fill="url(#fc-gold)" stroke="#8c6e1a" strokeWidth="2" transform={`rotate(${angle + 18} ${cx} ${cy})`}/>
                        <ellipse cx={cx} cy={cy - 2} rx="20" ry="13" fill="none" stroke="#fff0ae" strokeOpacity=".65" strokeWidth="1.2" transform={`rotate(${angle + 18} ${cx} ${cy})`}/>
                        <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#17304e">
                          ₹
                        </text>
                      </motion.g>);
            })}
                </motion.g>
              </motion.g>

              <motion.circle cx="250" cy="250" r="139" fill="url(#fc-disc)" initial={{ opacity: 0, scale: 0.72 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}/>

              {/* Rupee mark. */}
              <motion.g fill="none" stroke="#102846" strokeWidth="8" strokeLinecap="round">
                <motion.line x1="178" y1="173" x2="229" y2="173" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.35, duration: 0.28 }}/>
                <motion.line x1="178" y1="196" x2="229" y2="196" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.47, duration: 0.28 }}/>
                <motion.path d="M 187 173 L 187 246 C 187 218 220 196 229 219 C 234 231 220 242 205 242 L 234 270" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.59, duration: 0.55, ease: 'easeOut' }}/>
              </motion.g>

              {/* Investment stack. */}
              <motion.g>
                {[0, 1, 2, 3].map((i) => {
                const y = 270 - i * 19;
                return (<motion.g key={i} initial={{ opacity: 0, y: -18, scale: 0.82 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 2.18 + i * 0.2, duration: 0.48, type: 'spring', stiffness: 260, damping: 18 }}>
                      <ellipse cx="323" cy={y} rx="27" ry="9" fill="url(#fc-gold)" stroke="#8c6e1a" strokeWidth="2"/>
                      <rect x="296" y={y - 19} width="54" height="19" fill="url(#fc-gold)" stroke="#8c6e1a" strokeWidth="2"/>
                      <ellipse cx="323" cy={y - 19} rx="27" ry="9" fill="url(#fc-gold)" stroke="#8c6e1a" strokeWidth="2"/>
                    </motion.g>);
            })}
                <motion.ellipse cx="323" cy="194" rx="27" ry="9" fill="#f4cd59" stroke="#8c6e1a" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.98, duration: 0.35 }}/>
              </motion.g>

              {/* Growth arrow. */}
              <motion.path d="M 229 266 L 258 228 L 282 246 L 333 181" fill="none" stroke="#102846" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.82, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}/>
              <motion.path d="M 309 181 L 333 181 L 333 206" fill="none" stroke="#102846" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3.26, duration: 0.32 }}/>

              {/* Protective hand. */}
              <motion.path d="M 140 296 C 157 284 190 282 216 290 C 247 299 286 299 322 284 C 340 277 355 282 356 292 C 346 314 310 331 267 334 C 225 337 183 329 151 311 C 141 305 134 300 140 296 Z" fill="none" stroke="#102846" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 3.58, duration: 0.9, ease: 'easeInOut' }}/>
              <motion.path d="M 159 300 C 178 296 201 297 221 304" fill="none" stroke="#102846" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3.94, duration: 0.45 }}/>

              {/* Final circular mark + typography. This is the only FUND CARE lockup. */}
              <motion.circle cx="250" cy="250" r="139" fill="none" stroke="#c9a227" strokeWidth="3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 4.02, duration: 0.92, ease: [0.65, 0, 0.35, 1] }}/>
              <motion.text x="250" y="124" textAnchor="middle" fontFamily="'Newsreader', Georgia, serif" fontSize="28" letterSpacing="2.2" fontWeight="600" fill="#102846" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.55, duration: 0.55, ease: 'easeOut' }}>
                FUND CARE
              </motion.text>
              <motion.text fontFamily="'Newsreader', Georgia, serif" fontStyle="italic" fontSize="14.5" letterSpacing="0.35" fill="#102846" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.96, duration: 0.75 }}>
                <textPath href="#fc-motto" startOffset="50%" textAnchor="middle">
                  Invest today for better tomorrow
                </textPath>
              </motion.text>
              <motion.circle cx="250" cy="250" r="139" fill="none" stroke="#f3d875" strokeWidth="8" filter="url(#fc-glow)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.42, 0] }} transition={{ delay: 5.55, duration: 1.1, times: [0, 0.42, 1] }}/>
            </svg>
          </div>

          {/* Fixed controls occupy their own safe area; they never share the logo stage. */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-5 pb-[max(20px,env(safe-area-inset-bottom))] sm:px-7">
            <button type="button" data-intro-control className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs tracking-wide text-white/55 backdrop-blur-md transition hover:bg-white/10 hover:text-white/85" onClick={closeIntro}>
              Skip intro
            </button>

            <button type="button" data-intro-control className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-[#f3e9c7]/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white" onClick={() => {
                if (soundOn) {
                    setSoundOn(false);
                    return;
                }
                setSoundOn(true);
                void playSoundSequence();
            }} aria-label={soundOn ? 'Mute intro sound' : 'Enable intro sound'}>
              {soundOn ? 'Sound on' : 'Sound off'}
            </button>
          </div>
        </motion.div>)}
    </AnimatePresence>);
}
