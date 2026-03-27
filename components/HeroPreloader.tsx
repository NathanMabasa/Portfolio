'use client'

/**
 * HeroPreloader — the preloader and hero are the SAME element.
 *
 * Flow:
 *  1. Full-screen white overlay shows wordmark centered + counter
 *  2. Counter counts 0 → 100 (expo.inOut)
 *  3. Counter fades. GSAP Flip records the wordmark's current state.
 *  4. wordmark is DOM-moved into the hero heading container.
 *  5. Flip.from() animates it from its old (centered) position to the
 *     new (hero heading) position seamlessly.
 *  6. Overlay fades out. Nav fades in. Sub-text chars stagger in with
 *     elastic ease. Meta line fades in.
 *  7. onDone() fires → rest of page becomes visible.
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP)

const SUBTITLE  = 'Digital Designer & Creative Developer'
const NAV_LINKS = [
  { href: '#work',     label: 'Work' },
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact',  label: 'Contact' },
]

interface Props { onDone: () => void }

export default function HeroPreloader({ onDone }: Props) {
  const sectionRef     = useRef<HTMLElement>(null)
  const overlayRef     = useRef<HTMLDivElement>(null)
  const wordmarkRef    = useRef<HTMLDivElement>(null)
  const heroHeadRef    = useRef<HTMLDivElement>(null)   // hero target
  const counterRef     = useRef<HTMLSpanElement>(null)
  const counterWrapRef = useRef<HTMLDivElement>(null)
  const progressRef    = useRef<HTMLDivElement>(null)
  const navRef         = useRef<HTMLElement>(null)
  const metaRef        = useRef<HTMLDivElement>(null)
  const bgTextRef      = useRef<HTMLDivElement>(null)
  const hrRef          = useRef<HTMLDivElement>(null)
  const charRefs       = useRef<(HTMLSpanElement | null)[]>([])

  /* ─── Phase 1 + 2: counter & transition ─────────────────── */
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

    /* Progress bar synced to counter */
    gsap.to(progress, {
      scaleX: 1,
      duration: 2.2,
      ease: 'expo.inOut',
      transformOrigin: 'left center',
    })

    /* Counter animation */
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

  /* ─── The seamless Flip handoff ────────────────────────────
   *
   *  Key idea: Flip.getState() captures the wordmark's CURRENT
   *  visual bounding box (fixed, centered). We then physically move
   *  the DOM node to heroHead (normal flow, left-aligned). Flip.from()
   *  GSAP-animates from the captured state to the new computed state.
   *  The element never disappears — it just flies across the screen.
   * ─────────────────────────────────────────────────────────── */
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
    /* 1. Snapshot the current visual state (centered in overlay) */
    const state = Flip.getState(wordmark)

    /* 2. Reparent into the hero heading slot */
    heroHead.appendChild(wordmark)
    wordmark.style.position = ''   // release any inline positioning

    /* 3. Animate FROM the snapshot TO the new position */
    const flipTween = Flip.from(state, {
      duration: 1.05,
      ease: 'expo.inOut',
      absolute: true,    // keeps layout stable during tween
      nested: true,
    })

    /* 4. Master timeline that orchestrates everything */
    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = ''
        onDone()
      },
    })

    // Counter exits immediately
    tl.to(counterWrap, { opacity: 0, y: -14, duration: 0.28, ease: 'power3.in' })

    // Flip fires (added to timeline as a proper tween)
    tl.add(flipTween, '<0.12')

    // Overlay fades behind the flying wordmark
    tl.to(overlay, { opacity: 0, duration: 0.85, ease: 'power2.inOut', pointerEvents: 'none' }, '<0.08')

    // Horizontal rule draws from left
    if (hr) {
      tl.fromTo(hr, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'expo.out', transformOrigin: 'left center' }, '<0.4')
    }

    // Nav slides down + fades
    if (nav) {
      tl.fromTo(nav, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '<0.3')
    }

    // Sub-text chars stagger in with elastic finish
    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (chars.length) {
      tl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.022,          // 22 ms between each character
          duration: 0.65,
          ease: 'elastic.out(0.85, 0.35)',
        },
        '-=0.35'
      )
    }

    // Meta line fades up last
    if (meta) {
      tl.fromTo(meta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    }
  }

  /* ─── Phase 3: parallax bg text on scroll ───────────────── */
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
    <section ref={sectionRef} id="home" className="relative min-h-screen bg-white overflow-hidden">

      {/* ── PRELOADER OVERLAY ─────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center"
      >
        {/* THE wordmark — this DOM node is Flip-animated to hero */}
        <div
          ref={wordmarkRef}
          className="font-display font-black text-black leading-[0.9] tracking-tight select-none"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)', letterSpacing: '-0.03em' }}
        >
          NATHAN MABASA
        </div>

        {/* Counter row */}
        <div
          ref={counterWrapRef}
          className="absolute bottom-16 left-0 right-0 flex items-center justify-between px-8 md:px-16"
        >
          <div className="flex items-center gap-2">
            <span ref={counterRef} className="text-[11px] font-mono text-black tabular-nums tracking-[0.08em]">
              00
            </span>
            <span className="text-[11px] font-mono text-black/30">%</span>
          </div>
          <span className="text-[11px] font-mono text-black/30 uppercase tracking-[0.25em]">
            Loading
          </span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 right-0 bg-black origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* ── FIXED NAV (revealed after Flip) ───────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 bg-white/90 backdrop-blur-sm"
        style={{ opacity: 0, transform: 'translateY(-100%)' }}
        aria-label="Main navigation"
      >
        <span className="text-sm font-display font-black text-black tracking-tight">NM</span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[13px] text-[#888] hover:text-black transition-colors duration-200 font-sans"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 text-[11px] text-[#aaa]">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            Available
          </span>
          <button
            onClick={() => scrollTo('#contact')}
            className="text-[13px] font-sans text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-200"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── HERO CONTENT ──────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-28 pb-16 max-w-[1400px] mx-auto w-full">

        {/* Parallax background word */}
        <div
          className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <div
            ref={bgTextRef}
            className="font-display font-black text-black/[0.028] whitespace-nowrap leading-none"
            style={{ fontSize: 'clamp(12rem, 32vw, 30rem)', letterSpacing: '-0.05em' }}
          >
            DESIGN
          </div>
        </div>

        {/* ─── Hero heading container: wordmark lands here ─── */}
        <div
          ref={heroHeadRef}
          className="relative z-10 mb-8"
          style={{ minHeight: 'clamp(2.6rem, 9vw, 8rem)' }}
        />

        {/* ─── Subtitle: character-by-character elastic reveal ─ */}
        <div
          className="relative z-10 mb-10 flex flex-wrap"
          style={{ lineHeight: 1.15 }}
          aria-label={SUBTITLE}
        >
          {SUBTITLE.split('').map((char, i) => (
            /* Outer: clip container — hides char during initial state */
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ verticalAlign: 'bottom', paddingBottom: '0.08em' }}
              aria-hidden="true"
            >
              {/* Inner: the actual character that animates */}
              <span
                ref={(el) => { charRefs.current[i] = el }}
                className="inline-block font-display font-light text-black"
                style={{
                  fontSize: 'clamp(1.4rem, 3.8vw, 3.2rem)',
                  letterSpacing: '-0.01em',
                  transform: 'translateY(110%)',
                  opacity: 0,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))}
        </div>

        {/* ─── Meta row ─────────────────────────────────────── */}
        <div
          ref={metaRef}
          className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ opacity: 0 }}
        >
          <p className="text-[11px] font-mono text-[#999] uppercase tracking-[0.22em]">
            South Africa · Open to International Work
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('#work')}
              className="text-[13px] font-sans text-black border-b border-black pb-0.5 hover:text-[#888] hover:border-[#888] transition-colors duration-200"
            >
              Explore Work ↓
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom border (draws after nav) ────────────────── */}
      <div
        ref={hrRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-[#e5e5e5]"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
    </section>
  )
}
