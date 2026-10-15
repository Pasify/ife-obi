'use client'

import type { CSSProperties } from 'react'
import { Button } from '@/components/button'
import { useContact } from '@/components/contact-context'

const stagger = (index: number) => ({ '--hero-delay': `${0.2 + index * 0.12}s` }) as CSSProperties

export function Hero() {
  const { openContact } = useContact()

  const scrollToAbout = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('about')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <header id="header" className="hero">
      <p className="hero-greeting hero-item" style={stagger(0)}>
        {'Hi👋, my name is'}
      </p>
      <h1 className="hero-name hero-item" style={stagger(1)}>
        Ifesinachi Obiora,
      </h1>
      <h2 className="hero-sub hero-item" style={stagger(2)}>
        I build full-stack products.
      </h2>
      <p className="hero-desc hero-item" style={stagger(3)}>
        {
          "I'm a full-stack developer with 3+ years of experience shipping web and mobile products with React, React Native and Node.js. I enjoy turning ideas into clean, fast, accessible interfaces, from discovery through launch."
        }
      </p>
      <div className="hero-actions hero-item" style={stagger(4)}>
        <Button size="big" variant="outline" onClick={scrollToAbout}>
          {'Find out more ↓'}
        </Button>
        <Button size="big" variant="outline" onClick={openContact}>
          Say Hello!
        </Button>
      </div>
    </header>
  )
}
