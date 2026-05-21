import { motion } from 'framer-motion'

const timeline = [
  {
    badge: 'Education', badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    icon: 'fa-graduation-cap', year: '2023 – Present',
    title: 'Bachelor of Science in Information Technology',
    sub: 'Pamantasan ng Lungsod ng San Pablo',
    desc: 'Studying core computer science concepts, web development, database systems, and software engineering principles.',
  },
  {
    badge: 'Certification', badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    icon: 'fa-certificate', year: '2024',
    title: 'Responsive Web Design',
    sub: 'freeCodeCamp',
    desc: 'Completed 300+ hours covering HTML, CSS, Flexbox, Grid, and accessibility best practices.',
  },
  {
    badge: 'Certification', badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    icon: 'fa-certificate', year: '2024',
    title: 'Python for Everybody',
    sub: 'Coursera / University of Michigan',
    desc: 'Learned Python fundamentals including data structures, web scraping, databases, and data visualization.',
  },
]

export default function Education() {
  return (
    <>
      <section id="education" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="section-label flex justify-center mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>Background</span>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            Education &amp; Certifications
          </motion.h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 200, damping: 25 }}
              >
                <motion.div
                  className="timeline-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.1, type: 'spring', stiffness: 400 }}
                />
                <motion.div
                  className="glass-card shine-card p-6"
                  whileHover={{ x: 4, boxShadow: '0 10px 40px rgba(167,139,250,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="shine-effect" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <motion.span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${item.badgeClass}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <i className={`fas ${item.icon}`} /> {item.badge}
                      </motion.span>
                      <span className="text-xs font-mono text-[var(--text-secondary)] ml-auto">{item.year}</span>
                    </div>
                    <h4 className="font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-sm text-[var(--accent-1)] mb-2">{item.sub}</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="glass-card shine-card p-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <div className="shine-effect" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <motion.i
                  className="fab fa-github text-2xl gradient-text"
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <div>
                  <h3 className="font-bold text-lg">GitHub Activity</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Contributions in the last year</p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://ghchart.rshah.org/seijicxz111"
                  alt="GitHub Contribution Chart"
                  className="custom-chart-size max-w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
