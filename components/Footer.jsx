'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Floating hearts that pop up and drift away
function FloatingHeart() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let id = 0;
    const spawn = () => {
      const key = id++;
      setHearts(h => [...h, {
        key,
        x: (Math.random() - 0.5) * 40, // drift left/right
        delay: 0,
        size: 10 + Math.random() * 8,
      }]);
      // remove after animation completes
      setTimeout(() => setHearts(h => h.filter(p => p.key !== key)), 1800);
    };
    spawn(); // one on mount
    const iv = setInterval(spawn, 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <span className="relative inline-block ml-1" style={{ width: 22, height: 22, verticalAlign: 'middle' }}>
      {/* Base jumping icon */}
      <motion.span
        className="inline-block"
        animate={{
          y:        [0, -10, 0, -5, 0],
          scaleX:   [1, 0.85, 1.1, 0.95, 1],
          scaleY:   [1, 1.15, 0.9, 1.05, 1],
          rotate:   [0, -6, 4, -2, 0],
        }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <Image src="/footer_heart.png" alt="heart" width={24} height={24} className="object-contain" />
      </motion.span>

      {/* Floating particles */}
      <AnimatePresence>
        {hearts.map(h => (
          <motion.span
            key={h.key}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              pointerEvents: 'none',
              width: h.size,
              height: h.size,
            }}
            initial={{ opacity: 0.9, y: 0, x: h.x * 0.3, scale: 0.7 }}
            animate={{ opacity: 0, y: -36, x: h.x, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          >
            <Image src="/hearts.png" alt="" width={Math.round(h.size)} height={Math.round(h.size)} className="object-contain" />
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-sky/20 bg-white/60 backdrop-blur-sm">
      {/* Wave top */}
      <div className="wave-divider rotate-180">
        <svg viewBox="0 0 1440 30" preserveAspectRatio="none">
          <path d="M0,15 C360,28 1080,2 1440,15 L1440,30 L0,30 Z" fill="rgba(156,213,255,0.08)"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Footer icon */}
            <Image src="/footer_icon.png" alt="footer icon" width={28} height={28} className="object-contain" />
            <span className="font-display font-700 text-deep text-sm">
              Seijicxz
            </span>
          </div>

          <p className="text-xs font-body text-deep/40 text-center">
            © {year} CJ Steeve Cadenas · Built with{' '}
            <span className="text-mid font-700">Next.js</span> +{' '}
            <span className="text-mid font-700">Tailwind</span> +{' '}
            <span className="text-mid font-700">Framer Motion</span>
            <FloatingHeart />
          </p>

          <div className="flex items-center gap-2">
            {[
              { href: 'https://github.com/seijicxz', icon: 'fab fa-github' },
              { href: '#', icon: 'fab fa-twitter' },
            ].map(s => (
              <motion.a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-sky/10 border border-sky/25 text-deep/50 hover:text-deep hover:border-mid transition-all text-xs sketchy-circle"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                <i className={s.icon} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}