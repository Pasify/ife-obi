import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GithubIcon } from '@/components/github-icon'
import { Section } from '@/components/section'
import { CaseToc, type TocItem } from '@/components/case-study/case-toc'
import { CaseList } from '@/components/case-study/case-list'
import { CaseGallery } from '@/components/case-study/case-gallery'
import { StartConversation } from '@/components/case-study/start-conversation'
import { EmailRail, SocialRail } from '@/components/social-rail'
import { SiteFooter } from '@/components/site-footer'
import {
  allProjects,
  getAdjacentProjects,
  getProjectBySlug,
  getProjectStatus,
  isFeatured,
  type Project,
} from '@/data/projects'
import { publicFileExists } from '@/lib/public-file'
import { SITE_URL } from '@/lib/site'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return allProjects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project not found' }
  const title = `${project.title} — Case Study | Ifesinachi Obiora`
  const url = `${SITE_URL}/projects/${slug}`
  const image = publicFileExists(project.image) ? project.image : undefined
  return {
    title: { absolute: title },
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: project.description,
      ...(image && { images: [{ url: image, alt: `Screenshot of ${project.title}` }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      ...(image && { images: [image] }),
    },
  }
}

const METRIC = /\d.*[+%]|[+%].*\d/

const stagger = (step: number): CSSProperties => ({ animationDelay: `${step * 0.1}s` })

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const featured = isFeatured(slug)
  const heroImage = publicFileExists(project.image) ? project.image : null
  const gallery = (project.gallery ?? []).filter((src) => publicFileExists(src))
  const { previous, next } = getAdjacentProjects(slug)

  const sections: (TocItem & { body: ReactNode })[] = []
  if (project.problem) {
    sections.push({
      id: 'problem',
      label: 'The problem',
      body: <p className="cs-text">{project.problem}</p>,
    })
  }
  if (project.role) {
    sections.push({
      id: 'role',
      label: 'My role',
      body: (
        <>
          <p className="cs-text">{project.role}</p>
          {project.timeline && <p className="cs-text">{project.timeline}</p>}
        </>
      ),
    })
  }
  sections.push({
    id: 'stack',
    label: 'Tech stack',
    body: (
      <ul className="cs-chips" aria-label={`${project.title} tech stack`}>
        {project.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    ),
  })
  if (project.approach?.length) {
    sections.push({
      id: 'approach',
      label: 'Approach',
      body: <CaseList items={project.approach} noun="steps" />,
    })
  }
  if (project.outcome?.length) {
    sections.push({
      id: 'outcome',
      label: 'Outcome',
      body: (
        <ul className="cs-outcomes">
          {project.outcome.map((item) => (
            <li key={item} className="cs-outcome glass" data-metric={METRIC.test(item)}>
              {item}
            </li>
          ))}
        </ul>
      ),
    })
  }
  if (project.learned?.length) {
    sections.push({
      id: 'learned',
      label: 'What I learned',
      body: <CaseList items={project.learned} noun="lessons" />,
    })
  }
  if (gallery.length) {
    sections.push({
      id: 'gallery',
      label: 'Gallery',
      body: <CaseGallery images={gallery} title={project.title} />,
    })
  }

  const meta: { label: string; value: ReactNode }[] = []
  if (project.role) meta.push({ label: 'Role', value: project.role })
  if (project.timeline) meta.push({ label: 'Timeline', value: project.timeline })
  const status = getProjectStatus(project)
  meta.push({
    label: 'Status',
    value: (
      <>
        {status === 'Live' && <span className="cs-live-dot" aria-hidden="true" />}
        {status}
      </>
    ),
  })
  meta.push({ label: 'Stack', value: project.tools.slice(0, 3).join(' · ') })

  return (
    <>
      <main id="content" className="shell">
        <article className="cs">
          <Link href="/#works" className="cs-back cs-in" style={stagger(0)}>
            <span className="case-arrow" aria-hidden="true">
              {'←'}
            </span>
            Back to projects
          </Link>

          <header className="cs-in" style={stagger(1)}>
            <p className="cs-eyebrow">{featured ? 'Featured Project' : 'Project'}</p>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-lede">{project.description}</p>
            {(project.live || project.github) && (
              <div className="cs-actions">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-big w-auto gap-2 px-6"
                  >
                    Visit live site <span aria-hidden="true">{'↗'}</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-ghost"
                  >
                    <GithubIcon size={20} />
                    View source
                  </a>
                )}
              </div>
            )}
          </header>

          <dl className="cs-meta cs-in" style={stagger(2)}>
            {meta.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="cs-hero cs-in" style={stagger(3)}>
            {heroImage ? (
              <Image
                src={heroImage}
                alt={`Screenshot of ${project.title}`}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            ) : (
              <div className="cs-hero-placeholder">{project.title}</div>
            )}
          </div>

          <div className="cs-body">
            <CaseToc items={sections.map(({ id, label }) => ({ id, label }))} />
            <div className="cs-content">
              {sections.map(({ id, label, body }) => (
                <Section key={id} id={id} className="cs-section" aria-labelledby={`${id}-heading`}>
                  <h2 id={`${id}-heading`} className="cs-sublabel">
                    {label}
                  </h2>
                  {body}
                </Section>
              ))}
            </div>
          </div>

          <Section className="cs-adjacent" aria-label="More projects">
            <AdjacentCard project={previous} dir="previous" />
            <AdjacentCard project={next} dir="next" />
          </Section>

          <Section className="cs-closing" aria-labelledby="cs-closing-title">
            <p className="cs-closing-label">{'// work with me'}</p>
            <h2 id="cs-closing-title" className="cs-closing-title">
              Have a project like this in mind?
            </h2>
            <StartConversation />
          </Section>
        </article>
      </main>
      <SiteFooter />
      <SocialRail />
      <EmailRail />
    </>
  )
}

function AdjacentCard({ project, dir }: { project: Project; dir: 'previous' | 'next' }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="cs-adjacent-card glass"
      data-dir={dir}
      aria-label={`${dir === 'previous' ? 'Previous' : 'Next'} project: ${project.title}`}
    >
      <span className="cs-adjacent-label" aria-hidden="true">
        {dir === 'previous' ? '← PREVIOUS' : 'NEXT →'}
      </span>
      <span className="cs-adjacent-title">{project.title}</span>
      <span className="cs-adjacent-desc">{project.description}</span>
    </Link>
  )
}
