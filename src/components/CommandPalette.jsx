import { useEffect, useRef, useState } from 'react'

const commands = [
  { label: 'About',        icon: 'fa-user',           href: '#about' },
  { label: 'Stats',        icon: 'fa-chart-bar',      href: '#stats' },
  { label: 'Skills',       icon: 'fa-code',           href: '#skills' },
  { label: 'Services',     icon: 'fa-cog',            href: '#services' },
  { label: 'Projects',     icon: 'fa-briefcase',      href: '#projects' },
  { label: 'Education',    icon: 'fa-graduation-cap', href: '#education' },
  { label: 'Contact',      icon: 'fa-envelope',       href: '#contact' },
  { label: 'Toggle Theme', icon: 'fa-moon',           action: 'toggleTheme' },
  { label: 'Back to Top',  icon: 'fa-arrow-up',       action: 'backToTop' },
  { label: 'Copy Email',   icon: 'fa-copy',           action: 'copyEmail' },
]

export default function CommandPalette({ open, onClose, onToggleTheme, onCopyEmail }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef()

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => { setActiveIdx(0) }, [query])
  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open ? onClose() : null }
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i+1, filtered.length-1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i-1, 0)) }
      if (e.key === 'Enter') exec(filtered[activeIdx])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, activeIdx])

  const exec = cmd => {
    if (!cmd) return
    onClose()
    if (cmd.href) setTimeout(() => {
      document.querySelector(cmd.href)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    else if (cmd.action === 'toggleTheme') setTimeout(onToggleTheme, 100)
    else if (cmd.action === 'backToTop') setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
    else if (cmd.action === 'copyEmail') setTimeout(onCopyEmail, 100)
  }

  if (!open) return null

  return (
    <div className="cmd-overlay cmd-open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cmd-palette">
        <div className="cmd-search-row">
          <i className="fas fa-search cmd-icon" />
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Jump to section or type a command…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd style={{ fontSize:'0.7rem', background:'rgba(255,255,255,0.08)', padding:'2px 8px', borderRadius:4, fontFamily:'Space Mono,monospace', color:'var(--text-secondary)' }}>ESC</kbd>
        </div>
        <ul className="cmd-list">
          {filtered.map((c, i) => (
            <li
              key={c.label}
              className={`cmd-item ${i === activeIdx ? 'cmd-active' : ''}`}
              onClick={() => exec(c)}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <i className={`fas ${c.icon} cmd-item-icon`} />
              <span>{c.label}</span>
              <kbd className="cmd-item-hint">{c.href ? '↵' : 'run'}</kbd>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="cmd-item" style={{ opacity: 0.5 }}>No results found</li>
          )}
        </ul>
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>ESC</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
