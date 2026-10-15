'use client'

import { useEffect, useRef, useState, type MouseEvent, type Ref } from 'react'
import Image from 'next/image'
import { Award, Eye } from 'lucide-react'
import type { Certificate } from '@/data/certificates'
import { cn } from '@/lib/utils'

type CertificateCardProps = {
  certificate: Certificate
  onOpen: () => void
  ref?: Ref<HTMLButtonElement>
}

const MAX_TILT = 6

function canTilt() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function CertificateCard({ certificate, onOpen, ref }: CertificateCardProps) {
  const { title, issuer, date, image } = certificate
  const imgRef = useRef<HTMLImageElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [imageReady, setImageReady] = useState(false)

  // The image can finish loading (or failing) before hydration attaches onLoad/onError.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) setImageReady(true)
  }, [])

  const handleEnter = (e: MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget
    const info = infoRef.current
    if (!info) return
    const padding = 30
    const drop = card.clientHeight - padding - (info.offsetTop + info.offsetHeight)
    card.style.setProperty('--cert-drop', `${Math.max(0, drop)}px`)
  }

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!canTilt()) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--cert-ry', `${(x * 2 * MAX_TILT).toFixed(2)}deg`)
    card.style.setProperty('--cert-rx', `${(-y * 2 * MAX_TILT).toFixed(2)}deg`)
  }

  const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty('--cert-rx', '0deg')
    e.currentTarget.style.setProperty('--cert-ry', '0deg')
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn('cert-card glass', imageReady && 'has-image')}
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={`View certificate: ${title}, ${issuer}`}
    >
      <span className="cert-reveal" aria-hidden="true">
        <Image
          ref={imgRef}
          src={image}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="cert-reveal-img"
          onLoad={() => setImageReady(true)}
          onError={() => setImageReady(false)}
        />
        <span className="cert-reveal-wash" />
        <span className="cert-reveal-shade" />
      </span>
      <span className="cert-sweep" aria-hidden="true" />
      <span className="cert-view-chip" aria-hidden="true">
        {'VIEW ↗'}
      </span>

      <span className="cert-content">
        <span className="cert-top">
          <Award className="cert-icon" size={35} strokeWidth={1.5} aria-hidden="true" />
          {date && <span className="cert-date">{date}</span>}
        </span>
        <div ref={infoRef} className="cert-info">
          <span className="cert-title">{title}</span>
          <span className="cert-issuer">{issuer}</span>
          {date && <span className="cert-info-date">{date}</span>}
        </div>
        <span className="cert-hint">
          <Eye size={14} aria-hidden="true" />
          <span className="cert-hint-fine">Hover to preview</span>
          <span className="cert-hint-touch">Tap to view</span>
        </span>
      </span>
    </button>
  )
}
