'use client'

import { useState } from 'react'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { ProfilePhoto } from '@/components/profile-photo'

const technologies = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Next.js',
  'React Native',
  'Node.js',
  'PostgreSQL & MongoDB',
  'Git & GitHub',
]

export function About() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Section id="about" aria-labelledby="heading-about" className="about">
      <SectionHeading num="01" title="About me" id="heading-about" />
      <div className="about-grid">
        <div className="about-text">
          <p>
            As a full-stack developer, I turn product ideas into fast, reliable web and mobile
            experiences. I specialise in React and React Native on the front end, backed by Node.js
            and SQL/NoSQL data layers, and I have delivered production platforms for fintech,
            ed-tech and e-commerce clients, from discovery through launch.{' '}
            {!expanded && (
              <button
                type="button"
                className="about-more"
                aria-expanded={expanded}
                aria-controls="about-more-content"
                onClick={() => setExpanded(true)}
              >
                see more
              </button>
            )}
          </p>
          <div id="about-more-content" className="about-text" hidden={!expanded}>
            {expanded && (
              <>
                <p className="about-appear">
                  I recently completed an MSc in Computer Science (Commendation) at Northumbria
                  University in Newcastle upon Tyne. My dissertation focused on explainable,
                  uncertainty-aware, AI-based ransomware detection, using conformal prediction,
                  SHAP, Random Forest and a CNN with Monte Carlo Dropout. Alongside it I completed
                  eight end-to-end machine learning projects through WorldQuant University&apos;s
                  Applied Data Science Lab.
                </p>
                <p className="about-appear">
                  I&apos;m also a team player and a leader. I have led a team of five developers to
                  deliver on schedule, collaborated closely with designers to match Figma designs
                  pixel for pixel, and I care about accessibility and clean, maintainable code.
                </p>
              </>
            )}
          </div>
          <p>Here are some technologies I have been working with:</p>
          <ul className="about-tech">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <ProfilePhoto />
      </div>
    </Section>
  )
}
