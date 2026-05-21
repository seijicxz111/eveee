import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Portfolio Website', icon: 'fa-globe',
    desc: 'A personal portfolio built with HTML, CSS, and JavaScript featuring glassmorphism design.',
    tags: ['HTML', 'CSS', 'JS'],
    gradient: 'from-purple-600/20 to-cyan-600/20',
    github: 'https://github.com/seijicxz111',
    glowColor: 'rgba(167,139,250,0.2)',
  },
  {
    title: 'Web App Project', icon: 'fa-code',
    desc: 'A full-stack web application with Python backend and MySQL database integration.',
    tags: ['Python', 'MySQL', 'CSS'],
    gradient: 'from-pink-600/20 to-purple-600/20',
    github: 'https://github.com/seijicxz111',
    glowColor: 'rgba(236,72,153,0.2)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 180, damping: 22 }
  }
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="section-label flex justify-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>Work</span>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card tilt-card shine-card flex flex-col"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -6, boxShadow: `0 20px 60px ${p.glowColor}` }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                const dx = (e.clientX - r.left - r.width/2) / (r.width/2)
                const dy = (e.clientY - r.top - r.height/2) / (r.height/2)
                e.currentTarget.style.transform = `perspective(800px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg) scale(1.02)`
              }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}
            >
              <div className="shine-effect" />
              <motion.div
                className={`h-36 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              >
                <motion.i
                  className={`fas ${p.icon} text-4xl gradient-text`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
              <div className="p-5 flex flex-col flex-1 relative z-10">
                <h4 className="font-bold text-base mb-2">{p.title}</h4>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <motion.span key={t} className="project-tag" whileHover={{ scale: 1.05, y: -1 }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href={p.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <i className="fab fa-github" /> Code
                  </motion.a>
                  <motion.a
                    href="#"
                    className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-2)] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <i className="fas fa-external-link-alt" /> Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coming soon card */}
          <motion.div
            className="glass-card tilt-card shine-card flex items-center justify-center min-h-[200px]"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(167,139,250,0.3)' }}
          >
            <div className="shine-effect" />
            <div className="text-center relative z-10">
              <motion.div
                className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--glass-border)] flex items-center justify-center mx-auto mb-3"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              >
                <i className="fas fa-plus text-[var(--text-secondary)]" />
              </motion.div>
              <p className="text-sm text-[var(--text-secondary)]">More coming soon</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
