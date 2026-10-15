'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function ProfilePhoto() {
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [missing, setMissing] = useState(false)
  const [active, setActive] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const img = imgRef.current
    // The image may have errored before hydration attached onError.
    if (img && img.complete && img.naturalWidth === 0) setMissing(true)
  }, [])

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)
    const el = frameRef.current
    if (!touch || !el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.7 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={frameRef}
      className={cn('about-photo', active && 'is-active')}
      onClick={isTouch ? () => setActive((v) => !v) : undefined}
    >
      {missing ? (
        <div className="about-photo-fallback" role="img" aria-label="Portrait of Ifesinachi Obiora">
          IO
        </div>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/profile.jpg"
            alt="Portrait of Ifesinachi Obiora"
            className="about-photo-img"
            onError={() => setMissing(true)}
          />
          <div aria-hidden="true" className="about-photo-overlay" />
        </>
      )}
    </div>
  )
}
