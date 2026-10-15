'use client'

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'

type ContactContextValue = {
  openContact: () => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

export function ContactProvider({ children }: { children: ReactNode }) {
  // Stub until the Contact popup is built.
  const openContact = useCallback(() => {}, [])
  const value = useMemo(() => ({ openContact }), [openContact])

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used within a ContactProvider')
  return ctx
}
