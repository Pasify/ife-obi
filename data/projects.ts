type CaseStudyFields = {
  slug: string
  role?: string
  timeline?: string
  status?: string
  problem?: string
  approach?: string[]
  outcome?: string[]
  learned?: string[]
  /** Paths under /public. Missing files are skipped. */
  gallery?: string[]
}

export type FeaturedProject = CaseStudyFields & {
  title: string
  live: string
  github?: string
  /** Path under /public, e.g. /projects/easyly-card.png */
  image: string
  tools: string[]
  description: string
}

export type OtherProject = CaseStudyFields & {
  title: string
  live?: string
  github?: string
  /** Path under /public. Missing files fall back to a placeholder. */
  image?: string
  tools: string[]
  description: string
}

export type Project = FeaturedProject | OtherProject

/**
 * Case-study intent, status note: each featured description must stay under
 * 30 words and must not invent metrics beyond the ones given (e.g. "100+ active users").
 *
 * Projects without a `github` field render without the GitHub icon.
 */
export const featuredProjects: FeaturedProject[] = [
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'easyly-card',
    title: 'Easyly Card',
    live: 'https://easylyfcard.vercel.app/',
    image: '/projects/easyly-card.png',
    tools: ['React.js', 'Turso (libSQL)', 'Vercel'],
    description:
      'Direct debit loans for teachers, with repayment workflows reshaped into clear, step-by-step journeys.',
    outcome: ['100+ active users'],
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'chef-claude',
    title: 'Recipe Generation App',
    live: 'https://chef-claude01.vercel.app/',
    image: '/projects/chef-claude.png',
    tools: ['React', 'TanStack Query', 'Hugging Face API'],
    description:
      'Name your ingredients and an AI model, reached through Hugging Face and TanStack Query, writes the recipe.',
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'reporover',
    title: 'RepoRover',
    live: 'https://reporover.vercel.app/',
    image: '/projects/reporover.png',
    tools: ['Vue.js', 'REST API'],
    description:
      'Search and explore GitHub repositories. My first Vue.js project, centred on API integration and reactive state.',
  },
]

export const otherProjects: OtherProject[] = [
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'finfuze',
    title: 'FinFuze',
    live: 'https://finfuze-app.web.app/',
    tools: ['Firebase Auth', 'Firestore', 'JavaScript'],
    description:
      'Personal finance accounts, secured with Firebase Authentication.',
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'flixbox',
    title: 'FlixBox',
    live: 'https://flixboxx.netlify.app/',
    tools: ['React', 'Tailwind CSS'],
    description:
      'Search for movies and curate playlists on any screen size.',
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'nim-game',
    title: 'Nim Game',
    github: 'https://github.com/Pasify/1-2-nim-game',
    tools: ['Java', 'Swing'],
    description:
      'A Java Swing take on the classic game, with a custom AI opponent plus undo, save and load.',
    approach: [
      'Extended a partial object-oriented codebase with a Java Swing GUI',
      'Designed a custom AI strategy for the computer player',
      'Added undo, save and load functionality',
      'Applied the observer-observable pattern',
      'Wrote a full test plan and design documentation',
    ],
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'bankist-website',
    title: 'Bankist Website',
    live: 'https://pasify.github.io/bankist-website/',
    github: 'https://github.com/Pasify/bankist-website',
    image: '/projects/bankist.png',
    tools: ['HTML', 'CSS/SASS', 'JavaScript'],
    description:
      'A showcase site for the Bankist banking concept: sign-up flow, smooth navigation, sample testimonials.',
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'natours',
    title: 'Natours',
    live: 'https://nattour.netlify.app/',
    github: 'https://github.com/Pasify/Natours-website',
    image: '/projects/natours.png',
    tools: ['HTML', 'CSS/SASS'],
    description:
      'Tour booking for adventure travel, with destination galleries and itinerary details.',
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'mapty',
    title: 'Mapty',
    live: 'https://pasify.github.io/mapty/',
    github: 'https://github.com/Pasify/mapty',
    image: '/projects/mapty.png',
    tools: ['HTML', 'CSS/SASS', 'JavaScript'],
    description:
      'Log workouts on a map, then review distance and duration.',
  },
  // TODO: role, timeline, problem, approach, outcome, learned, gallery
  {
    slug: 'homerr',
    title: 'Homerr',
    live: 'https://homerr.netlify.app',
    github: 'https://github.com/Pasify/Homer-website',
    image: '/projects/homerr.png',
    tools: ['HTML', 'CSS/SASS'],
    description:
      'Property browsing with a sleek, interactive interface.',
  },
]

export const allProjects: Project[] = [...featuredProjects, ...otherProjects]

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const index = Math.max(
    0,
    allProjects.findIndex((project) => project.slug === slug),
  )
  const count = allProjects.length
  return {
    previous: allProjects[(index - 1 + count) % count],
    next: allProjects[(index + 1) % count],
  }
}

export function isFeatured(slug: string): boolean {
  return featuredProjects.some((project) => project.slug === slug)
}

/** The stored status, or one derived from the available links. */
export function getProjectStatus(project: Project): string {
  if (project.status) return project.status
  return project.live ? 'Live' : 'Source available'
}
