'use client'

import { useEffect, useState, type MouseEvent } from 'react'

export type TocItem = { id: string; label: string }

export function CaseToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  return (
    <nav className="cs-toc" aria-labelledby="cs-toc-label">
      <p id="cs-toc-label" className="cs-toc-label">
        ON THIS PAGE
      </p>
      <ul>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              data-active={active === id}
              aria-current={active === id ? 'location' : undefined}
              onClick={(e) => jump(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
