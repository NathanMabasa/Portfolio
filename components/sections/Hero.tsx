'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileNavOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileNavOpen])

  const scrollTo = (id: string) => {
    setMobileNavOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(202,255,51,0.06)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source
          src="https://mybycketvercelprojecttest.s3.sa-east-1.amazonaws.com/animation-bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-16 py-7"
      >
        <span className="font-display font-semibold text-lg tracking-tight text-white">NM</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm text-[#888] hover:text-white transition-colors duration-200 font-body"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available
          </span>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-accent transition-colors duration-200"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-3xl font-display font-light text-white hover:text-accent transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-16 max-w-[1400px] mx-auto">
        {/* Main text */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs font-body tracking-[0.25em] uppercase text-[#666] mb-6"
            >
              Digital Designer &amp; Creative Developer · South Africa
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.8rem,8vw,7rem)] font-display font-light leading-[1.05] tracking-[-0.03em] text-white mb-8"
            >
              Design that
              <br />
              <span className="italic text-[#ccc]">moves</span> people.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-base md:text-lg text-[#888] leading-relaxed font-body mb-10 max-w-lg"
            >
              Brand identity, UI/UX design, and creative development for
              founders and studios who demand the extraordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={() => scrollTo('#work')}
                className="flex items-center gap-2.5 bg-accent text-black py-3.5 px-7 rounded-full text-sm font-medium hover:bg-white transition-all duration-200"
              >
                View Work
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="text-[#888] text-sm font-body hover:text-white transition-colors duration-200 py-3.5 px-4"
              >
                Let&apos;s Talk
              </button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-12 lg:gap-16 items-end flex-shrink-0 pb-1"
          >
            {[
              { value: '5+', label: 'Years experience' },
              { value: '40+', label: 'Projects delivered' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-light leading-none mb-2 text-white">
                  {s.value}
                </div>
                <div className="text-sm text-[#666] font-body">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 pt-6 border-t border-white/8 flex items-center justify-between"
        >
          <a
            href="mailto:hello@nathanmabasa.com"
            className="text-xs text-[#555] font-body hover:text-[#888] transition-colors"
          >
            hello@nathanmabasa.com
          </a>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-[#555] font-body">Open to work</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
