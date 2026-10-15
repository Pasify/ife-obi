'use client'

import { useCallback, useRef, useState } from 'react'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { CertificateCard } from '@/components/certificate-card'
import { CertificateLightbox } from '@/components/certificate-lightbox'
import { certificates } from '@/data/certificates'

export function Certificates() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) cardRefs.current[current]?.focus()
      return null
    })
  }, [])

  return (
    <Section id="certificates" aria-labelledby="heading-certificates" className="certs">
      <SectionHeading num="04" title="Certifications" id="heading-certificates" />
      <p className="certs-intro">Verified training behind the work.</p>
      <ul className="certs-grid">
        {certificates.map((cert, i) => (
          <li key={cert.image}>
            <CertificateCard
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              certificate={cert}
              onOpen={() => setOpenIndex(i)}
            />
          </li>
        ))}
      </ul>
      {openIndex !== null && (
        <CertificateLightbox
          certificates={certificates}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={close}
        />
      )}
    </Section>
  )
}
