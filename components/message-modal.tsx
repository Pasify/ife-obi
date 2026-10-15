'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/button'

export function MessageModal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const okRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    okRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  // Portaled to body: the reveal Section's transform would otherwise trap position: fixed.
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-modal-text"
        className="modal-box glass"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="message-modal-text">{children}</p>
        <Button ref={okRef} size="big" onClick={onClose}>
          Ok
        </Button>
      </div>
    </div>,
    document.body,
  )
}
