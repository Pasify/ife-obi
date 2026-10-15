'use client'

import { Mail, Phone } from 'lucide-react'
import { Section } from '@/components/section'
import { useContact } from '@/components/contact-context'

const EMAIL = 'ife.obi61@gmail.com'

export function Contact() {
  const { openContact } = useContact()

  return (
    <Section id="contact" aria-labelledby="contact-heading" className="contact">
      <div className="contact-heading">
        <p className="contact-eyebrow">
          <span aria-hidden="true" className="contact-eyebrow-num">
            06.
          </span>
          Get In Touch
        </p>
        <h2 id="contact-heading" className="contact-h">
          Contact Me
        </h2>
      </div>

      <p className="contact-summary">
        {
          "Feel free to reach out. My inbox is always open, whether you have a question, want to discuss a potential collaboration or freelance project, or have an employment opportunity. I'd love to hear from you."
        }
      </p>

      <div className="contact-cta">
        <button type="button" className="btn btn-big cta-btn" onClick={openContact}>
          <span className="cta-label">Say Hello!</span>
          <span className="cta-icon" aria-hidden="true">
            <Mail size={25} />
          </span>
        </button>
        <a href="tel:+447881167685" className="btn btn-big cta-btn">
          <span className="cta-label">Call Me!</span>
          <span className="cta-icon" aria-hidden="true">
            <Phone size={25} />
          </span>
        </a>
      </div>

      <a href={`mailto:${EMAIL}`} className="contact-mail">
        {EMAIL}
      </a>
    </Section>
  )
}
