'use client'

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'

const MAX_TILT = 8

type SkillCardProps = {
  index: number
  title: string
  icon: ReactNode
  skills: { name: string; familiar?: boolean }[]
}

function canTilt() {
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function SkillCard({ index, title, icon, skills }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = `skill-cat-${index}`

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = ref.current
    if (!card || !canTilt()) return
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * 2 * MAX_TILT
    const rotateX = (0.5 - y) * 2 * MAX_TILT
    card.classList.add('is-tilting')
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-10px)`
    card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
  }

  const handleLeave = () => {
    const card = ref.current
    if (!card) return
    card.classList.remove('is-tilting')
    card.style.transform = ''
    card.style.removeProperty('--mx')
    card.style.removeProperty('--my')
  }

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="group"
      aria-labelledby={titleId}
      className="skill-card glass"
      style={{ '--i': index } as CSSProperties}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="skill-card-head">
        <span className="skill-card-icon">{icon}</span>
        <h3 id={titleId} className="skill-card-title">
          {title}
        </h3>
      </div>
      <ul className="skill-chips">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className={skill.familiar ? 'skill-chip is-familiar' : 'skill-chip'}
            title={skill.familiar ? 'familiar' : undefined}
            aria-label={skill.familiar ? `${skill.name}, familiar` : undefined}
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
