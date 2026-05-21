import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['about','stats','skills','services','projects','education','contact']

export default function Navbar({ theme, toggleTheme, openCmd }) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let cur = ''
      document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`glass-nav transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <a href="#" className="text-lg font-bold gradient-text font-mono tracking-wide">Seijicxz</a>
      <div className="hidden md:flex items-center gap-1">
        {links.map(l => (
          <a
            key={l}
            href={`#${l}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all capitalize
              ${active === l
                ? 'bg-purple-500/15 text-purple-300'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
          >
            {l}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={openCmd}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--glass-border)] hover:border-purple-400/30 transition-all"
        >
          <i className="fas fa-search text-xs" />
          <span className="hidden md:inline text-xs font-mono">Ctrl+K</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full border border-[var(--glass-border)] flex items-center justify-center hover:border-purple-400/40 transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} text-sm`} />
        </button>
      </div>
    </nav>
  )
}
