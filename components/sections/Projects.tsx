'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PROJECTS = [
  {
    number: '01',
    title: 'Comtech Network Solutions',
    category: 'Web Design & Development',
    year: '2024',
    tags: ['Web Design', 'Development', 'Brand'],
    bg: '#111111',
  },
  {
    number: '02',
    title: 'The Media Krate',
    category: 'Brand Identity & Web Design',
    year: '2024',
    tags: ['Brand Identity', 'Logo', 'Strategy'],
    bg: '#0f0f0f',
  },
  {
    number: '03',
    title: 'Maxwell Stay',
    category: 'Luxury Hospitality UI/UX',
    year: '2024',
    tags: ['UI/UX', 'Development', 'Luxury'],
    bg: '#131313',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (!sectionRef.current) return

    // Section heading reveal
    const inner = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(inner,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      }
    )

    // Staggered card reveal — each card slides up from slight diagonal offset
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, x: i % 2 === 0 ? -20 : 20, rotate: i % 2 === 0 ? -1 : 1 },
        {
          opacity: 1, y: 0, x: 0, rotate: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="work" className="section bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">02 — Work</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="overflow-hidden">
            <h2 className="reveal-inner inline-block font-display font-black text-white tracking-[-0.04em] leading-[0.92]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
              Selected
              <br />
              <span className="text-accent">Projects</span>
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-inner inline-block text-sm text-[#555] max-w-xs leading-relaxed">
              Brand, UI/UX, and creative development for studios and founders worldwide.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PROJECTS.map((p, i) => (
            <div
              key={p.number}
              ref={(el) => { cardRefs.current[i] = el }}
              className="group opacity-0 border border-[#1a1a1a] hover:border-accent/30 transition-all duration-500 cursor-none"
              style={{ background: p.bg }}
            >
              <div className="p-8 flex flex-col h-full min-h-[320px]">
                {/* Number + year */}
                <div className="flex items-center justify-between mb-auto pb-12">
                  <span className="text-[11px] font-mono text-[#333] tracking-[0.15em]">{p.number}</span>
                  <span className="text-[11px] font-mono text-[#333]">{p.year}</span>
                </div>

                {/* Category tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-[#333] border border-[#222] px-2 py-0.5 group-hover:border-accent/20 group-hover:text-[#555] transition-all duration-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-white leading-tight group-hover:text-accent transition-colors duration-300 mb-3"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em' }}
                >
                  {p.title}
                </h3>

                {/* Category + arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#444] uppercase tracking-[0.15em]">
                    {p.category}
                  </span>
                  <span className="text-lg text-[#222] group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 inline-block">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#444] text-center">
          More projects on request —{' '}
          <a href="mailto:hello@nathanmabasa.com" className="text-accent hover:text-white transition-colors duration-200">
            get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
