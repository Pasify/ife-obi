'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExpandAnnouncer, ExpandRegion, ExpandToggle } from '@/components/expand-toggle'
import { ImageLightbox } from '@/components/case-study/image-lightbox'
import { useExpandable } from '@/hooks/use-expandable'

const INITIAL = 4

export function CaseGallery({ images, title }: { images: string[]; title: string }) {
  const [openSrc, setOpenSrc] = useState<string | null>(null)
  const expandable = useExpandable({
    initial: INITIAL,
    total: images.length,
    describe: (shown, total) => `Showing ${shown} of ${total} images`,
  })
  const { anchorRef, rendered, canToggle, itemStyle, announcement } = expandable

  const tile = (src: string, index: number, animate = false) => (
    <li
      key={src}
      className={animate ? 'expand-item' : undefined}
      style={animate ? itemStyle(index) : undefined}
    >
      <button
        type="button"
        className="cs-tile"
        aria-haspopup="dialog"
        aria-label={`Enlarge ${title} image ${index + 1}`}
        onClick={() => setOpenSrc(src)}
      >
        <Image src={src} alt="" fill sizes="(max-width: 600px) 100vw, 420px" />
      </button>
    </li>
  )

  return (
    <div ref={anchorRef as React.RefObject<HTMLDivElement>}>
      <ul className="cs-gallery">{images.slice(0, INITIAL).map((src, i) => tile(src, i))}</ul>
      {canToggle && (
        <>
          <ExpandRegion state={expandable}>
            <ul className="cs-gallery cs-gallery-more">
              {images.slice(INITIAL, rendered).map((src, i) => tile(src, INITIAL + i, true))}
            </ul>
          </ExpandRegion>
          <ExpandToggle state={expandable} showCounter />
          <ExpandAnnouncer message={announcement} />
        </>
      )}
      {openSrc && (
        <ImageLightbox src={openSrc} title={title} onClose={() => setOpenSrc(null)} />
      )}
    </div>
  )
}
