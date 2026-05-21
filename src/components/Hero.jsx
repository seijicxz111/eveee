import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const roles = ['Web Developer', 'UI Designer', 'Problem Solver', 'Python Enthusiast']
const hobbies = [
  { icon: 'fa-gamepad', label: 'Gaming' },
  { icon: 'fa-music', label: 'Music' },
  { icon: 'fa-book', label: 'Reading' },
  { icon: 'fa-mug-hot', label: 'Coffee' },
  { icon: 'fa-palette', label: 'Design' },
  { icon: 'fa-globe', label: 'Travel' },
]

function useTyped(roles) {
  const [text, setText] = useState('')
  const [rIdx, setRIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const cur = roles[rIdx]
    let timeout
    if (!deleting && text === cur) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRIdx(i => (i + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? text.slice(0, -1) : cur.slice(0, text.length + 1))
      }, deleting ? 60 : 100)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, rIdx, roles])

  return text
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 8 },
  visible: i => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: 0.6 + i * 0.07, type: 'spring', stiffness: 400, damping: 22 }
  })
}

export default function Hero() {
  const typed = useTyped(roles)

  return (
    <section id="about" className="pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="glass-card p-8 md:p-12 tilt-card shine-card"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 150, damping: 25 }}
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect()
            const dx = (e.clientX - r.left - r.width/2) / (r.width/2)
            const dy = (e.clientY - r.top - r.height/2) / (r.height/2)
            e.currentTarget.style.transform = `perspective(800px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg)`
          }}
          onMouseLeave={e => { e.currentTarget.style.transform = '' }}
        >
          <div className="shine-effect" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-[var(--glass-border)] text-[var(--text-secondary)]">
                  <i className="fas fa-hand-wave mr-1" /> Welcome
                </span>
                <motion.span
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  animate={{ boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 12px rgba(52,211,153,0.25)', '0 0 0px rgba(52,211,153,0)'] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <span className="avail-dot" /> Open to opportunities
                </motion.span>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                Hello World!
              </motion.h2>

              <motion.h4
                className="text-xl font-semibold mb-1 text-[var(--text-secondary)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
              >
                I'm <span className="gradient-text">CJ Steeve Cadenas</span>
              </motion.h4>
              <motion.h4
                className="text-xl font-semibold mb-4 text-[var(--text-secondary)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
              >
                Aspiring <span className="gradient-text">{typed}</span><span className="typed-cursor">|</span>
              </motion.h4>

              <motion.p
                className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to my portfolio! I am an aspiring web developer who is passionate about creating beautiful and functional websites.
              </motion.p>

              <div className="flex flex-wrap gap-2 mb-6">
                {hobbies.map((h, i) => (
                  <motion.span
                    key={h.label}
                    className="hobby-chip"
                    custom={i}
                    variants={chipVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.06, y: -2, borderColor: 'rgba(167,139,250,0.4)' }}
                  >
                    <i className={`fas ${h.icon} text-xs`} /> {h.label}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.a
                  href="#contact"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-lg shadow-purple-500/20"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: '0 12px 30px rgba(167,139,250,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="#"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold border border-[var(--glass-border)] text-[var(--text-primary)]"
                  whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(167,139,250,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <i className="fas fa-download mr-2" />Resume
                </motion.a>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <motion.div
                className="relative w-52 h-52"
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 180, damping: 20 }}
              >
                <img
                  src="https://64.media.tumblr.com/ff21b4f05bb79f16e0dceb7dfad75272/tumblr_mqtho3Fr0n1rgam01o1_1280.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-2 border-purple-400/30"
                />
                <div className="img-ring" />
                <div className="img-ring-2" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
