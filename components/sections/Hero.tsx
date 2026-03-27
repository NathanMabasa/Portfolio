'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  isReady: boolean
}

export default function Hero({ isReady }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef     = useRef<HTMLElement>(null)
  const line1Ref   = useRef<HTMLSpanElement>(null)
  const line2Ref   = useRef<HTMLSpanElement>(null)
  const subRef     = useRef<HTMLDivElement>(null)
  const metaRef    = useRef<HTMLDivElement>(null)
  const hrRef      = useRef<HTMLDivElement>(null)

  // Trigger entry animation once preloader is done
  useEffect(() => {
    if (!isReady) return

    const nav    = navRef.current
    const line1  = line1Ref.current
    const line2  = line2Ref.current
    const sub    = subRef.current
    const meta   = metaRef.current
    const hr     = hrRef.current
    if (!nav || !line1 || !line2 || !sub || !meta || !hr) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Nav fades down from top
      tl.fromTo(nav,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0
      )
      // Horizontal rule draws from left
      .fromTo(hr,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'expo.out', transformOrigin: 'left center' },
        0.4
      )
      // Big name lines slide up from clip
      .fromTo(line1,
        { yPercent: 110, skewY: 2 },
        { yPercent: 0, skewY: 0, duration: 1.1 },
        0.5
      )
      .fromTo(line2,
        { yPercent: 110, skewY: 2 },
        { yPercent: 0, skewY: 0, duration: 1.1 },
        0.65
      )
      // Sub + meta fade up
      .fromTo([sub, meta],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        1.0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const NAV_LINKS = [
    { href: '#work',     label: 'Work' },
    { href: '#about',    label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact',  label: 'Contact' },
  ]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen bg-black flex flex-col"
    >
      {/* ── Navigation ──────────────────────────────── */}
      <nav
        ref={navRef}
        className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 opacity-0"
        aria-label="Main navigation"
      >
        <span className="text-sm font-display font-medium text-white tracking-[0.08em]">
          NM
        </span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[13px] font-sans text-[#555] hover:text-white transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 text-[11px] text-[#444]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available
          </span>
          <button
            onClick={() => scrollTo('#contact')}
            className="text-[13px] font-sans text-white border border-[#222] hover:border-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── Horizontal rule ─────────────────────────── */}
      <div
        ref={hrRef}
        className="hr mx-6 md:mx-12 lg:mx-16"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />

      {/* ── Hero text ───────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-12 pb-16">
        {/* Name — brutalist oversized */}
        <div className="mb-8">
          <div className="reveal-clip">
            <span
              ref={line1Ref}
              className="block font-display font-extralight text-white leading-[0.88]"
              style={{
                fontSize: 'clamp(3.5rem, 14vw, 13rem)',
                letterSpacing: '-0.03em',
                transform: 'translateY(110%)',
              }}
            >
              NATHAN
            </span>
          </div>
          <div className="reveal-clip">
            <span
              ref={line2Ref}
              className="block font-display font-extralight text-white leading-[0.88]"
              style={{
                fontSize: 'clamp(3.5rem, 14vw, 13rem)',
                letterSpacing: '-0.03em',
                transform: 'translateY(110%)',
              }}
            >
              MABASA
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Descriptor */}
          <div ref={subRef} className="opacity-0">
            <p className="text-base md:text-lg font-display font-light text-[#888] mb-1">
              Digital Designer &amp; Creative Developer
            </p>
            <p className="text-sm text-[#444] font-sans">
              Crafting immersive experiences at the intersection of
              <br className="hidden md:block" /> strategy, aesthetics, and technology.
            </p>
          </div>

          {/* Meta + CTA */}
          <div ref={metaRef} className="flex items-end gap-8 opacity-0">
            <div className="space-y-3">
              <p className="text-[11px] text-[#333] font-mono uppercase tracking-[0.2em]">
                Location
              </p>
              <p className="text-sm text-[#666]">South Africa</p>
            </div>
            <button
              onClick={() => scrollTo('#work')}
              className="flex items-center gap-2 text-sm font-display font-medium text-white border-b border-white pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200"
            >
              Explore Work
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ────────────────────────────── */}
      <div className="hr mx-6 md:mx-12 lg:mx-16" />
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 text-[11px] font-mono text-[#333] uppercase tracking-[0.15em]">
        <span>© {new Date().getFullYear()}</span>
        <a
          href="mailto:hello@nathanmabasa.com"
          className="hover:text-white transition-colors duration-200"
        >
          hello@nathanmabasa.com
        </a>
        <span>Portfolio</span>
      </div>
    </section>
  )
}
