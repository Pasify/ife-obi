export type FeaturedProject = {
  title: string
  live: string
  github?: string
  /** Path under /public, e.g. /projects/easyly-card.png */
  image: string
  tools: string[]
  description: string
}

export type OtherProject = {
  title: string
  live?: string
  github?: string
  tools: string[]
  description: string
}

/**
 * Case-study intent, status note: each featured description must stay under
 * 30 words and must not invent metrics beyond the ones given (e.g. "100+ active users").
 *
 * Projects without a `github` field render without the GitHub icon.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Easyly Card',
    live: 'https://easylyfcard.vercel.app/',
    image: '/projects/easyly-card.png',
    tools: ['React.js', 'Turso (libSQL)', 'Vercel'],
    description:
      'Direct debit loans for teachers, with repayment workflows reshaped into clear, step-by-step journeys.',
  },
  {
    title: 'Recipe Generation App',
    live: 'https://chef-claude01.vercel.app/',
    image: '/projects/chef-claude.png',
    tools: ['React', 'TanStack Query', 'Hugging Face API'],
    description:
      'Name your ingredients and an AI model, reached through Hugging Face and TanStack Query, writes the recipe.',
  },
  {
    title: 'RepoRover',
    live: 'https://reporover.vercel.app/',
    image: '/projects/reporover.png',
    tools: ['Vue.js', 'REST API'],
    description:
      'Search and explore GitHub repositories. My first Vue.js project, centred on API integration and reactive state.',
  },
]

export const otherProjects: OtherProject[] = [
  {
    title: 'FinFuze',
    live: 'https://finfuze-app.web.app/',
    tools: ['Firebase Auth', 'Firestore', 'JavaScript'],
    description:
      'Personal finance accounts, secured with Firebase Authentication.',
  },
  {
    title: 'FlixBox',
    live: 'https://flixboxx.netlify.app/',
    tools: ['React', 'Tailwind CSS'],
    description:
      'Search for movies and curate playlists on any screen size.',
  },
  {
    title: 'Nim Game',
    github: 'https://github.com/Pasify/1-2-nim-game',
    tools: ['Java', 'Swing'],
    description:
      'A Java Swing take on the classic game, with a custom AI opponent plus undo, save and load.',
  },
  {
    title: 'Bankist Website',
    live: 'https://pasify.github.io/bankist-website/',
    github: 'https://github.com/Pasify/bankist-website',
    tools: ['HTML', 'CSS/SASS', 'JavaScript'],
    description:
      'A showcase site for the Bankist banking concept: sign-up flow, smooth navigation, sample testimonials.',
  },
  {
    title: 'Natours',
    live: 'https://nattour.netlify.app/',
    github: 'https://github.com/Pasify/Natours-website',
    tools: ['HTML', 'CSS/SASS'],
    description:
      'Tour booking for adventure travel, with destination galleries and itinerary details.',
  },
  {
    title: 'Mapty',
    live: 'https://pasify.github.io/mapty/',
    github: 'https://github.com/Pasify/mapty',
    tools: ['HTML', 'CSS/SASS', 'JavaScript'],
    description:
      'Log workouts on a map, then review distance and duration.',
  },
  {
    title: 'Homerr',
    live: 'https://homerr.netlify.app',
    github: 'https://github.com/Pasify/Homer-website',
    tools: ['HTML', 'CSS/SASS'],
    description:
      'Property browsing with a sleek, interactive interface.',
  },
]
