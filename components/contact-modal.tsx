'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Check, Loader2, Send, X } from 'lucide-react'
import { Button } from '@/components/button'
import { cn } from '@/lib/utils'

const EMAIL = 'ife.obi61@gmail.com'
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '[[FORMSPREE_FORM_ID]]'
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`

type FieldName = 'name' | 'email' | 'subject' | 'message'
type Values = Record<FieldName, string>
type Status = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: Values = { name: '', email: '', subject: '', message: '' }
const FIELDS: FieldName[] = ['name', 'email', 'subject', 'message']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  if (!values.message.trim()) errors.message = 'Please write a message.'
  return errors
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ContactModal({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const submittingRef = useRef(false)
  const [values, setValues] = useState<Values>(EMPTY)
  const [gotcha, setGotcha] = useState('')
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const errors = validate(values)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('input[name="name"]')?.focus()

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

  useEffect(() => {
    if (status === 'success') panelRef.current?.querySelector<HTMLElement>('.contact-success button')?.focus()
  }, [status])

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (nodes.length === 0) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const update = (field: FieldName, value: string) => setValues((v) => ({ ...v, [field]: value }))
  const touch = (field: FieldName) => setTouched((t) => ({ ...t, [field]: true }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submittingRef.current) return

    if (Object.keys(errors).length > 0) {
      setTouched({ name: true, email: true, subject: true, message: true })
      const firstInvalid = FIELDS.find((f) => errors[f])
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    submittingRef.current = true
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          _gotcha: gotcha,
        }),
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      setValues(EMPTY)
      setTouched({})
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submittingRef.current = false
    }
  }

  const sending = status === 'sending'

  const fieldError = (field: FieldName) =>
    touched[field] && errors[field] ? (
      <p id={`contact-${field}-error`} className="contact-error">
        {errors[field]}
      </p>
    ) : null

  const fieldProps = (field: FieldName) => {
    const invalid = Boolean(touched[field] && errors[field])
    return {
      id: `contact-${field}`,
      name: field,
      required: true,
      value: values[field],
      onChange: (e: { target: { value: string } }) => update(field, e.target.value),
      onBlur: () => touch(field),
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `contact-${field}-error` : undefined,
      className: cn('contact-input', invalid && 'is-invalid'),
    }
  }

  // Portaled to body: the reveal Section's transform would otherwise trap position: fixed.
  return createPortal(
    <div className="contact-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="contact-panel glass"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
      >
        <button type="button" className="contact-close" aria-label="Close contact form" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>

        {status === 'success' ? (
          <div className="contact-success" role="status">
            <span className="contact-success-icon">
              <Check size={28} aria-hidden="true" />
            </span>
            <h2 id="contact-title" className="contact-success-title">
              Message sent!
            </h2>
            <p className="contact-subtitle">{"Thanks for reaching out. I'll get back to you soon."}</p>
            <Button size="big" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <header className="contact-header">
              <h2 id="contact-title" className="contact-title">
                {'Drop me a line 👋'}
              </h2>
              <p className="contact-subtitle">I usually reply within a day.</p>
            </header>

            <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">
                  Name
                </label>
                <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                {fieldError('name')}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-label">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...fieldProps('email')}
                />
                {fieldError('email')}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-subject" className="contact-label">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project inquiry / Opportunity"
                  {...fieldProps('subject')}
                />
                {fieldError('subject')}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-label">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me a bit about what you have in mind..."
                  {...fieldProps('message')}
                  className={cn(fieldProps('message').className, 'contact-textarea')}
                />
                {fieldError('message')}
              </div>

              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="contact-honeypot"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
              />

              {status === 'error' && (
                <p className="contact-notice" role="alert">
                  Something went wrong. Please try again or email me directly at{' '}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              )}

              <Button type="submit" size="big" className="contact-submit" disabled={sending}>
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    {'Sending…'}
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send message
                  </>
                )}
              </Button>

              <p className="contact-footnote">
                Replying to me? Just hit reply: your email is saved as the reply-to.
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
