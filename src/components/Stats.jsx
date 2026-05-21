import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  const start = () => {
    if (started.current) return
    started.current = true
    const step = target / (duration / 25)
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + step, target)
      setCount(Math.round(cur))
      if (cur >= target) clearInterval(t)
    }, 25)
  }

  return [count, start]
}

function StatItem({ value, suffix = '', label, icon, delay }) {
  const [count, start] = useCountUp(value)
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) start() }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])

  return (
    <motion.div
      ref={ref}
      className="flex-1 text-center py-6 px-4 border-r border-[var(--glass-border)] last:border-r-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
      whileHover={{ backgroundColor: 'rgba(167,139,250,0.04)' }}
    >
      <motion.div
        className="stat-number font-mono"
        animate={count > 0 ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-xs font-semibold text-[var(--text-secondary)] mt-1 uppercase tracking-widest">
        {icon && <i className={`fas ${icon} mr-1`} />}{label}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const [commits, setCommits] = useState(120)

  useEffect(() => {
    ;(async () => {
      try {
        const username = 'seijicxz111'
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`)
        if (!res.ok) return
        const repos = await res.json()
        let total = 0
        for (const repo of repos) {
          try {
            const r = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=1`)
            if (!r.ok) continue
            const link = r.headers.get('Link') || ''
            const match = link.match(/[?&]page=(\d+)>; rel="last"/)
            if (match) total += parseInt(match[1])
            else { const d = await r.json(); total += Array.isArray(d) ? d.length : 0 }
          } catch {}
        }
        if (total > 0) setCommits(total)
      } catch {}
    })()
  }, [])

  return (
    <section id="stats" className="py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="glass-card flex flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          <StatItem value={5} label="Projects Built" delay={0} />
          <StatItem value={commits} label="GitHub Commits" delay={1} />
          <StatItem value={4} label="Technologies" delay={2} />
          <StatItem value={999} suffix="+" label="Cups of Coffee" icon="fa-mug-hot" delay={3} />
        </motion.div>
      </div>
    </section>
  )
}
