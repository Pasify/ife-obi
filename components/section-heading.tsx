import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  num: string
  title: string
  id?: string
  className?: string
}

export function SectionHeading({ num, title, id, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 flex w-1/2 items-center phone:w-full', className)}>
      <span aria-hidden="true" className="mr-2.5 font-mono text-xl text-cyan">
        {num}.
      </span>
      <h2
        id={id}
        className="font-sans text-3xl leading-normal font-semibold text-heading tablet:text-2xl"
      >
        {title}
      </h2>
    </div>
  )
}
