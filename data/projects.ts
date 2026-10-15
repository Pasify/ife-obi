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
      'An ed-tech direct debit loan platform for teachers, turning repayment workflows into clear, step-by-step user journeys. Used by 100+ active users.',
  },
  {
    title: 'Recipe Generation App',
    live: 'https://chef-claude01.vercel.app/',
    image: '/projects/chef-claude.png',
    tools: ['React', 'TanStack Query', 'Hugging Face API'],
    description:
      'A React app that uses the Hugging Face API and TanStack Query to generate recipes with AI from the ingredients you have.',
  },
  {
    title: 'RepoRover',
    live: 'https://reporover.vercel.app/',
    image: '/projects/reporover.png',
    tools: ['Vue.js', 'REST API'],
    description:
      'A GitHub discovery app and my first Vue.js project, built around API integration and reactive state management.',
  },
]

export const otherProjects: OtherProject[] = [
  {
    title: 'FinFuze',
    live: 'https://finfuze-app.web.app/',
    tools: ['Firebase Auth', 'Firestore', 'JavaScript'],
    description:
      'A financial account management app with Firebase Authentication and secure data storage.',
  },
  {
    title: 'FlixBox',
    live: 'https://flixboxx.netlify.app/',
    tools: ['React', 'Tailwind CSS'],
    description:
      'A React movie search app with interactive search and playlist flows, responsive across devices.',
  },
  {
    title: 'Nim Game',
    github: 'https://github.com/Pasify/1-2-nim-game',
    tools: ['Java', 'Swing'],
    description:
      'A Java Swing GUI for the Nim game with a custom AI strategy, undo/save/load, the observer pattern, and a full test plan with design documentation.',
  },
  {
    title: 'Bankist Website',
    live: 'https://pasify.github.io/bankist-website/',
    github: 'https://github.com/Pasify/bankist-website',
    tools: ['HTML', 'CSS/SASS', 'JavaScript'],
    description:
      'A visually appealing showcase of the Bankist banking app: account creation, easy navigation and fictional user testimonials.',
  },
  {
    title: 'Natours',
    live: 'https://nattour.netlify.app/',
    github: 'https://github.com/Pasify/Natours-website',
    tools: ['HTML', 'CSS/SASS'],
    description:
      'An interactive tour booking website with stunning destinations and detailed tour information.',
  },
  {
    title: 'Mapty',
    live: 'https://pasify.github.io/mapty/',
    github: 'https://github.com/Pasify/mapty',
    tools: ['HTML', 'CSS/SASS', 'JavaScript'],
    description:
      'A fitness tracking app that logs workouts on a map with duration, distance and statistics.',
  },
  {
    title: 'Homerr',
    live: 'https://homerr.netlify.app',
    github: 'https://github.com/Pasify/Homer-website',
    tools: ['HTML', 'CSS/SASS'],
    description:
      'A modern real estate website with interactive features and a sleek browsing interface.',
  },
]
