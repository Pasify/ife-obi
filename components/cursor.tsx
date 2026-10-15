'use client'

import { useEffect, useRef, useState } from 'react'

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, [data-cursor="hover"]'
const LERP = 0.18

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!coarse && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const target = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let frame = 0

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * LERP
      ringPos.y += (target.y - ringPos.y) * LERP
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      dot.classList.remove('cursor-hidden')
      ring.classList.remove('cursor-hidden')
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      ring.classList.toggle('is-hover', Boolean(el?.closest?.(HOVER_SELECTOR)))
    }

    const onLeave = () => {
      dot.classList.add('cursor-hidden')
      ring.classList.add('cursor-hidden')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring cursor-hidden" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot cursor-hidden" aria-hidden="true" />
    </>
  )
}
