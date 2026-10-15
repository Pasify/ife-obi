'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'

type Job = {
  tab: string
  role: string
  company: string
  url?: string
  duration: string
  points: ReactNode[]
}

const jobs: Job[] = [
  {
    tab: 'One Sky Collective',
    role: 'Front End React Native Developer (Volunteer)',
    company: 'One Sky Collective',
    duration: 'May 2025 – Present',
    points: [
      'Built modular React Native/TypeScript screens from Figma wireframes, matching designs pixel-for-pixel across iOS and Android.',
      'Integrated public APIs and reusable cross-platform components supporting multi-screen navigation.',
      'Improved accessibility with tab navigation and screen reader labels.',
    ],
  },
  {
    tab: 'Kogniti',
    role: 'Technical Founder & Software Developer',
    company: 'Kogniti (Freelancer)',
    url: 'http://akada-ng.com',
    duration: 'Aug 2024 – Present',
    points: [
      'Led frontend design and delivery for 3+ web and mobile products, from discovery through launch.',
      <>
        Built{' '}
        <a href="http://akada-ng.com" target="_blank" rel="noopener noreferrer">
          Akada-ng
        </a>
        , an ed-tech loan platform for teachers, improving user satisfaction by 30%.
      </>,
      'Translated direct debit and repayment workflows into clear, step-by-step user journeys.',
    ],
  },
  {
    tab: 'Agunwami',
    role: 'Frontend Developer',
    company: 'Agunwami Enterprise (Part-time, Remote)',
    duration: 'Jan 2024 – Aug 2024',
    points: [
      'Designed responsive UI for Shop-Agu, a cross-platform e-commerce app serving 100+ users.',
      'Reduced page load times by 25% by integrating RESTful APIs into scalable frontend components.',
      'Led frontend development for a school management dashboard with role-based access for admins, teachers, and students.',
    ],
  },
  {
    tab: 'Speak Out Africa',
    role: 'Volunteer Frontend Developer & Team Lead',
    company: 'Speak Out Africa for Children',
    url: 'https://www.speakoutforchildren.org/',
    duration: 'Feb 2023 – Jul 2023',
    points: [
      <>
        Built a{' '}
        <a href="https://www.speakoutforchildren.org/" target="_blank" rel="noopener noreferrer">
          responsive website
        </a>{' '}
        serving 100+ users, improving access to educational resources.
      </>,
      'Improved user engagement by 15% through accurate UX/UI implementation.',
      'Led a team of 5 developers, delivering all project deliverables on schedule.',
    ],
  },
]

export function Experience() {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const focusTab = (index: number) => {
    const next = (index + jobs.length) % jobs.length
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') focusTab(selected + 1)
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') focusTab(selected - 1)
    else if (e.key === 'Home') focusTab(0)
    else if (e.key === 'End') focusTab(jobs.length - 1)
    else return
    e.preventDefault()
  }

  const job = jobs[selected]
  return (
    <Section id="exp" aria-labelledby="heading-exp" className="exp">
      <SectionHeading num="03" title="Where I've worked" id="heading-exp" />
      <div className="exp-body">
        <div
          role="tablist"
          aria-label="Workplaces"
          aria-orientation="vertical"
          className="exp-tabs"
          onKeyDown={onKeyDown}
        >
          {jobs.map((item, i) => (
            <button
              key={item.tab}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`exp-tab-${i}`}
              aria-selected={selected === i}
              aria-controls={`exp-panel-${i}`}
              tabIndex={selected === i ? 0 : -1}
              className="exp-tab"
              onClick={() => setSelected(i)}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div
          key={selected}
          role="tabpanel"
          id={`exp-panel-${selected}`}
          aria-labelledby={`exp-tab-${selected}`}
          tabIndex={0}
          className="exp-panel"
        >
          <h3 className="exp-title">
            {job.role}{' '}
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                @ {job.company}
              </a>
            ) : (
              <span className="exp-company">@ {job.company}</span>
            )}
          </h3>
          <p className="exp-duration">{job.duration}</p>
          <ul className="exp-points">
            {job.points.map((point, i) => (
              <li key={i}>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
