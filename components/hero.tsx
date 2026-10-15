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
      <button
        type="button"
        className="hero-badge hero-item"
        style={stagger(0)}
        onClick={openContact}
      >
        <span className="hero-badge-dot" aria-hidden="true" />
        <span>Open to new opportunities</span>
      </button>
      <p className="hero-greeting hero-item" style={stagger(1)}>
        {'Hi👋, my name is'}
      </p>
      <h1 className="hero-name hero-item" style={stagger(2)}>
        Ifesinachi Obiora,
      </h1>
      <p className="hero-sub hero-item" style={stagger(3)}>
        I build full-stack products.
      </p>
      <p className="hero-desc hero-item" style={stagger(4)}>
        {
          'Three years across React, React Native and Node.js, turning ideas into fast, accessible interfaces, from first sketch to launch.'
        }
      </p>
      <div className="hero-actions hero-item" style={stagger(5)}>
        <Button size="big" variant="outline" onClick={scrollToAbout}>
          {'Find out more ↓'}
        </Button>
        <Button size="big" variant="outline" onClick={openContact}>
          {"Let's talk"}
        </Button>
      </div>
    </header>
  )
}
