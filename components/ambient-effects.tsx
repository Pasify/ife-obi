'use client'

import dynamic from 'next/dynamic'

const Particles = dynamic(() => import('@/components/particles').then((m) => m.Particles), {
  ssr: false,
})
const Cursor = dynamic(() => import('@/components/cursor').then((m) => m.Cursor), { ssr: false })

export function AmbientEffects() {
  return (
    <>
      <Particles />
      <Cursor />
    </>
  )
}
