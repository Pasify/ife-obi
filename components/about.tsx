'use client'

import { ExpandAnnouncer, ExpandRegion, ExpandToggle } from '@/components/expand-toggle'
import { useExpandable } from '@/hooks/use-expandable'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { ProfilePhoto } from '@/components/profile-photo'
import { ResultsStrip } from '@/components/results-strip'

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
  const expandable = useExpandable({
    initial: 1,
    total: 3,
    describe: (shown, total) => `Showing ${shown} of ${total} paragraphs`,
  })
  const { expanded } = expandable
  const toggle = (
    <>
      {' '}
      <ExpandToggle state={expandable} variant="inline" moreLabel="see more" lessLabel="see less" />
    </>
  )

  return (
    <Section id="about" aria-labelledby="heading-about" className="about">
      <SectionHeading num="01" title="About me" id="heading-about" />
      <div className="about-grid">
        <div className="about-text">
          <p ref={expandable.anchorRef as React.RefObject<HTMLParagraphElement>}>
            As a full-stack developer, I turn product ideas into fast, reliable web and mobile
            experiences. I specialise in React and React Native on the front end, backed by Node.js
            and SQL/NoSQL data layers, and I have delivered production platforms for fintech,
            ed-tech and e-commerce clients, from discovery through launch.
            {!expanded && toggle}
          </p>
          <ExpandRegion state={expandable} className="about-text">
            <p className="expand-item">
              I recently completed an MSc in Computer Science (Commendation) at Northumbria
              University in Newcastle upon Tyne. My dissertation focused on explainable,
              uncertainty-aware, AI-based ransomware detection, using conformal prediction, SHAP,
              Random Forest and a CNN with Monte Carlo Dropout. Alongside it I completed eight
              end-to-end machine learning projects through WorldQuant University&apos;s Applied Data
              Science Lab.
            </p>
            <p className="expand-item" style={{ animationDelay: '0.08s' }}>
              I&apos;m also a team player and a leader. I have led a team of five developers to
              deliver on schedule, collaborated closely with designers to match Figma designs pixel
              for pixel, and I care about accessibility and clean, maintainable code.
              {expanded && toggle}
            </p>
          </ExpandRegion>
          <ExpandAnnouncer message={expandable.announcement} />
          <p>Here are some technologies I have been working with:</p>
          <ul className="about-tech">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <ProfilePhoto />
      </div>
      <ResultsStrip />
    </Section>
  )
}
