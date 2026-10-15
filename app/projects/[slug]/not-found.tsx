import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <main id="content" className="shell">
      <div className="cs-not-found">
        <p>{"That project doesn't exist."}</p>
        <Link href="/#works" className="btn btn-big w-auto px-6" data-variant="outline">
          See all projects
        </Link>
      </div>
    </main>
  )
}
