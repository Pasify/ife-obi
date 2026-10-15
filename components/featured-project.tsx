import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/github-icon'
import type { FeaturedProject } from '@/data/projects'

type Props = {
  project: FeaturedProject
  side: 'right' | 'left'
  hasImage: boolean
}

export function FeaturedProjectRow({ project, side, hasImage }: Props) {
  const { title, live, github, image, tools, description } = project

  return (
    <li className="featured" data-side={side}>
      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className="featured-media"
        aria-label={`${title} live site`}
        tabIndex={-1}
      >
        {hasImage ? (
          <Image
            src={image}
            alt={`Screenshot of ${title}`}
            width={1600}
            height={1000}
            sizes="(max-width: 900px) 100vw, 600px"
            className="featured-img"
          />
        ) : (
          <span className="featured-placeholder">{title}</span>
        )}
      </a>

      <div className="featured-text">
        <h3>
          <a href={live} target="_blank" rel="noopener noreferrer" className="featured-title">
            {title}
          </a>
        </h3>
        <div className="featured-desc glass">
          <p>{description}</p>
        </div>
        <ul className="featured-tools" aria-label={`${title} tools`}>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <div className="featured-links">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} on GitHub`}
              className="project-icon-link"
            >
              <GithubIcon size={23} />
            </a>
          )}
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} live site`}
            className="project-icon-link"
          >
            <ExternalLink size={23} aria-hidden="true" />
          </a>
        </div>
      </div>
    </li>
  )
}
