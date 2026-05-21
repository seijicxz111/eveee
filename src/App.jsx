import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

import Preloader from './components/Preloader'
import { AuroraCanvas, ParticlesCanvas } from './components/Background'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const st = document.documentElement.scrollTop
      const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollPct(sh > 0 ? (st / sh) * 100 : 0)
      setShowTop(st > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  const showToast = useCallback(() => {
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }, [])

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('cjsteevecadenas0@gmail.com').catch(() => {})
    showToast()
  }, [showToast])

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div id="scroll-progress" style={{ width: scrollPct + '%' }} />

      <Cursor />
      <AuroraCanvas theme={theme} />
      <ParticlesCanvas theme={theme} />

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onToggleTheme={toggleTheme}
        onCopyEmail={copyEmail}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            style={{
              position: 'fixed', bottom: '5rem', left: '50%',
              background: 'rgba(15,15,35,0.95)', border: '1px solid var(--glass-border)',
              borderRadius: 50, padding: '10px 20px', fontSize: '0.85rem',
              color: 'var(--text-primary)', zIndex: 9000, display: 'flex', alignItems: 'center', gap: 8,
              pointerEvents: 'none', x: '-50%',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <i className="fas fa-check-circle" style={{ color: '#34d399' }} /> Email copied!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            id="back-to-top"
            className="visible"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <i className="fas fa-chevron-up" />
          </motion.button>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} openCmd={() => setCmdOpen(true)} />
        <main>
          <Hero />
          <Stats />
          <Skills />
          <Services />
          <Projects />
          <Education />
          <Contact showToast={showToast} />
        </main>
        <Footer openCmd={() => setCmdOpen(true)} />
      </div>
    </>
  )
}
