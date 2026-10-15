import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/button'
import { ThemeToggle } from '@/components/theme-toggle'

import { Hero } from '@/components/hero'
import { About } from '@/components/about'

const placeholders = [
  { num: '02', title: 'Experience' },
  { num: '03', title: 'Some things I have built' },
  { num: '04', title: 'Get in touch' },
]

export default function Page() {
  return (
    <main id="content" className="shell">
      <Hero />
      <About />
      {placeholders.map(({ num, title }) => (
        <Section
          key={num}
          aria-labelledby={`heading-${num}`}
          className="flex min-h-screen flex-col justify-center gap-6"
        >
          <SectionHeading num={num} title={title} id={`heading-${num}`} />
          <p className="max-w-xl leading-relaxed text-slate">
            Placeholder content. Scroll to test the reveal, hover the buttons to test the cursor, and
            toggle the theme to check both palettes.
          </p>
          <div className="glass flex max-w-xl flex-wrap items-center gap-6 rounded-card p-6">
            <Button size="big">Resume</Button>
            <Button size="small">small</Button>
            <ThemeToggle />
            <a href="#content" className="font-mono text-sm text-cyan-2 hover:underline">
              inline link
            </a>
          </div>
        </Section>
      ))}
    </main>
  )
}
