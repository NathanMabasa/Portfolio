'use client'

import { useState } from 'react'
import HeroPreloader from '@/components/HeroPreloader'
import LenisProvider from '@/components/LenisProvider'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Collaborate from '@/components/sections/Collaborate'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <HeroPreloader onDone={() => setReady(true)} />
      <LenisProvider>
        <div
          aria-hidden={!ready}
          style={{ visibility: ready ? 'visible' : 'hidden' }}
        >
          <Skills />
          <Projects />
          <About />
          <Services />
          <Testimonials />
          <Collaborate />
          <Contact />
          <Footer />
        </div>
      </LenisProvider>
    </>
  )
}
