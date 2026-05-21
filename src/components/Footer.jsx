export default function Footer({ openCmd }) {
  return (
    <footer style={{
      background: 'rgba(10,10,26,0.8)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--glass-border)',
      padding: '1.5rem 2rem',
    }}>
      <div className="max-w-5xl mx-auto flex justify-between items-center flex-wrap gap-2">
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          © 2025 Seijicxz. All rights reserved.
        </p>
        <button
          onClick={openCmd}
          style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Press <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: 4, fontFamily: 'Space Mono,monospace' }}>Ctrl K</kbd> to navigate
        </button>
      </div>
    </footer>
  )
}
