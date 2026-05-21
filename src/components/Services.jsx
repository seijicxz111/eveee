import { motion } from 'framer-motion'

const services = [
  {
    icon: 'fa-code', title: 'Web Development',
    desc: 'Building responsive, fast, and modern websites using HTML, CSS, JavaScript, and Python — from landing pages to full web apps.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    gradient: 'from-purple-500/20 to-cyan-500/10',
    glowColor: 'rgba(167,139,250,0.2)',
  },
  {
    icon: 'fa-palette', title: 'UI/UX Design',
    desc: 'Designing clean, intuitive interfaces with a focus on user experience, visual hierarchy, and modern aesthetics like glassmorphism.',
    tags: ['Figma', 'Prototyping', 'Design'],
    gradient: 'from-pink-500/20 to-purple-500/10',
    glowColor: 'rgba(236,72,153,0.2)',
  },
  {
    icon: 'fa-database', title: 'Database Management',
    desc: 'Designing and managing relational databases with MySQL — from schema design to queries, optimization, and data integrity.',
    tags: ['MySQL', 'SQL', 'Python'],
    gradient: 'from-cyan-500/20 to-emerald-500/10',
    glowColor: 'rgba(103,232,249,0.2)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 22 }
  }
}

export default function Services() {
  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="section-label flex justify-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>What I Do</span>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Services
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="glass-card tilt-card shine-card p-7 text-center"
              variants={cardVariants}
              whileHover={{
                scale: 1.03, y: -6,
                boxShadow: `0 20px 60px ${s.glowColor}`,
              }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                const dx = (e.clientX - r.left - r.width/2) / (r.width/2)
                const dy = (e.clientY - r.top - r.height/2) / (r.height/2)
                e.currentTarget.style.transform = `perspective(800px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg) scale(1.03)`
              }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}
            >
              <div className="shine-effect" />
              <div className="relative z-10">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className={`fas ${s.icon} text-2xl gradient-text`} />
                </motion.div>
                <h4 className="font-bold text-base mb-3">{s.title}</h4>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {s.tags.map((t, ti) => (
                    <motion.span
                      key={t}
                      className="project-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + ti * 0.06 }}
                      whileHover={{ scale: 1.08, y: -1 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
