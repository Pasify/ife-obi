'use client'

import { useEffect, useRef, useState } from 'react'

const DURATION = 2000

const stats = [
  {
    target: 3,
    suffix: '+',
    label: 'Years shipping web & mobile products',
    sentence: 'Over 3 years shipping web and mobile products',
  },
  {
    target: 100,
    suffix: '+',
    label: "Users across live products I've built",
    sentence: "Over 100 users across live products I've built",
  },
  {
    target: 25,
    suffix: '%',
    label: 'Faster page loads on Shop-Agu',
    sentence: '25% faster page loads on Shop-Agu',
  },
  {
    target: 5,
    suffix: '',
    label: 'Developers led, delivered on schedule',
    sentence: '5 developers led, delivered on schedule',
  },
]

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function ResultsStrip() {
  const ref = useRef<HTMLUListElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1)
        setProgress(t === 1 ? 1 : easeOutCubic(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ul ref={ref} className="results-strip">
      {stats.map((stat) => {
        const value = progress === 1 ? stat.target : Math.floor(stat.target * progress)
        return (
          <li key={stat.label} className="stat-card glass" aria-label={stat.sentence}>
            <span className="sr-only">{stat.sentence}</span>
            <span className="stat-number" aria-hidden="true">
              {value}
              {stat.suffix}
            </span>
            <span className="stat-label" aria-hidden="true">
              {stat.label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
