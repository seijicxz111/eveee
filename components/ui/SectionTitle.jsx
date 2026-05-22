'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaSeedling } from 'react-icons/fa';

export default function SectionTitle({ icon, title, sub }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="text-center mb-10"
    >
      <motion.h2
        className="font-display font-800 text-4xl mb-3"
        style={{ color: '#355872' }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {title}
      </motion.h2>

      {/* Decorative line with seedling */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <motion.svg
          width="48" height="8" viewBox="0 0 48 8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.18, duration: 0.5 }}
          style={{ transformOrigin: 'right' }}
        >
          <path d="M2,4 C8,2.5 14,5.5 20,3.5 C26,1.5 32,5 38,4 C42,3.2 45,4.5 47,4" stroke="rgba(156,213,255,0.75)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M1,4.5 C7,3 13,6 19,4 C25,2 31,5.5 37,4.5 C41,3.8 44,5 46,4.5" stroke="rgba(122,170,206,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </motion.svg>

        {/* motion.span replaces motion.i — same animation props, icon rendered inside */}
        <motion.span
          style={{ color: '#9CD5FF', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center' }}
          animate={inView ? { rotate: [0, 15, -10, 0], scale: [0.8, 1.2, 1] } : {}}
          transition={{ delay: 0.28, duration: 0.6 }}
        >
          <FaSeedling />
        </motion.span>

        <motion.svg
          width="48" height="8" viewBox="0 0 48 8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.18, duration: 0.5 }}
          style={{ transformOrigin: 'left' }}
        >
          <path d="M1,4 C4,4.8 8,3.2 14,4.5 C20,5.8 26,2.5 32,4 C38,5.5 42,3 46,4" stroke="rgba(156,213,255,0.75)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M2,3.5 C5,4.5 9,2.8 15,4 C21,5.2 27,2 33,3.5 C39,5 43,3.2 47,4" stroke="rgba(122,170,206,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </motion.svg>
      </div>

      {sub && (
        <motion.p
          className="font-body text-sm"
          style={{ color: 'rgba(53,88,114,0.55)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}