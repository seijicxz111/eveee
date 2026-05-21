'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue, useSpring, useTransform,
  AnimatePresence,
  useScroll,
} from 'framer-motion';
import Image from 'next/image';

const FIRST_NAME  = 'CJ Steeve';
const LAST_NAME   = 'Cadenas';

const ROLES = [
  'Web Developer',
  'UI Designer',
  'Game Dev',
  'Game Designer',
];

// Floating deco shapes
const DECOS = [
  { icon: 'fas fa-star',     color: '#9CD5FF', top: '12%',   left: '6%',    size: '2rem',   delay: 0   },
  { icon: 'fas fa-heart',    color: '#c4d8ee', top: '20%',   right: '8%',   size: '1.5rem', delay: 0.8 },
  { icon: 'fas fa-seedling', color: '#7AAACE', bottom: '22%',left: '4%',    size: '1.8rem', delay: 1.4 },
  { icon: 'fas fa-music',    color: '#b0c8d8', bottom: '32%',right: '5%',   size: '1.6rem', delay: 0.4 },
  { icon: 'fas fa-cloud',    color: '#9CD5FF', top: '55%',   left: '10%',   size: '1.3rem', delay: 2   },
  { icon: 'fas fa-paw',      color: '#c4d8ee', top: '38%',   left: '18%',   size: '1.1rem', delay: 1.1 },
  { icon: 'fas fa-star',     color: '#b0c8d8', top: '65%',   right: '12%',  size: '0.9rem', delay: 1.7 },
  { icon: 'fas fa-circle',   color: 'rgba(156,213,255,0.4)', top: '82%', left: '30%', size: '0.7rem', delay: 0.6 },
];

