import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Certificates } from '@/components/certificates'
import { Contact } from '@/components/contact'
import { EmailRail, SocialRail, SocialStrip } from '@/components/social-rail'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <main id="content" className="shell">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certificates />
        <Projects />
        <Contact />
        <SocialStrip />
      </main>
      <SiteFooter />
      <SocialRail />
      <EmailRail />
    </>
  )
}
