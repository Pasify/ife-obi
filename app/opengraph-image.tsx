import { ImageResponse } from 'next/og'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

export const alt = `${SITE_NAME} — Full-Stack Software Developer`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#0a192f',
          color: '#ccd6f6',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, color: '#64ffda', marginBottom: 24 }}>Hi, my name is</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#8892b0', marginTop: 12 }}>
          I build full-stack products.
        </div>
        <div style={{ fontSize: 28, color: '#8892b0', marginTop: 36, maxWidth: 900 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    size,
  )
}
