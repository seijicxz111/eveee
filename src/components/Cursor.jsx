import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef()

  useEffect(() => {
    const dot = dotRef.current
    const onMove = e => {
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }
    const onEnter = () => dot.classList.add('cursor-hover')
    const onLeave = () => dot.classList.remove('cursor-hover')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return <div id="cursor-dot" ref={dotRef} />
}
