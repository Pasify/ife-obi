import { existsSync } from 'node:fs'
import path from 'node:path'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { FeaturedProjectRow } from '@/components/featured-project'
import { OtherProjects } from '@/components/other-projects'
import { featuredProjects, otherProjects } from '@/data/projects'

function imageExists(src: string) {
  return existsSync(path.join(process.cwd(), 'public', src))
}

export function Projects() {
  return (
    <Section id="works" aria-labelledby="works-heading" className="projects">
      <SectionHeading num="05" title="Some things I've built" id="works-heading" />

      <ul className="featured-list">
        {featuredProjects.map((project, i) => (
          <FeaturedProjectRow
            key={project.title}
            project={project}
            side={i % 2 === 0 ? 'right' : 'left'}
            hasImage={imageExists(project.image)}
          />
        ))}
      </ul>

      <OtherProjects projects={otherProjects} />
    </Section>
  )
}
