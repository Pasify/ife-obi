'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useContact } from '@/components/contact-context'
import { ResumeButton } from '@/components/resume-button'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV_LINKS = [
  { num: '01', label: 'About', id: 'about' },
  { num: '02', label: 'Skills', id: 'skills' },
  { num: '03', label: 'Experience', id: 'exp' },
  { num: '04', label: 'Certificates', id: 'certificates' },
  { num: '05', label: 'Work', id: 'works' },
  { num: '06', label: 'Contact', id: 'contact' },
] as const

const SCROLL_THRESHOLD = 40
const PANEL_ID = 'mobile-nav-panel'
const FOCUSABLE = 'a[href], button:not([disabled])'

export function Navbar() {
  const pathname = usePathname()
  const { openContact } = useContact()
  const [scrolled, setScrolled] = useState(false)
  const [observedId, setObservedId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const onProjectPage = pathname?.startsWith('/projects') ?? false
  const onHome = pathname === '/'
  const activeId = onProjectPage ? 'works' : onHome ? observedId : null

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const update = () => setScrolled(window.scrollY >= SCROLL_THRESHOLD)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!onHome) return
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setObservedId(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onHome])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const burger = burgerRef.current
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
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
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      burger?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1101px)')
    const close = () => desktop.matches && setMenuOpen(false)
    desktop.addEventListener('change', close)
    return () => desktop.removeEventListener('change', close)
  }, [])

  const handleLinkClick = (id: string) => {
    if (id === 'contact') openContact()
  }

  const mobilePanel = (
    <>
      <div
        className="mnav-overlay"
        data-open={menuOpen}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <div
        ref={panelRef}
        id={PANEL_ID}
        className="mnav-panel"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="mnav-list">
            {NAV_LINKS.map(({ num, label, id }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className="mnav-link"
                  data-active={activeId === id}
                  aria-current={activeId === id ? 'location' : undefined}
                  onClick={() => {
                    setMenuOpen(false)
                    handleLinkClick(id)
                  }}
                >
                  <span className="mnav-num">{num}</span>
                  {label}
                  {id === 'contact' && <span aria-hidden="true">{'↗'}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mnav-extra">
          <ResumeButton />
          <div className="mnav-contact">
            <a href="mailto:ife.obi61@gmail.com">ife.obi61@gmail.com</a>
            <a href="tel:+447881167685">07881167685</a>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <header className="site-nav" data-scrolled={scrolled}>
      <div className="site-nav-inner">
        <Link href="/" className="nav-logo" aria-label="Ifesinachi Obiora, home">
          <span className="nav-logo-mark">IO</span>
          <span className="nav-logo-dot" aria-hidden="true">
            .
          </span>
          <span className="nav-logo-label" aria-hidden="true">
            FULL-STACK DEV
          </span>
        </Link>

        <nav aria-label="Main" className="nav-pill">
          <ul className="nav-pill-list">
            {NAV_LINKS.map(({ num, label, id }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className={cn('nav-link', id === 'contact' && 'nav-link-contact')}
                  data-active={activeId === id}
                  aria-current={activeId === id ? 'location' : undefined}
                  onClick={() => handleLinkClick(id)}
                >
                  <span className="nav-num">{num}</span>
                  {label}
                  {id === 'contact' && <span aria-hidden="true">{'↗'}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-controls">
          <ResumeButton className="nav-resume" />
          <ThemeToggle />
          <button
            ref={burgerRef}
            type="button"
            className="nav-burger"
            aria-expanded={menuOpen}
            aria-controls={PANEL_ID}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-open={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      {mounted && createPortal(mobilePanel, document.body)}
    </header>
  )
}
