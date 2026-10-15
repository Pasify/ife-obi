'use client'

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Section({ className, children, ...props }: ComponentPropsWithoutRef<'section'>) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { root: null, threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={cn('reveal', visible && 'is-visible', className)} {...props}>
      {children}
    </section>
  )
}
