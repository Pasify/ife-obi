'use client'

import type { CSSProperties } from 'react'
import { ExternalLink, FolderOpen } from 'lucide-react'
import { GithubIcon } from '@/components/github-icon'
import { ExpandAnnouncer, ExpandRegion, ExpandToggle } from '@/components/expand-toggle'
import { useExpandable } from '@/hooks/use-expandable'
import type { OtherProject } from '@/data/projects'

const STEP = 3

export function OtherProjects({ projects }: { projects: OtherProject[] }) {
  const expandable = useExpandable({
    initial: STEP,
    total: projects.length,
    step: STEP,
    describe: (shown, total) => `Showing ${shown} of ${total} projects`,
  })
  const { anchorRef, rendered, canToggle, itemStyle, announcement } = expandable

  return (
    <div className="other-projects">
      <h3 ref={anchorRef as React.RefObject<HTMLHeadingElement>} className="other-heading">
        Other Projects
      </h3>

      <ul className="other-grid">
        {projects.slice(0, STEP).map((project) => (
          <OtherProjectCard key={project.title} project={project} />
        ))}
      </ul>

      {canToggle && (
        <>
          <ExpandRegion state={expandable}>
            <ul className="other-grid other-grid-more">
              {projects.slice(STEP, rendered).map((project, i) => (
                <OtherProjectCard
                  key={project.title}
                  project={project}
                  animate
                  style={itemStyle(STEP + i)}
                />
              ))}
            </ul>
          </ExpandRegion>
          <ExpandToggle state={expandable} showCounter />
          <ExpandAnnouncer message={announcement} />
        </>
      )}
    </div>
  )
}

function OtherProjectCard({
  project,
  animate = false,
  style,
}: {
  project: OtherProject
  animate?: boolean
  style?: CSSProperties
}) {
  const { title, live, github, tools, description } = project
  const primaryUrl = live ?? github

  const openPrimary = () => {
    if (primaryUrl) window.open(primaryUrl, '_blank', 'noopener,noreferrer')
  }
  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <li
      className={animate ? 'other-card expand-item' : 'other-card'}
      style={style}
      onClick={openPrimary}
    >
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
