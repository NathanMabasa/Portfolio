'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Prism from '@/components/Prism'
import DecryptedText from '@/components/DecryptedText'

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP)

const NAV_LINKS = [
  { href: '#work',     label: 'Work' },
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact',  label: 'Contact' },
]

const CYCLE_WORDS = ['Designer.', 'Developer.', 'Creator.']

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
  const hrRef          = useRef<HTMLDivElement>(null)
  const line1Ref       = useRef<HTMLDivElement>(null)
  const line2Ref       = useRef<HTMLDivElement>(null)

  // Cycling word animation
  const cycleOutRef    = useRef<HTMLSpanElement>(null)   // current word (exits up)
  const cycleInRef     = useRef<HTMLSpanElement>(null)   // next word (enters from below)
  const [wordIdx, setWordIdx]   = useState(0)
  const [nextIdx, setNextIdx]   = useState(1)
  const cycleTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const preloaderDone  = useRef(false)

  const runCycle = () => {
    const out = cycleOutRef.current
    const inn = cycleInRef.current
    if (!out || !inn) return

    const tl = gsap.timeline({
      onComplete() {
        setWordIdx((i) => (i + 1) % CYCLE_WORDS.length)
        setNextIdx((i) => (i + 1) % CYCLE_WORDS.length)
        // reset next word to below, ready for next cycle
        gsap.set(inn, { yPercent: 110 })
      },
    })

    // current word exits up
    tl.to(out, { yPercent: -110, duration: 0.55, ease: 'power3.inOut' })
    // next word enters from below, overlapping
    tl.fromTo(inn, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' }, '<0.05')
  }

  // Start cycling after preloader is done
  useEffect(() => {
    if (!preloaderDone.current) return
    const schedule = () => {
      cycleTimerRef.current = setTimeout(() => {
        runCycle()
        schedule()
      }, 2800)
    }
    schedule()
    return () => { if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloaderDone.current])

  // Preloader
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

    gsap.to(progress, { scaleX: 1, duration: 2.2, ease: 'expo.inOut', transformOrigin: 'left center' })
    gsap.to(obj, {
      n: 100,
      duration: 2.2,
      ease: 'expo.inOut',
      onUpdate() { counter.textContent = String(Math.floor(obj.n)).padStart(2, '0') },
      onComplete() {
        gsap.delayedCall(0.22, () => {
          runFlipTransition({ overlay, wordmark, heroHead, counterWrap, nav, meta, hr })
        })
      },
    })

    return () => { gsap.killTweensOf(obj); document.body.style.overflow = '' }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const runFlipTransition = ({
    overlay, wordmark, heroHead, counterWrap, nav, meta, hr,
  }: {
    overlay: HTMLDivElement; wordmark: HTMLDivElement; heroHead: HTMLDivElement
    counterWrap: HTMLDivElement; nav: HTMLElement | null; meta: HTMLDivElement | null; hr: HTMLDivElement | null
  }) => {
    const state = Flip.getState(wordmark)
    heroHead.appendChild(wordmark)
    wordmark.style.position = ''

    const flipTween = Flip.from(state, { duration: 1.05, ease: 'expo.inOut', absolute: true, nested: true })

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = ''
        onDone()
        preloaderDone.current = true

        // kick off the cycle loop
        const schedule = () => {
          cycleTimerRef.current = setTimeout(() => {
            runCycle()
            schedule()
          }, 2800)
        }
        schedule()
      },
    })

    tl.to(counterWrap, { opacity: 0, y: -12, duration: 0.25, ease: 'power3.in' })
    tl.add(flipTween, '<0.12')
    tl.to(overlay, { opacity: 0, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'none' }, '<0.08')
    if (hr)  tl.fromTo(hr,  { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out', transformOrigin: 'left center' }, '<0.4')
    if (nav) tl.fromTo(nav, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '<0.25')

    const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLDivElement[]
    if (lines.length) {
      tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'expo.out' }, '-=0.4')
    }
    if (meta) tl.fromTo(meta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2')
  }

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
    letterSpacing: '-0.035em',
    lineHeight: 0.93,
  }

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen overflow-hidden bg-black">

      {/* Prism — full bleed background */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="3drotate"
          timeScale={0.4}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          transparent={false}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.74) 55%, rgba(0,0,0,0.93) 100%)' }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0d0d0d)' }} />

      {/* ── PRELOADER ── */}
      <div ref={overlayRef} className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center">
        <div
          ref={wordmarkRef}
          className="font-display font-black text-white select-none"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          NATHAN MABASA
        </div>

        <div ref={counterWrapRef} className="absolute bottom-12 left-0 right-0 flex items-center justify-between px-8 md:px-14">
          <div className="flex items-center gap-1.5">
            <span ref={counterRef} className="text-[10px] font-mono text-white/40 tabular-nums">00</span>
            <span className="text-[10px] font-mono text-white/20">%</span>
          </div>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Loading</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06] overflow-hidden">
          <div ref={progressRef} className="absolute inset-y-0 left-0 right-0 bg-white/60 origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5"
        style={{ opacity: 0, transform: 'translateY(-100%)' }}
        aria-label="Main navigation"
      >
        <span className="text-[13px] font-display font-black text-white tracking-tight">NM</span>
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-[12px] text-white/50 hover:text-white transition-colors duration-200 tracking-wide">
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-[10px] text-white/35 tracking-wide">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            Available
          </span>
          <button onClick={() => scrollTo('#contact')} className="text-[11px] font-medium text-black bg-white px-4 py-1.5 hover:bg-white/80 transition-all duration-200 tracking-wide">
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center">

        {/* Location tag */}
        <div className="mb-7 inline-flex items-center gap-2 border border-white/10 rounded-full px-3.5 py-1 bg-black/20 backdrop-blur-md">
          <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-[10px] font-mono text-white/45 uppercase tracking-[0.18em]">Johannesburg, South Africa</span>
        </div>

        {/* Wordmark landing zone */}
        <div ref={heroHeadRef} className="mb-3" style={{ minHeight: 'clamp(1.6rem, 4vw, 3.2rem)' }} />

        {/* ── HEADLINE ── */}
        <div className="mb-7" aria-label="Digital Designer Developer Creator">

          {/* Line 1 — static "Digital" */}
          <div className="overflow-hidden">
            <div
              ref={line1Ref}
              className="font-display font-black text-white"
              style={{ ...titleStyle, transform: 'translateY(110%)', opacity: 0 }}
            >
              Digital
            </div>
          </div>

          {/* Line 2 — cycling word */}
          <div
            className="overflow-hidden"
            style={{ height: `calc(${titleStyle.fontSize} * ${titleStyle.lineHeight})` }}
          >
            <div
              ref={line2Ref}
              className="relative font-display font-black text-white"
              style={{ ...titleStyle, transform: 'translateY(110%)', opacity: 0 }}
            >
              {/*
                Two absolutely-stacked spans: cycleOut (current, exits up)
                and cycleIn (next, enters from below). Both sit inside the
                same overflow-hidden row so the clip is clean.
              */}
              <span ref={cycleOutRef} className="block" style={{ transform: 'translateY(0%)' }}>
                {CYCLE_WORDS[wordIdx]}
              </span>
              <span
                ref={cycleInRef}
                className="absolute top-0 left-0 right-0 text-center block"
                style={{ transform: 'translateY(110%)' }}
              >
                {CYCLE_WORDS[nextIdx]}
              </span>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div ref={metaRef} className="flex flex-col items-center gap-5" style={{ opacity: 0 }}>
          <p className="text-[13px] text-white/40 max-w-[26rem] leading-relaxed tracking-wide">
            <DecryptedText
              text="Brand identity, UI/UX, and creative development — built for founders and global brands."
              animateOn="view"
              speed={22}
              maxIterations={10}
              className="text-white/40"
              encryptedClassName="text-white/15"
            />
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('#work')}
              className="text-[11px] font-medium text-black bg-white px-5 py-2.5 hover:bg-white/85 transition-all duration-200 tracking-wide"
            >
              View Work
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="text-[11px] text-white/55 border border-white/12 px-5 py-2.5 hover:border-white/30 hover:text-white/80 transition-all duration-200 backdrop-blur-sm tracking-wide"
            >
              Get in Touch
            </button>
          </div>

          <div className="mt-3 flex flex-col items-center gap-1.5">
            <div className="w-px h-7 bg-white/12" />
            <span className="text-[9px] font-mono text-white/22 uppercase tracking-[0.22em]">Scroll</span>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        ref={hrRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04] z-10"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
    </section>
  )
}
