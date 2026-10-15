'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ContactModal } from '@/components/contact-modal'

type ContactContextValue = {
  openContact: () => void
  closeContact: () => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openContact = useCallback(() => setOpen(true), [])
  const closeContact = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openContact, closeContact }), [openContact, closeContact])

  return (
    <ContactContext.Provider value={value}>
      {children}
      {open && <ContactModal onClose={closeContact} />}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used within a ContactProvider')
  return ctx
}
