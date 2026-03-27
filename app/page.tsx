import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
