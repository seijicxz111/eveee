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
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      let current = 'about';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.34,1.56,0.64,1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#a8c8a8]/40 shadow-lg'
          : 'bg-transparent'
      }`}
    >
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
            className="relative w-9 h-9 rounded-2xl overflow-hidden border-2 border-[#a8c8a8]/60 shadow-md bg-white"
            animate={logoHovered ? { rotate: [0, -8, 8, -4, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Image src="/icon.png" alt="logo" fill className="object-contain p-0.5" />
          </motion.div>
          <motion.span
            className="font-display font-800 text-[#3d5a3e] text-lg leading-none"
            animate={logoHovered ? { color: '#6b9e6e' } : { color: '#3d5a3e' }}
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
                  ? 'text-[#3d5a3e]'
                  : 'text-[#3d5a3e]/60 hover:text-[#3d5a3e]'
              }`}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-[#a8c8a8]/30 border border-[#a8c8a8]/50"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <motion.span
              key={i}
              className="block h-0.5 w-6 bg-[#3d5a3e] rounded-full"
              animate={mobileOpen ? (
                i === 0 ? { rotate: 45, y: 8 } :
                i === 1 ? { opacity: 0, scaleX: 0 } :
                          { rotate: -45, y: -8 }
              ) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{  height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.34,1.56,0.64,1] }}
            className="md:hidden overflow-hidden bg-white/92 backdrop-blur-xl border-t border-[#a8c8a8]/20"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left px-4 py-2.5 rounded-2xl font-body font-700 text-sm transition-all ${
                    activeSection === link.href.slice(1)
                      ? 'bg-[#a8c8a8]/30 text-[#3d5a3e]'
                      : 'text-[#3d5a3e]/60 hover:bg-[#a8c8a8]/15 hover:text-[#3d5a3e]'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
