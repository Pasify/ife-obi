'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type ImageLightboxProps = {
  src: string
  title: string
  onClose: () => void
}

export function ImageLightbox({ src, title, onClose }: ImageLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <figure className="image-lightbox">
        <button
          ref={closeRef}
          type="button"
          className="lightbox-close"
          aria-label="Close image"
          onClick={onClose}
        >
          <X size={22} aria-hidden="true" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic size is unknown */}
        <img src={src} alt={title} />
        <figcaption className="image-lightbox-caption">{title}</figcaption>
      </figure>
    </div>,
    document.body,
  )
}
