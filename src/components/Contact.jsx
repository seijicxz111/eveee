import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact({ showToast }) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false); setSent(true)
    setTimeout(() => { setSent(false); e.target.reset() }, 3000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('cjsteevecadenas0@gmail.com').catch(() => {})
    showToast()
  }

  const socials = [
    { href: 'https://www.facebook.com/violeeee.07', icon: 'fa-facebook-f', label: 'Facebook', color: '#1877f2' },
    { href: '#', icon: 'fa-linkedin-in', label: 'LinkedIn', color: '#0a66c2' },
    { href: 'https://github.com/seijicxz111', icon: 'fa-github', label: 'GitHub', color: '#a78bfa' },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } }
  }

  return (
    <section id="contact" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="section-label flex justify-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>Get In Touch</span>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Contact Me
        </motion.h2>
        <div className="grid md:grid-cols-5 gap-4">
          {/* Info */}
          <motion.div
            className="glass-card shine-card p-7 md:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <div className="shine-effect" />
            <div className="relative z-10 h-full flex flex-col">
              <motion.h4
                className="font-bold text-lg mb-2 flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.i
                  className="fas fa-comment gradient-text"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                />
                Let's talk
              </motion.h4>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                Have a project in mind or just want to say hi? Drop a message!
              </p>

              <motion.div
                className="flex items-start gap-3 mb-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(167,139,250,0.25)' }}
                >
                  <i className="fas fa-envelope text-sm gradient-text" />
                </motion.div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] mb-1">Email</p>
                  <motion.button
                    onClick={copyEmail}
                    className="text-sm text-[var(--text-primary)] hover:text-[var(--accent-1)] transition-colors flex items-center gap-1.5"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    cjsteevecadenas0@gmail.com <i className="fas fa-copy text-xs opacity-60" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 mb-6"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.32 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className="fas fa-map-marker-alt text-sm gradient-text" />
                </motion.div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] mb-1">Location</p>
                  <p className="text-sm text-[var(--text-primary)]">
                    <i className="fas fa-map-pin mr-1" /> Philippines
                  </p>
                </div>
              </motion.div>

              <div className="flex gap-2 mt-auto">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.icon}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.15, y: -3, borderColor: s.color, color: s.color }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <i className={`fab ${s.icon} text-sm`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="glass-card shine-card p-7 md:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <div className="shine-effect" />
            <motion.form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div variants={fieldVariants}>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Name</label>
                  <input type="text" name="name" className="input-glass" placeholder="Your name" required />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Email</label>
                  <input type="email" name="email" className="input-glass" placeholder="your@email.com" required />
                </motion.div>
              </div>
              <motion.div variants={fieldVariants}>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Subject</label>
                <input type="text" name="subject" className="input-glass" placeholder="What's this about?" />
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Message</label>
                <textarea name="message" className="input-glass" rows={5} placeholder="Tell me more…" required />
              </motion.div>
              <motion.div variants={fieldVariants}>
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-purple-500 to-cyan-400 text-white transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  whileHover={!sending && !sent ? { scale: 1.02, boxShadow: '0 10px 30px rgba(167,139,250,0.35)' } : {}}
                  whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span
                        key="sent"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <motion.i
                          className="fas fa-check"
                          initial={{ rotate: -90 }}
                          animate={{ rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        /> Sent!
                      </motion.span>
                    ) : sending ? (
                      <motion.span
                        key="sending"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.i
                          className="fas fa-paper-plane"
                          animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                        /> Sending…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <i className="fas fa-paper-plane" /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
