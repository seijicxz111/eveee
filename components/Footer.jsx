'use client';

import { motion } from 'framer-motion';

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
            {/* Mini chiikawa */}
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="15" fill="#F7F8F0" stroke="#9CD5FF" strokeWidth="1.5"/>
              <ellipse cx="10" cy="8" rx="4" ry="5" fill="#F7F8F0" stroke="#9CD5FF" strokeWidth="1.2"/>
              <ellipse cx="26" cy="8" rx="4" ry="5" fill="#F7F8F0" stroke="#9CD5FF" strokeWidth="1.2"/>
              <circle cx="14" cy="19" r="2" fill="#355872"/>
              <circle cx="22" cy="19" r="2" fill="#355872"/>
              <ellipse cx="11.5" cy="22" rx="2" ry="1" fill="#F9C5D1" opacity="0.7"/>
              <ellipse cx="24.5" cy="22" rx="2" ry="1" fill="#F9C5D1" opacity="0.7"/>
            </svg>
            <span className="font-display font-700 text-deep text-sm">
              Seijicxz
            </span>
          </div>

          <p className="text-xs font-body text-deep/40 text-center">
            © {year} CJ Steeve Cadenas · Built with{' '}
            <span className="text-mid font-700">Next.js</span> +{' '}
            <span className="text-mid font-700">Tailwind</span> +{' '}
            <span className="text-mid font-700">Framer Motion</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block ml-1"
            >
              💙
            </motion.span>
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