function FloatingDeco({ icon, color, top, left, right, bottom, size, delay }) {
  return (
    <motion.i
      className={`${icon} absolute select-none pointer-events-none`}
      style={{ color, fontSize: size, top, left, right, bottom }}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{
        opacity: [0, 0.7, 1, 0.7],
        y: [0, -18, 0, -8, 0],
        rotate: [0, 12, -8, 5, 0],
        scale: [0, 1, 1.15, 1],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  );
}

// Magnetic cursor-tracking profile image
function MagneticProfile({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 16 });
  const springY = useSpring(y, { stiffness: 100, damping: 16 });
  const rotateX = useTransform(springY, [-30, 30], [6, -6]);
  const rotateY = useTransform(springX, [-30, 30], [-6, 6]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Staggered letter animation for name
function AnimatedName({ text, className, delay = 0, gradient = false }) {
  return (
    <span className={className} aria-label={text} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.05,
            type: 'spring',
            stiffness: 260,
            damping: 22,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Hand-drawn SVG blob shape for the profile frame
function HandDrawnProfileFrame({ size = 280 }) {
  // A wobbly, hand-sketched circle path using SVG
  // The path traces a rough circle with slight irregularities to look drawn
  const s = size;
  const c = s / 2;
  const r = c - 6;
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
      fill="none"
    >
      <defs>
        <clipPath id="sketchy-clip">
          <path d={`
            M ${c}, ${c - r + 4}
            C ${c + r*0.35}, ${c - r - 2}, ${c + r + 3}, ${c - r*0.4}, ${c + r - 2}, ${c + 2}
            C ${c + r + 4}, ${c + r*0.45}, ${c + r*0.3}, ${c + r + 3}, ${c - 2}, ${c + r - 3}
            C ${c - r*0.4}, ${c + r + 5}, ${c - r - 3}, ${c + r*0.35}, ${c - r + 3}, ${c - 1}
            C ${c - r - 2}, ${c - r*0.4}, ${c - r*0.3}, ${c - r + 1}, ${c}, ${c - r + 4}
            Z
          `} />
        </clipPath>
      </defs>
      {/* Outer sketchy stroke - slightly offset, double line feel */}
      <path
        d={`
          M ${c}, ${c - r + 4}
          C ${c + r*0.35}, ${c - r - 2}, ${c + r + 3}, ${c - r*0.4}, ${c + r - 2}, ${c + 2}
          C ${c + r + 4}, ${c + r*0.45}, ${c + r*0.3}, ${c + r + 3}, ${c - 2}, ${c + r - 3}
          C ${c - r*0.4}, ${c + r + 5}, ${c - r - 3}, ${c + r*0.35}, ${c - r + 3}, ${c - 1}
          C ${c - r - 2}, ${c - r*0.4}, ${c - r*0.3}, ${c - r + 1}, ${c}, ${c - r + 4}
          Z
        `}
        stroke="rgba(122,170,206,0.85)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ filter: 'url(#sketchy-filter)' }}
      />
      {/* Inner slightly offset stroke for double-line hand-drawn feel */}
      <path
        d={`
          M ${c + 1}, ${c - r + 7}
          C ${c + r*0.33}, ${c - r + 1}, ${c + r}, ${c - r*0.38}, ${c + r - 5}, ${c + 3}
          C ${c + r + 1}, ${c + r*0.42}, ${c + r*0.28}, ${c + r}, ${c - 3}, ${c + r - 6}
          C ${c - r*0.38}, ${c + r + 2}, ${c - r}, ${c + r*0.3}, ${c - r + 6}, ${c - 2}
          C ${c - r + 1}, ${c - r*0.38}, ${c - r*0.28}, ${c - r + 3}, ${c + 1}, ${c - r + 7}
          Z
        `}
        stroke="rgba(156,213,255,0.5)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing,    setTyping]    = useState(true);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 78);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { type: 'spring', stiffness: 240, damping: 22 } },
  };

  const SKILL_BADGES = [
    { label: 'React',   icon: 'fab fa-react',  color: '#61DBFB', x: '-left-10', y: 'top-8',     d: 0   },
    { label: 'Next.js', icon: 'fas fa-code',   color: '#355872', x: '-right-10',y: 'top-16',    d: 0.5 },
    { label: 'Figma',   icon: 'fab fa-figma',  color: '#b0c8d8', x: '-left-6',  y: 'bottom-16', d: 1   },
  ];

  const PFP_SIZE = 280;

  return (
    <motion.section
      id="about"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{ y: heroY }}
    >
      {/* Floating decorations */}
      {DECOS.map((d, i) => <FloatingDeco key={i} {...d} />)}

      {/* Section-level soft glow behind content */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(156,213,255,0.12) 0%, transparent 70%)',
          opacity: heroOpacity,
        }}
      />

      <div className="max-w-6xl mx-auto px-5 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Text side ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 md:order-1">

            {/* Name with letter-by-letter reveal */}
            <motion.h1
              variants={item}
              className="font-display font-800 text-5xl md:text-6xl leading-none mb-4"
              style={{ letterSpacing: '-0.02em', perspectiveOrigin: 'left', perspective: 600 }}
            >
              <AnimatedName
                text="CJ Steeve Cadenas"
                className="block"
                style={{ color: '#355872' }}
                delay={0.4}
              />
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={item} className="flex items-center gap-2 mb-6 h-9">
              <motion.span
                style={{ color: '#7AAACE' }}
                className="font-display font-700 text-xl"
                animate={{ rotate: [0, 14, -8, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >✦</motion.span>
              <motion.span
                className="font-display font-700 text-2xl"
                style={{ color: '#355872' }}
                layout
              >
                {displayed}
                <span className="typed-cursor">|</span>
              </motion.span>
            </motion.div>

            <motion.p variants={item} className="font-body text-base leading-relaxed max-w-md mb-8" style={{ color: '#355872', opacity: 0.7 }}>
              Web developer &amp; UI designer, passionate about crafting beautiful, accessible, and delightful digital experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
              <motion.a
                href="#contact"
                className="btn-chiikawa btn-chiikawa-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.92 }}
              >
                <motion.i
                  className="fas fa-paper-plane text-xs"
                  animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Say Hello
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-chiikawa btn-chiikawa-secondary"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.92 }}
              >
                <i className="fas fa-folder-open text-xs" /> My Projects
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { icon: 'fab fa-github',     href: 'https://github.com/seijicxz',          label: 'GitHub'   },
                { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/violeeee.07', label: 'Facebook' },
                { icon: 'fab fa-linkedin',   href: '#',                                     label: 'LinkedIn' },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 sketchy-circle flex items-center justify-center bg-white/80 transition-all duration-200"
                  style={{ color: 'rgba(53,88,114,0.6)' }}
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4 + i * 0.12, type: 'spring', stiffness: 340, damping: 18 }}
                  whileHover={{ y: -6, scale: 1.18, rotate: 8, color: '#355872' }}
                  whileTap={{ scale: 0.88 }}
                >
                  <i className={s.icon} />
                </motion.a>
              ))}
              <motion.div
                className="h-6 w-px mx-1"
                style={{ background: 'rgba(156,213,255,0.4)' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.8 }}
              />
              <motion.span
                className="text-xs font-body font-700"
                style={{ color: 'rgba(53,88,114,0.45)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9 }}
              >
                seijicxz
              </motion.span>
            </motion.div>
          </motion.div>

          {/* ── Profile / Mascot side ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 14 }}
            className="order-1 md:order-2 flex items-center justify-center"
          >
            <MagneticProfile>
              <div className="relative" style={{ width: PFP_SIZE, height: PFP_SIZE }}>

                {/* Hand-drawn border frame (replaces rings) */}
                <HandDrawnProfileFrame size={PFP_SIZE} />

                {/* Profile photo — clipped to the same sketchy shape */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `path('M ${PFP_SIZE/2}, ${PFP_SIZE/2 - PFP_SIZE/2 + 10} C ${PFP_SIZE/2 + PFP_SIZE*0.175}, ${PFP_SIZE/2 - PFP_SIZE/2 - 4}, ${PFP_SIZE/2 + PFP_SIZE/2 + 5}, ${PFP_SIZE/2 - PFP_SIZE*0.2}, ${PFP_SIZE/2 + PFP_SIZE/2 - 6}, ${PFP_SIZE/2 + 6} C ${PFP_SIZE/2 + PFP_SIZE/2 + 7}, ${PFP_SIZE/2 + PFP_SIZE*0.225}, ${PFP_SIZE/2 + PFP_SIZE*0.15}, ${PFP_SIZE/2 + PFP_SIZE/2 + 5}, ${PFP_SIZE/2 - 4}, ${PFP_SIZE/2 + PFP_SIZE/2 - 7} C ${PFP_SIZE/2 - PFP_SIZE*0.2}, ${PFP_SIZE/2 + PFP_SIZE/2 + 7}, ${PFP_SIZE/2 - PFP_SIZE/2 - 5}, ${PFP_SIZE/2 + PFP_SIZE*0.175}, ${PFP_SIZE/2 - PFP_SIZE/2 + 7}, ${PFP_SIZE/2 - 3} C ${PFP_SIZE/2 - PFP_SIZE/2 - 4}, ${PFP_SIZE/2 - PFP_SIZE*0.2}, ${PFP_SIZE/2 - PFP_SIZE*0.15}, ${PFP_SIZE/2 - PFP_SIZE/2 + 5}, ${PFP_SIZE/2}, ${PFP_SIZE/2 - PFP_SIZE/2 + 10} Z')`,
                    background: '#F7F8F0',
                  }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.04 }}
                >
                  <Image src="/pfp.png" alt="CJ Steeve Cadenas" fill className="object-cover" />

                  {/* Shimmer overlay */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 60%)' }}
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                  />
                </motion.div>

                {/* Mascot badge */}
                <motion.div
                  className="absolute -bottom-5 -right-5 bg-white/90 sketchy-badge p-2 shadow-lg"
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -6, 0] }}
                  transition={{
                    opacity: { delay: 0.8 },
                    scale:   { delay: 0.8, type: 'spring', stiffness: 320 },
                    rotate:  { delay: 0.8, type: 'spring', stiffness: 320 },
                    y:       { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                  }}
                  whileHover={{ scale: 1.22, rotate: 18 }}
                >
                  <div className="relative w-14 h-14">
                    <Image src="/icon1.png" alt="mascot" fill className="object-contain" />
                  </div>
                </motion.div>

                {/* Floating skill badges */}
                {SKILL_BADGES.map((b, i) => (
                  <motion.div
                    key={b.label}
                    className={`absolute ${b.x} ${b.y} bg-white/90 sketchy-pill px-3 py-1.5 flex items-center gap-2 shadow-lg`}
                    initial={{ opacity: 0, scale: 0, x: i % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: [0, -8, 0] }}
                    transition={{
                      opacity: { delay: 1 + i * 0.2, duration: 0.4 },
                      scale:   { delay: 1 + i * 0.2, type: 'spring', stiffness: 300 },
                      x:       { delay: 1 + i * 0.2, type: 'spring', stiffness: 300 },
                      y:       { duration: 3.5 + b.d, repeat: Infinity, ease: 'easeInOut', delay: b.d + 1 },
                    }}
                    whileHover={{ scale: 1.14, y: -6, boxShadow: '0 10px 30px rgba(53,88,114,0.2)' }}
                  >
                    <motion.i
                      className={`${b.icon} text-xs`}
                      style={{ color: b.color }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="text-xs font-body font-800" style={{ color: '#355872' }}>{b.label}</span>
                  </motion.div>
                ))}
              </div>
            </MagneticProfile>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'rgba(53,88,114,0.4)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2.5, duration: 0.6 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2.5 },
          }}
        >
          <span className="text-xs font-body font-700 tracking-widest">scroll</span>
          <motion.i
            className="fas fa-chevron-down text-xs"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <motion.path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="rgba(156,213,255,0.14)"
          />
          <motion.path
            d="M0,40 C400,15 1040,55 1440,35 L1440,60 L0,60 Z"
            fill="rgba(122,170,206,0.10)"
          />
        </svg>
      </div>
    </motion.section>
  );
}