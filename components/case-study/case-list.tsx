'use client'

import { ExpandAnnouncer, ExpandRegion, ExpandToggle } from '@/components/expand-toggle'
import { useExpandable } from '@/hooks/use-expandable'

const INITIAL = 4

export function CaseList({ items, noun }: { items: string[]; noun: string }) {
  const expandable = useExpandable({
    initial: INITIAL,
    total: items.length,
    describe: (shown, total) => `Showing ${shown} of ${total} ${noun}`,
  })
  const { anchorRef, rendered, canToggle, itemStyle, announcement } = expandable

  return (
    <div ref={anchorRef as React.RefObject<HTMLDivElement>}>
      <ul className="cs-list">
        {items.slice(0, INITIAL).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {canToggle && (
        <>
          <ExpandRegion state={expandable}>
            <ul className="cs-list">
              {items.slice(INITIAL, rendered).map((item, i) => (
                <li key={item} className="expand-item" style={itemStyle(INITIAL + i)}>
                  {item}
                </li>
              ))}
            </ul>
          </ExpandRegion>
          <ExpandToggle state={expandable} variant="list" />
          <ExpandAnnouncer message={announcement} />
        </>
      )}
    </div>
  )
}
