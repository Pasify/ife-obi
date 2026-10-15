'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Download, ExternalLink, FileText, X } from 'lucide-react'

const RESUME_PATH = '/Ifesinachi_Obiora_Resume.pdf'
const RESUME_FILENAME = 'Ifesinachi_Obiora_Resume.pdf'
const VIEWER_SRC = `${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH`

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

type FileStatus = 'checking' | 'ok' | 'missing'

function cannotEmbedPdf() {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  return isIOS || window.matchMedia('(max-width: 768px)').matches
}

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [noEmbed] = useState(cannotEmbedPdf)
  const [fileStatus, setFileStatus] = useState<FileStatus>('checking')
  const [frameFailed, setFrameFailed] = useState(false)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  // A missing static file comes back as an HTML 404 page, which the iframe would happily render.
  useEffect(() => {
    const controller = new AbortController()
    fetch(RESUME_PATH, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const isPdf = res.ok && (res.headers.get('content-type') ?? '').includes('pdf')
        setFileStatus(isPdf ? 'ok' : 'missing')
      })
      .catch(() => {
        if (!controller.signal.aborted) setFileStatus('missing')
      })
    return () => controller.abort()
  }, [])

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null,
    )
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const missing = fileStatus === 'missing'
  const showFallback = missing || frameFailed || noEmbed
  const showFrame = fileStatus === 'ok' && !showFallback

  // Portaled to body: the reveal Section's transform would otherwise trap position: fixed.
  return createPortal(
    <div className="resume-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="resume-panel glass"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
      >
        <header className="resume-header">
          <div className="resume-heading">
            <FileText size={22} aria-hidden="true" className="resume-heading-icon" />
            <h2 id="resume-title" className="resume-title">
              {'Resume — Ifesinachi Obiora'}
            </h2>
          </div>
          <div className="resume-actions">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              data-variant="outline"
              className="btn btn-small resume-action"
            >
              <Download size={15} aria-hidden="true" />
              Download
            </a>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              data-variant="outline"
              className="btn btn-small resume-action resume-action-newtab"
            >
              <ExternalLink size={15} aria-hidden="true" />
              Open in new tab
            </a>
            <button
              ref={closeRef}
              type="button"
              className="resume-close"
              aria-label="Close resume"
              onClick={onClose}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="resume-body">
          {showFrame && (
            <iframe
              src={VIEWER_SRC}
              title="Resume PDF"
              className="resume-frame"
              onError={() => setFrameFailed(true)}
            />
          )}
          {showFallback && (
            <div className="resume-fallback" role="status">
              <FileText size={40} aria-hidden="true" className="resume-fallback-icon" />
              <p className="resume-fallback-text">{"Your browser can't preview PDFs here."}</p>
              {missing && <p className="resume-fallback-note">Resume file not found.</p>}
              <div className="resume-fallback-actions">
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-variant="outline"
                  className="btn btn-big resume-action"
                >
                  <ExternalLink size={18} aria-hidden="true" />
                  Open resume
                </a>
                <a
                  href={RESUME_PATH}
                  download={RESUME_FILENAME}
                  data-variant="outline"
                  className="btn btn-big resume-action"
                >
                  <Download size={18} aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
