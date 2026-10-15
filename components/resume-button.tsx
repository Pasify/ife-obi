'use client'

import { Eye } from 'lucide-react'
import { Button } from '@/components/button'
import { useContact } from '@/components/contact-context'
import { cn } from '@/lib/utils'

export function ResumeButton({ className }: { className?: string }) {
  const { openResume } = useContact()
  return (
    <Button
      size="small"
      aria-haspopup="dialog"
      className={cn('gap-2', className)}
      onClick={openResume}
    >
      <Eye size={15} aria-hidden="true" />
      Resume
    </Button>
  )
}
