'use client'

import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Expandable } from '@/hooks/use-expandable'

type Variant = 'inline' | 'block' | 'list'

type ExpandToggleProps = {
  state: Expandable
  variant?: Variant
  moreLabel?: string
  lessLabel?: string
  /** Visible counter under block toggles, e.g. "Showing 6 of 7". */
  showCounter?: boolean
  className?: string
}

export function ExpandToggle({
  state,
  variant = 'block',
  moreLabel = 'Show more',
  lessLabel = 'Show less',
  showCounter = false,
  className,
}: ExpandToggleProps) {
  const { expanded, regionId, buttonRef, toggle, shown, total } = state

  const button = (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={expanded}
      aria-controls={regionId}
      onClick={toggle}
      data-expanded={expanded}
      className={cn(
        variant === 'inline' && 'about-more expand-inline',
        variant === 'block' && 'btn btn-big expand-block',
        variant === 'list' && 'expand-list',
        className,
      )}
    >
      <span className="expand-label">
        <span aria-hidden={expanded}>{moreLabel}</span>
        <span aria-hidden={!expanded}>{lessLabel}</span>
      </span>
      {variant !== 'inline' && <ChevronDown size={16} aria-hidden="true" className="expand-chevron" />}
    </button>
  )

  if (variant !== 'block') return button

  return (
    <div className="expand-block-wrap">
      {button}
      {showCounter && (
        <p className="expand-counter" aria-hidden="true">
          Showing {shown} of {total}
        </p>
      )}
    </div>
  )
}

/** Animated container for the content an ExpandToggle reveals. */
export function ExpandRegion({
  state,
  children,
  className,
  as: Tag = 'div',
}: {
  state: Expandable
  children: ReactNode
  className?: string
  as?: 'div'
}) {
  return (
    <Tag
      id={state.regionId}
      ref={state.regionRef}
      className="expand-region"
      data-open={state.open}
      inert={!state.open}
    >
      <div className={cn('expand-region-inner', className)}>{children}</div>
    </Tag>
  )
}

export function ExpandAnnouncer({ message }: { message: string }) {
  return (
    <span className="sr-only" aria-live="polite" role="status">
      {message}
    </span>
  )
}
