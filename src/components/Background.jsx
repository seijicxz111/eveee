import { useEffect, useRef } from 'react'

const aBlobs = [
  { x: 0.2, y: 0.3, r: 0.38, hue: 260, speed: 0.00007 },
  { x: 0.7, y: 0.6, r: 0.42, hue: 190, speed: 0.0001 },
  { x: 0.5, y: 0.1, r: 0.35, hue: 320, speed: 0.00006 },
  { x: 0.85, y: 0.2, r: 0.3,  hue: 210, speed: 0.00009 },
]

export function AuroraCanvas({ theme }) {
  const ref = useRef()

  useEffect(() => {
    const ac = ref.current
    const ctx = ac.getContext('2d')
    let aT = 0, raf

    const resize = () => { ac.width = innerWidth; ac.height = innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      aT++
      ctx.clearRect(0, 0, ac.width, ac.height)
      const isDark = theme !== 'light'
      aBlobs.forEach((b, i) => {
        const nx = b.x + Math.sin(aT * b.speed * 1000 + i) * 0.12
        const ny = b.y + Math.cos(aT * b.speed * 800 + i * 1.3) * 0.1
        const cx = nx * ac.width, cy = ny * ac.height
        const rad = b.r * Math.max(ac.width, ac.height)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        const alpha = isDark ? 0.13 : 0.07
        grad.addColorStop(0, `hsla(${b.hue},80%,65%,${alpha})`)
        grad.addColorStop(0.5, `hsla(${b.hue+30},70%,55%,${alpha*0.5})`)
        grad.addColorStop(1, `hsla(${b.hue+60},60%,45%,0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI*2)
        ctx.fillStyle = grad
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [theme])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

export function ParticlesCanvas({ theme }) {
  const ref = useRef()

  useEffect(() => {
    const pc = ref.current
    const ctx = pc.getContext('2d')
    let raf

    const resize = () => {
      pc.width = innerWidth; pc.height = innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, pc.width, pc.height)
      const col = theme === 'light' ? '100,60,200' : '167,139,250'
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = pc.width
        if (p.x > pc.width) p.x = 0
        if (p.y < 0) p.y = pc.height
        if (p.y > pc.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${p.alpha})`
        ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${col},${0.07*(1-d/100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [theme])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
