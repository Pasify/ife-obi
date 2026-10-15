import { Code2, Layout, Server, Database, Cloud, Users, type LucideIcon } from 'lucide-react'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { SkillCard } from '@/components/skill-card'

export type Skill = { name: string; familiar?: boolean }
export type SkillCategory = { title: string; icon: LucideIcon; skills: Skill[] }

const categories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code2,
    skills: [
      { name: 'JavaScript (ES6+)' },
      { name: 'TypeScript' },
      { name: 'C#' },
      { name: 'Java' },
      { name: 'SQL' },
    ],
  },
  {
    title: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'Vue.js' },
      { name: 'React Native' },
      { name: 'Tailwind' },
      { name: 'CSS/SCSS/LESS' },
    ],
  },
  {
    title: 'Backend & API',
    icon: Server,
    skills: [
      { name: 'Node.js' },
      { name: 'RESTful API design' },
      { name: 'Event-driven patterns' },
      { name: 'Spring Boot' },
      { name: '.NET Core', familiar: true },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Firebase' },
      { name: 'Supabase' },
      { name: 'Turso/libSQL' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    skills: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'CI/CD (GitHub Actions/GitLab)' },
      { name: 'Vercel' },
      { name: 'Netlify' },
      { name: 'AWS', familiar: true },
      { name: 'Azure', familiar: true },
    ],
  },
  {
    title: 'Practices',
    icon: Users,
    skills: [
      { name: 'Agile/Scrum' },
      { name: 'Client Collaboration' },
      { name: 'Team Leadership' },
      { name: 'Problem-Solving' },
      { name: 'Adaptability' },
    ],
  },
]

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="heading-skills" className="skills">
      <SectionHeading num="02" title="Skills & tools" id="heading-skills" />
      <p className="skills-intro">The tools I reach for to design, build and ship.</p>
      <div className="skills-grid">
        {categories.map((category, index) => (
          <SkillCard
            key={category.title}
            index={index}
            title={category.title}
            icon={<category.icon size={28} aria-hidden="true" />}
            skills={category.skills}
          />
        ))}
      </div>
    </Section>
  )
}
