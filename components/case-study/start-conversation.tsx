'use client'

import { Button } from '@/components/button'
import { useContact } from '@/components/contact-context'

export function StartConversation() {
  const { openContact } = useContact()
  return (
    <Button aria-haspopup="dialog" className="w-auto px-6" onClick={openContact}>
      Start a conversation
    </Button>
  )
}
