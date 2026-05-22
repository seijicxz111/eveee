'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#about',     label: 'About'     },
  { href: '#skills',    label: 'Skills'    },
  { href: '#projects',  label: 'Projects'  },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [scrolled,      setScrolled]   = useState(false);
  const [activeSection, setActive]     = useState('about');
  const [mobileOpen,    setMobileOpen] = useState(false);
  const [logoHovered,   setLogoHover]  = useState(false);

  useEffect(() => {
    // Cache offsetTop values once and refresh on resize — reading offsetTop inside
    // a scroll handler forces layout recalculation (reflow) on every scroll event.
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    let offsets = {};

    const cacheOffsets = () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) offsets[id] = el.offsetTop;
      });
    };
    cacheOffsets();
    window.addEventListener('resize', cacheOffsets, { passive: true });

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = 'about';
      for (const id of sections) {
        if (window.scrollY >= (offsets[id] ?? 0) - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cacheOffsets);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[999] navbar-sketchy-border"
        style={{
          background: scrolled ? 'rgba(247,248,240,0.97)' : 'rgba(247,248,240,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '2.5px solid rgba(122,170,206,0.65)'
            : '1.5px solid rgba(122,170,206,0.3)',
          boxShadow: scrolled
            ? '0 4px 0 0 rgba(156,213,255,0.25), 0 6px 0 0 rgba(122,170,206,0.1), 0 8px 32px rgba(53,88,114,0.12), 2px 0 0 0 rgba(122,170,206,0.08), -2px 0 0 0 rgba(156,213,255,0.06)'
            : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Sketchy accent line — visible when scrolled */}
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          left: '1.5%',
          right: '2%',
          height: '1.5px',
          background: scrolled ? 'rgba(156,213,255,0.3)' : 'transparent',
          borderRadius: '999px',
          transform: 'rotate(-0.12deg) scaleX(0.98)',
          transition: 'background 0.4s ease',
          pointerEvents: 'none',
        }} />
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('#about')}
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onHoverStart={() => setLogoHover(true)}
            onHoverEnd={() => setLogoHover(false)}
          >
            <motion.div
              className="relative w-9 h-9 rounded-2xl overflow-hidden border-2 border-[var(--mid)]/60 shadow-md bg-white sketchy-badge"
              animate={logoHovered ? { rotate: [0, -8, 8, -4, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Image src="/icon.png" alt="logo" fill className="object-contain p-0.5" />
            </motion.div>
            <motion.span
              className="font-display font-800 text-[var(--deep)] text-lg leading-none"
              animate={logoHovered ? { color: 'var(--mid)' } : { color: 'var(--deep)' }}
            >
              Seijicxz
            </motion.span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 300 }}
                className={`relative px-4 py-2 rounded-full text-sm font-body font-700 transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--deep)]'
                    : 'text-[var(--deep)]/60 hover:text-[var(--deep)]'
                }`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-[var(--mid)]/30 border border-[var(--mid)]/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60] relative rounded-xl sketchy-badge bg-white/70"
            style={{ border: '2px solid rgba(122,170,206,0.5)' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.92 }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-0.5 w-6 rounded-full"
                style={{ background: 'var(--deep)' }}
                animate={mobileOpen ? (
                  i === 0 ? { rotate: 45, y: 8 } :
                  i === 1 ? { opacity: 0, scaleX: 0 } :
                            { rotate: -45, y: -8 }
                ) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
              />
            ))}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[1000] bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel — sketchy styled */}
            <motion.div
              key="panel"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="fixed top-0 left-0 right-0 z-[1001] md:hidden"
              style={{
                background: 'rgba(247,248,240,0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '2.5px solid rgba(122,170,206,0.55)',
                boxShadow: '0 4px 0 0 rgba(156,213,255,0.3), 0 6px 0 0 rgba(122,170,206,0.12), 0 16px 48px rgba(53,88,114,0.14)',
                paddingTop: 'env(safe-area-inset-top)',
              }}
            >
              {/* Sketchy double-border accent at top */}
              <div style={{
                position: 'absolute',
                top: '3px',
                left: '2%',
                right: '3%',
                height: '1.5px',
                background: 'rgba(156,213,255,0.35)',
                borderRadius: '999px',
                transform: 'rotate(-0.15deg) scaleX(0.98)',
              }} />

              {/* Header row */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '2px solid rgba(122,170,206,0.3)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="relative w-9 h-9 rounded-2xl overflow-hidden bg-white sketchy-badge"
                    style={{ border: '2px solid rgba(122,170,206,0.6)' }}
                  >
                    <Image src="/icon.png" alt="logo" fill className="object-contain p-0.5" />
                  </div>
                  <span className="font-display font-800 text-[var(--deep)] text-base">Seijicxz</span>
                </div>

                {/* Close button — sketchy circle */}
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center sketchy-circle bg-white/80"
                  style={{ border: '2px solid rgba(122,170,206,0.5)', color: 'var(--deep)' }}
                  aria-label="Close menu"
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Nav links — each with sketchy pill style */}
              <nav className="px-4 py-3 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ x: -24, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.055, type: 'spring', stiffness: 320, damping: 24 }}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-5 py-3.5 font-body font-700 text-base transition-all duration-200 sketchy-pill"
                      style={{
                        borderRadius: '999px',
                        color: isActive ? 'var(--deep)' : 'rgba(53,88,114,0.55)',
                        background: isActive ? 'rgba(156,213,255,0.22)' : 'rgba(255,255,255,0.6)',
                        border: isActive
                          ? '2px solid rgba(122,170,206,0.65)'
                          : '2px solid rgba(122,170,206,0.28)',
                        boxShadow: isActive
                          ? '2px -1px 0 0 rgba(122,170,206,0.2), -1px 2px 0 0 rgba(156,213,255,0.15), 0 4px 14px rgba(53,88,114,0.09)'
                          : '1px -1px 0 0 rgba(122,170,206,0.12), 0 2px 8px rgba(53,88,114,0.05)',
                      }}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-indicator"
                          className="float-right text-[var(--mid)] text-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >✦</motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer hint */}
              <p className="text-center text-xs pb-5 pt-1 font-body" style={{ color: 'rgba(53,88,114,0.35)' }}>
                tap outside to close
              </p>

              {/* Sketchy bottom accent line */}
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '1%',
                right: '2%',
                height: '1.5px',
                background: 'rgba(156,213,255,0.22)',
                borderRadius: '999px',
                transform: 'rotate(0.2deg)',
              }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}