'use client'

import { useCallback, useId, useRef, useState, type CSSProperties } from 'react'

const COLLAPSE_MS = 400
const NAV_OFFSET = 100
const STAGGER_S = 0.08

type Options = {
  /** Items visible while collapsed. */
  initial: number
  /** Total number of items that can be revealed. */
  total: number
  /** Items revealed per click. Defaults to revealing everything at once. */
  step?: number
  /** Builds the screen-reader announcement for a given visible count. */
  describe?: (shown: number, total: number) => string
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useExpandable({ initial, total, step = total, describe }: Options) {
  const regionId = useId()
  const [rendered, setRendered] = useState(initial)
  const [open, setOpen] = useState(false)
  const [batchStart, setBatchStart] = useState(initial)
  const [announcement, setAnnouncement] = useState('')

  const regionRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseTimer = useRef<number>(undefined)

  const shown = open ? rendered : initial
  const expanded = shown >= total
  const canToggle = total > initial

  const keepFocus = () => {
    requestAnimationFrame(() => buttonRef.current?.focus({ preventScroll: true }))
  }

  const announce = (count: number) => {
    if (describe) setAnnouncement(describe(count, total))
  }

  const toggle = useCallback(() => {
    window.clearTimeout(collapseTimer.current)

    if (expanded) {
      const region = regionRef.current
      const anchor = anchorRef.current ?? region
      const strandsReader =
        !!region &&
        !!anchor &&
        (region.getBoundingClientRect().top < 0 || anchor.getBoundingClientRect().top < 0)
      if (anchor && strandsReader) {
        const top = anchor.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
      setOpen(false)
      announce(initial)
      collapseTimer.current = window.setTimeout(
        () => {
          setRendered(initial)
          setBatchStart(initial)
        },
        prefersReducedMotion() ? 0 : COLLAPSE_MS,
      )
    } else {
      const from = open ? rendered : initial
      const next = Math.min(from + step, total)
      setBatchStart(from)
      setRendered(next)
      setOpen(true)
      announce(next)
    }
    keepFocus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, open, rendered, initial, step, total])

  /** Stagger delay for a newly revealed item at `index`. */
  const itemStyle = (index: number): CSSProperties | undefined =>
    index >= batchStart ? { animationDelay: `${(index - batchStart) * STAGGER_S}s` } : undefined

  return {
    regionId,
    regionRef,
    anchorRef,
    buttonRef,
    open,
    expanded,
    canToggle,
    /** Count to render inside the region (stays high while collapsing). */
    rendered,
    /** Count the reader will see once any transition settles. */
    shown,
    total,
    announcement,
    toggle,
    itemStyle,
  }
}

export type Expandable = ReturnType<typeof useExpandable>
