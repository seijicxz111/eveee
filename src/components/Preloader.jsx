import { useEffect, useState } from 'react'

export default function Preloader({ onDone }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1800)
    const t2 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1.5rem',
        transition: 'opacity 0.6s',
        opacity: hiding ? 0 : 1,
        pointerEvents: hiding ? 'none' : 'auto',
      }}
    >
      <div style={{
        fontSize: '1.8rem', fontWeight: 700, fontFamily: "'Space Mono', monospace",
        background: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Seijicxz
      </div>
      <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 50, overflow: 'hidden' }}>
        <div className="preloader-fill" style={{ width: '100%' }} />
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Loading portfolio…</p>
    </div>
  )
}
