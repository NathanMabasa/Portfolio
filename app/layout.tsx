import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import GrainOverlay from '@/components/GrainOverlay'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
  description: 'South African digital designer and creative developer specializing in immersive web experiences, brand identity, and UI/UX design.',
  address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
  email: 'hello@nathanmabasa.com',
}

export const metadata: Metadata = {
  title: {
    default: 'Nathan Mabasa — Digital Designer & Creative Developer',
    template: '%s | Nathan Mabasa',
  },
  description: 'South African digital designer and creative developer. Brand identity, UI/UX, and creative development for founders and studios worldwide.',
  keywords: ['Nathan Mabasa', 'digital designer', 'creative developer', 'UI UX South Africa', 'brand identity', 'web design'],
  authors: [{ name: 'Nathan Mabasa', url: 'https://nathanmabasa.com' }],
  creator: 'Nathan Mabasa',
  metadataBase: new URL('https://nathanmabasa.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'en_ZA', url: 'https://nathanmabasa.com',
    title: 'Nathan Mabasa — Digital Designer & Creative Developer',
    description: 'Brand identity, UI/UX, and creative development.',
    siteName: 'Nathan Mabasa',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Nathan Mabasa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nathan Mabasa — Digital Designer & Creative Developer',
    description: 'Brand identity, UI/UX, and creative development.',
    site: '@nathanmabasa', creator: '@nathanmabasa',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#0d0d0d] text-white font-sans antialiased">
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
