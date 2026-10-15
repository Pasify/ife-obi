'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ContactModal } from '@/components/contact-modal'
import { ResumeModal } from '@/components/resume-modal'

type ContactContextValue = {
  openContact: () => void
  closeContact: () => void
  openResume: () => void
  closeResume: () => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const openContact = useCallback(() => setOpen(true), [])
  const closeContact = useCallback(() => setOpen(false), [])
  const openResume = useCallback(() => setResumeOpen(true), [])
  const closeResume = useCallback(() => setResumeOpen(false), [])
  const value = useMemo(
    () => ({ openContact, closeContact, openResume, closeResume }),
    [openContact, closeContact, openResume, closeResume],
  )

  return (
    <ContactContext.Provider value={value}>
      {children}
      {open && <ContactModal onClose={closeContact} />}
      {resumeOpen && <ResumeModal onClose={closeResume} />}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used within a ContactProvider')
  return ctx
}
