'use client'

import { useState } from 'react'
import HeroPreloader from '@/components/HeroPreloader'
import LenisProvider from '@/components/LenisProvider'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import Collaborate from '@/components/sections/Collaborate'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <>
      {/* HeroPreloader IS the hero — it handles the full transition internally */}
      <HeroPreloader onDone={() => setReady(true)} />

      {/* All other sections are hidden during preload, revealed after */}
      <LenisProvider>
        <div
          aria-hidden={!ready}
          style={{
            visibility: ready ? 'visible' : 'hidden',
            // Keep in DOM so GSAP ScrollTrigger can measure heights
          }}
        >
          <Skills />
          <Projects />
          <About />
          <Services />
          <Collaborate />
          <Contact />
          <Footer />
        </div>
      </LenisProvider>
    </>
  )
}
