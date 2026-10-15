import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Cursor } from '@/components/cursor'
import { ContactProvider } from '@/components/contact-context'
import { Particles } from '@/components/particles'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-primary',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'Ifesinachi Obiora | Full-Stack Software Developer'
const description =
  'Full-stack developer building web and mobile products with React, React Native and Node.js.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  icons: { icon: '/logo.png', apple: '/logo.png' },
}

export const viewport: Viewport = {
  themeColor: '#0a192f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${firaCode.variable} bg-background`}
    >
      <body>
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only z-[1000000] rounded-[5px] bg-card px-4 py-2 font-mono text-sm text-cyan focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Particles />
          <Cursor />
          <ContactProvider>{children}</ContactProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
