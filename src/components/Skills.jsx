import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'

const skills = [
  { icon: 'fa-laptop-code', title: 'Frontend Development', pct: 40, level: 'Beginner', levelClass: 'level-beginner', desc: 'HTML, CSS, JavaScript — building responsive UIs and landing pages.', delay: 0.1 },
  { icon: 'fa-server', title: 'Backend Development', pct: 35, level: 'Beginner', levelClass: 'level-beginner', desc: 'Python scripting, basic server logic, and REST API concepts.', delay: 0.15 },
  { icon: 'fa-paint-brush', title: 'UI/UX Design', pct: 60, level: 'Intermediate', levelClass: 'level-intermediate', desc: 'Glassmorphism, visual hierarchy, Figma prototyping and design systems.', delay: 0.2 },
  { icon: 'fa-database', title: 'Database Management', pct: 50, level: 'Intermediate', levelClass: 'level-intermediate', desc: 'MySQL schema design, queries, joins, and data integrity practices.', delay: 0.25 },
]

const languages = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', label: 'HTML' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', label: 'CSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', label: 'JavaScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', label: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', label: 'MySQL' },
]
const tools = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', label: 'Git' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', label: 'GitHub', invert: true },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', label: 'VS Code' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', label: 'Figma' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', label: 'Bootstrap' },
]

// Combine all for marquee
const allBadges = [...languages, ...tools]

function MarqueeBadges() {
  const x = useMotionValue(0)
  const baseVelocity = -0.6
  const [paused, setPaused] = useState(false)
  const directionFactor = useRef(1)
  // We'll clone items for seamless loop
  const items = [...allBadges, ...allBadges, ...allBadges]

  useAnimationFrame((t, delta) => {
    if (paused) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 16)
    const newX = x.get() + moveBy
    // Wrap: each set is allBadges.length * ~120px wide. Reset at -half
    const resetAt = -(allBadges.length * 120)
    if (newX < resetAt) {
      x.set(newX - resetAt)
    } else {
      x.set(newX)
    }
  })

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        style={{ x, display: 'flex', gap: '10px', width: 'max-content' }}
      >
        {items.map((b, idx) => (
          <motion.span
            key={idx}
            className="tool-badge flex-shrink-0"
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <img src={b.src} alt={b.label} className={`w-4 h-4 ${b.invert ? 'invert' : ''}`} /> {b.label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

function RadialRing({ pct, icon, animated }) {
  const circ = 2 * Math.PI * 42
  const dash = animated ? (pct / 100) * circ : 0
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!animated) return
    let cur = 0
    const step = pct / 60
    const t = setInterval(() => {
      cur = Math.min(cur + step, pct)
      setCount(Math.round(cur))
      if (cur >= pct) clearInterval(t)
    }, 20)
    return () => clearInterval(t)
  }, [animated, pct])

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="42"
          className="radial-fill"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-0.5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <i className={`fas ${icon} text-xl gradient-text`} />
        <span className="text-xs font-bold font-mono text-[var(--text-secondary)]">{count}%</span>
      </motion.div>
    </div>
  )
}

function SkillCard({ skill }) {
  const ref = useRef()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect() } }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="glass-card tilt-card shine-card p-6"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: skill.delay, type: 'spring', stiffness: 200, damping: 22 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(167,139,250,0.15)' }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        const dx = (e.clientX - r.left - r.width/2) / (r.width/2)
        const dy = (e.clientY - r.top - r.height/2) / (r.height/2)
        e.currentTarget.style.transform = `perspective(800px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg) scale(1.02)`
      }}
      onMouseLeave={e => { e.currentTarget.style.transform = '' }}
    >
      <div className="shine-effect" />
      <div className="flex items-center gap-5 relative z-10">
        <RadialRing pct={skill.pct} icon={skill.icon} animated={animated} />
        <div>
          <h3 className="font-bold text-base mb-1.5">{skill.title}</h3>
          <motion.span
            className={`inline-block px-3 py-0.5 rounded-full text-[0.68rem] font-bold uppercase tracking-wide mb-2 ${skill.levelClass}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: skill.delay + 0.2 }}
          >
            {skill.level}
          </motion.span>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{skill.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-4">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="section-label flex justify-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>Expertise</span>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {skills.map(s => <SkillCard key={s.title} skill={s} />)}
        </div>

        {/* Languages & Tools — Marquee */}
        <motion.div
          className="glass-card shine-card p-7"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 22 }}
        >
          <div className="shine-effect" />
          <div className="relative z-10">
            <motion.div
              className="flex items-center gap-3 mb-5 flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <i className="fas fa-code gradient-text" />
              <h3 className="font-bold text-lg">Languages &amp; Tools</h3>
              <motion.span
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 border border-amber-400/25 text-amber-300"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <i className="fas fa-book-open" /> Learning: React
              </motion.span>
            </motion.div>

            {/* Marquee strip */}
            <MarqueeBadges />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
