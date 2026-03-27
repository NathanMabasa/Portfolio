'use client'

import { useState } from 'react'
import Preloader from '@/components/Preloader'
import LenisProvider from '@/components/LenisProvider'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <>
      {/* Preloader sits above everything */}
      <Preloader onComplete={() => setReady(true)} />

      {/* Page revealed underneath the preloader shutters */}
      <LenisProvider>
        <main
          className="transition-none"
          aria-hidden={!ready}
          style={{ visibility: ready ? 'visible' : 'hidden' }}
        >
          <Hero isReady={ready} />
          <Skills />
          <About />
          <Projects />
          <Services />
          <Contact />
          <Footer />
        </main>
      </LenisProvider>
    </>
  )
}
