'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number }

const rand = (min: number, max: number) => Math.random() * (max - min) + min

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef('')
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    colorRef.current = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim()
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const count = window.matchMedia('(pointer: coarse)').matches ? 20 : 40
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: rand(0, width),
      y: rand(0, height),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.18, 0.18),
      r: rand(0.5, 2),
      a: rand(0.1, 0.45),
    }))

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = colorRef.current || '#00e1ff'
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -p.r) p.x = width + p.r
        else if (p.x > width + p.r) p.x = -p.r
        if (p.y < -p.r) p.y = height + p.r
        else if (p.y > height + p.r) p.y = -p.r
        ctx.globalAlpha = p.a
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    }
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start())

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-55"
    />
  )
}
