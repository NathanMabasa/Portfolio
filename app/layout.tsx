import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import GrainOverlay from '@/components/GrainOverlay'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nathan Mabasa',
  url: 'https://nathanmabasa.com',
  sameAs: [
    'https://linkedin.com/in/nyikonathan-mabasa/',
    'https://instagram.com/nathanmabasa',
    'https://twitter.com/nathanmabasa',
  ],
  jobTitle: 'Digital Designer & Creative Developer',
  description:
    'South African digital designer and creative developer specializing in immersive web experiences, brand identity, and UI/UX design.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ZA',
    addressRegion: 'South Africa',
  },
  email: 'hello@nathanmabasa.com',
  knowsAbout: [
    'Brand Identity & Strategy',
    'UI/UX Design',
    'Creative Development',
    'Motion & Interaction Design',
    'Design Systems',
    'Web Development',
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'Nathan Mabasa — Digital Designer & Creative Developer',
    template: '%s | Nathan Mabasa',
  },
  description:
    'South African digital designer and creative developer specializing in immersive web experiences, brand identity, and UI/UX design. Available for international projects.',
  keywords: [
    'Nathan Mabasa',
    'digital designer',
    'creative developer',
    'UI UX designer South Africa',
    'web design',
    'brand identity',
    'immersive web experiences',
    'motion design',
    'design systems',
    'nathanmabasa.com',
  ],
  authors: [{ name: 'Nathan Mabasa', url: 'https://nathanmabasa.com' }],
  creator: 'Nathan Mabasa',
  publisher: 'Nathan Mabasa',
  metadataBase: new URL('https://nathanmabasa.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://nathanmabasa.com',
    title: 'Nathan Mabasa — Digital Designer & Creative Developer',
    description:
      'South African digital designer and creative developer specializing in immersive web experiences, brand identity, and UI/UX design.',
    siteName: 'Nathan Mabasa',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Nathan Mabasa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nathan Mabasa — Digital Designer & Creative Developer',
    description:
      'South African digital designer and creative developer specializing in immersive web experiences, brand identity, and UI/UX design.',
    site: '@nathanmabasa',
    creator: '@nathanmabasa',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#0a0a0a] text-white font-sans antialiased">
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
