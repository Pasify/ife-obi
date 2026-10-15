'use client'

import { useState } from 'react'
import { ExternalLink, FolderOpen } from 'lucide-react'
import { Button } from '@/components/button'
import { GithubIcon } from '@/components/github-icon'
import { MessageModal } from '@/components/message-modal'
import type { OtherProject } from '@/data/projects'

const STEP = 3

export function OtherProjects({ projects }: { projects: OtherProject[] }) {
  const [count, setCount] = useState(STEP)
  const [modalOpen, setModalOpen] = useState(false)
  const [exhausted, setExhausted] = useState(false)

  const handleShowMore = () => {
    if (count < projects.length) {
      setCount((c) => Math.min(c + STEP, projects.length))
    } else {
      setModalOpen(true)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setExhausted(true)
  }

  return (
    <div className="other-projects">
      <h3 className="other-heading">Other Projects</h3>

      <ul className="other-grid">
        {projects.slice(0, count).map((project, i) => (
          <OtherProjectCard key={project.title} project={project} animate={i >= STEP} />
        ))}
      </ul>

      {!exhausted && (
        <div className="flex justify-center">
          <Button size="big" onClick={handleShowMore}>
            Show more
          </Button>
        </div>
      )}

      {modalOpen && (
        <MessageModal onClose={closeModal}>
          {"Oops! That's all the projects I have for now. More projects coming soon! 👨🏼‍💻😉"}
        </MessageModal>
      )}
    </div>
  )
}

function OtherProjectCard({ project, animate }: { project: OtherProject; animate: boolean }) {
  const { title, live, github, tools, description } = project
  const primaryUrl = live ?? github

  const openPrimary = () => {
    if (primaryUrl) window.open(primaryUrl, '_blank', 'noopener,noreferrer')
  }
  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <li className={animate ? 'other-card about-appear' : 'other-card'} onClick={openPrimary}>
      <div className="other-card-body glass">
        <div className="flex items-center justify-between">
          <FolderOpen size={35} className="text-cyan" aria-hidden="true" />
          <div className="flex items-center gap-[25px]">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} on GitHub`}
                className="project-icon-link"
                onClick={stop}
              >
                <GithubIcon size={23} />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live site`}
                className="project-icon-link"
                onClick={stop}
              >
                <ExternalLink size={23} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="other-title">
            {primaryUrl ? (
              <a href={primaryUrl} target="_blank" rel="noopener noreferrer" onClick={stop}>
                {title}
              </a>
            ) : (
              title
            )}
          </h4>
          <p className="other-desc">{description}</p>
        </div>

        <p className="other-tools">
          {tools.map((tool, i) => (
            <span key={tool}>
              {tool}
              {i < tools.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </li>
  )
}
