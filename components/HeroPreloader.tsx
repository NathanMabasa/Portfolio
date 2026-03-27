'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP)

const NAV_LINKS = [
  { href: '#work',     label: 'Work' },
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact',  label: 'Contact' },
]

const HEADLINE_LINES = ['Digital', 'Designer &', 'Developer.']

interface Props { onDone: () => void }

export default function HeroPreloader({ onDone }: Props) {
  const sectionRef     = useRef<HTMLElement>(null)
  const overlayRef     = useRef<HTMLDivElement>(null)
  const wordmarkRef    = useRef<HTMLDivElement>(null)
  const heroHeadRef    = useRef<HTMLDivElement>(null)
  const counterRef     = useRef<HTMLSpanElement>(null)
  const counterWrapRef = useRef<HTMLDivElement>(null)
  const progressRef    = useRef<HTMLDivElement>(null)
  const navRef         = useRef<HTMLElement>(null)
  const metaRef        = useRef<HTMLDivElement>(null)
  const bgTextRef      = useRef<HTMLDivElement>(null)
  const hrRef          = useRef<HTMLDivElement>(null)
  const lineRefs       = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const overlay     = overlayRef.current
    const wordmark    = wordmarkRef.current
    const heroHead    = heroHeadRef.current
    const counter     = counterRef.current
    const counterWrap = counterWrapRef.current
    const progress    = progressRef.current
    const nav         = navRef.current
    const meta        = metaRef.current
    const hr          = hrRef.current

    if (!overlay || !wordmark || !heroHead || !counter || !counterWrap || !progress) return

    document.body.style.overflow = 'hidden'
    const obj = { n: 0 }

    gsap.to(progress, {
      scaleX: 1,
      duration: 2.2,
      ease: 'expo.inOut',
      transformOrigin: 'left center',
    })

    gsap.to(obj, {
      n: 100,
      duration: 2.2,
      ease: 'expo.inOut',
      onUpdate() {
        counter.textContent = String(Math.floor(obj.n)).padStart(2, '0')
      },
      onComplete() {
        gsap.delayedCall(0.22, () => {
          runFlipTransition({ overlay, wordmark, heroHead, counterWrap, nav, meta, hr })
        })
      },
    })

    return () => {
      gsap.killTweensOf(obj)
      document.body.style.overflow = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const runFlipTransition = ({
    overlay, wordmark, heroHead, counterWrap, nav, meta, hr,
  }: {
    overlay:     HTMLDivElement
    wordmark:    HTMLDivElement
    heroHead:    HTMLDivElement
    counterWrap: HTMLDivElement
    nav:         HTMLElement | null
    meta:        HTMLDivElement | null
    hr:          HTMLDivElement | null
  }) => {
    const state = Flip.getState(wordmark)
    heroHead.appendChild(wordmark)
    wordmark.style.position = ''

    const flipTween = Flip.from(state, {
      duration: 1.05,
      ease: 'expo.inOut',
      absolute: true,
      nested: true,
    })

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = ''
        onDone()
      },
    })

    tl.to(counterWrap, { opacity: 0, y: -14, duration: 0.28, ease: 'power3.in' })
    tl.add(flipTween, '<0.12')
    tl.to(overlay, { opacity: 0, duration: 0.85, ease: 'power2.inOut', pointerEvents: 'none' }, '<0.08')

    if (hr) {
      tl.fromTo(hr, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'expo.out', transformOrigin: 'left center' }, '<0.4')
    }

    if (nav) {
      tl.fromTo(nav, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '<0.3')
    }

    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (lines.length) {
      tl.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'expo.out',
        },
        '-=0.35'
      )
    }

    if (meta) {
      tl.fromTo(meta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    }
  }

  useGSAP(() => {
    if (!bgTextRef.current || !sectionRef.current) return

    gsap.fromTo(
      bgTextRef.current,
      { yPercent: -5 },
      {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      }
    )
  }, { scope: sectionRef })

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen bg-[#0d0d0d] overflow-hidden">

      {/* PRELOADER OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-30 bg-[#0d0d0d] flex flex-col items-center justify-center"
      >
        <div
          ref={wordmarkRef}
          className="font-display font-black text-white leading-[0.9] tracking-tight select-none"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}
        >
          NATHAN MABASA
        </div>

        <div
          ref={counterWrapRef}
          className="absolute bottom-16 left-0 right-0 flex items-center justify-between px-8 md:px-16"
        >
          <div className="flex items-center gap-2">
            <span ref={counterRef} className="text-[11px] font-mono text-white/50 tabular-nums tracking-[0.08em]">
              00
            </span>
            <span className="text-[11px] font-mono text-white/20">%</span>
          </div>
          <span className="text-[11px] font-mono text-white/20 uppercase tracking-[0.25em]">
            Loading
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 right-0 bg-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* FIXED NAV */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 bg-[#0d0d0d]/90 backdrop-blur-sm border-b border-white/[0.04]"
        style={{ opacity: 0, transform: 'translateY(-100%)' }}
        aria-label="Main navigation"
      >
        <span className="text-sm font-display font-black text-white tracking-tight">NM</span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[13px] text-[#555] hover:text-white transition-colors duration-200 font-sans"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 text-[11px] text-[#444]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Available
          </span>
          <button
            onClick={() => scrollTo('#contact')}
            className="text-[13px] font-sans text-black bg-accent px-4 py-2 hover:bg-white transition-all duration-200"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-16 pt-28 pb-16 max-w-[1400px] mx-auto w-full">

        {/* Parallax background text */}
        <div
          className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <div
            ref={bgTextRef}
            className="font-display font-black text-white/[0.018] whitespace-nowrap leading-none"
            style={{ fontSize: 'clamp(12rem, 32vw, 30rem)', letterSpacing: '-0.05em' }}
          >
            DESIGN
          </div>
        </div>

        {/* Wordmark landing zone */}
        <div
          ref={heroHeadRef}
          className="relative z-10 mb-6"
          style={{ minHeight: 'clamp(2.6rem, 9vw, 8rem)' }}
        />

        {/* Headline lines */}
        <div className="relative z-10 mb-10" aria-label="Digital Designer & Developer">
          {HEADLINE_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span
                ref={(el) => { lineRefs.current[i] = el }}
                className="block font-display font-black text-white leading-[0.92]"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '-0.03em',
                  transform: 'translateY(110%)',
                  opacity: 0,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div
          ref={metaRef}
          className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ opacity: 0 }}
        >
          <p className="text-[11px] font-mono text-[#444] uppercase tracking-[0.22em]">
            South Africa · Open to International Work
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo('#work')}
              className="text-[13px] font-sans text-accent border-b border-accent/40 pb-0.5 hover:border-accent transition-colors duration-200"
            >
              Explore Work ↓
            </button>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        ref={hrRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
    </section>
  )
}
