import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'outline'
  size?: 'big' | 'small'
}

export function Button({
  variant = 'outline',
  size = 'big',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-variant={variant}
      className={cn('btn', size === 'big' ? 'btn-big' : 'btn-small', className)}
      {...props}
    />
  )
}
