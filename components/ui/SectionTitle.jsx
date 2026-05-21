'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
        style={{ color: '#3d5a3e' }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {title}
      </motion.h2>

      {/* Decorative line with flower */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <motion.span
          className="h-px w-12 rounded-full"
          style={{ background: 'rgba(168,200,168,0.6)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.18, duration: 0.5 }}
        />
        <motion.i
          className="fas fa-seedling text-xs"
          style={{ color: '#a8c8a8' }}
          animate={inView ? { rotate: [0, 15, -10, 0], scale: [0.8, 1.2, 1] } : {}}
          transition={{ delay: 0.28, duration: 0.6 }}
        />
        <motion.span
          className="h-px w-12 rounded-full"
          style={{ background: 'rgba(168,200,168,0.6)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.18, duration: 0.5 }}
        />
      </div>

      {sub && (
        <motion.p
          className="font-body text-sm"
          style={{ color: 'rgba(61,90,62,0.55)' }}
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
