'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/button'
import type { Certificate } from '@/data/certificates'

type CertificateLightboxProps = {
  certificates: Certificate[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

export function CertificateLightbox({
  certificates,
  index,
  onIndexChange,
  onClose,
}: CertificateLightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [failedImage, setFailedImage] = useState<string | null>(null)

  const cert = certificates[index]
  const total = certificates.length
  const imageMissing = failedImage === cert.image
  const meta = [cert.issuer, cert.date].filter(Boolean).join(' · ')

  const latest = useRef({ index, total, onIndexChange, onClose })
  latest.current = { index, total, onIndexChange, onClose }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      const { index, total, onIndexChange, onClose } = latest.current
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onIndexChange((index + 1) % total)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onIndexChange((index - 1 + total) % total)
      } else if (e.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const go = (step: number) => onIndexChange((index + step + total) % total)

  // Portaled to body: the reveal Section's transform would otherwise trap position: fixed.
  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        className="lightbox-panel glass"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="lightbox-header">
          <div className="lightbox-meta">
            <h3 id="lightbox-title" className="lightbox-title">
              {cert.title}
            </h3>
            <p className="lightbox-sub">{meta}</p>
            {cert.credentialId && (
              <p className="lightbox-sub">Credential ID: {cert.credentialId}</p>
            )}
          </div>
          <div className="lightbox-actions">
            <span className="lightbox-counter" aria-live="polite">
              {index + 1} / {total}
            </span>
            {!imageMissing && (
              <Button
                size="small"
                onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
              >
                {'Open full image ↗'}
              </Button>
            )}
            <button
              ref={closeRef}
              type="button"
              className="lightbox-close"
              onClick={onClose}
              aria-label="Close certificate preview"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="lightbox-body">
          <button
            type="button"
            className="lightbox-arrow lightbox-arrow-prev glass"
            onClick={() => go(-1)}
            aria-label="Previous certificate"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <div className="lightbox-stage">
            {imageMissing ? (
              <p className="lightbox-missing">Certificate image coming soon.</p>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={cert.image}
                src={cert.image}
                alt={`${cert.title} certificate issued by ${cert.issuer}`}
                className="lightbox-img"
                onError={() => setFailedImage(cert.image)}
              />
            )}
          </div>

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow-next glass"
            onClick={() => go(1)}
            aria-label="Next certificate"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
