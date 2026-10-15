'use client'

import { Button } from '@/components/button'
import { useContact } from '@/components/contact-context'

export function ResumeButton({ className }: { className?: string }) {
  const { openResume } = useContact()
  return (
    <Button size="small" aria-haspopup="dialog" className={className} onClick={openResume}>
      Resume
    </Button>
  )
}
