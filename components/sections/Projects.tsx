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
  },
  {
    number: '02',
    title: 'The Media Krate',
    category: 'Brand Identity & Web Design',
    year: '2024',
    tags: ['Brand Identity', 'Logo', 'Strategy'],
  },
  {
    number: '03',
    title: 'Maxwell Stay',
    category: 'Luxury Hospitality UI/UX',
    year: '2024',
    tags: ['UI/UX', 'Development', 'Luxury'],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (!sectionRef.current) return

    const inner = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(inner,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.85, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      }
    )

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: i * 0.08,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="work" className="section bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">02 — Work</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="overflow-hidden">
            <h2 className="reveal-inner font-display font-black text-white leading-[0.92]"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}>
              Selected Work
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-inner text-[13px] text-[#555] max-w-xs leading-relaxed">
              Brand, UI/UX, and creative development for studios and founders worldwide.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {PROJECTS.map((p, i) => (
            <div
              key={p.number}
              ref={(el) => { cardRefs.current[i] = el }}
              className="group opacity-0 bg-[#0d0d0d] hover:bg-[#111] transition-colors duration-500 cursor-none"
            >
              <div className="p-8 flex flex-col h-full min-h-[300px]">
                <div className="flex items-center justify-between mb-auto pb-10">
                  <span className="text-[10px] font-mono text-[#2a2a2a] tracking-[0.15em]">{p.number}</span>
                  <span className="text-[10px] font-mono text-[#2a2a2a]">{p.year}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-[#2a2a2a] border border-white/[0.06] px-2 py-0.5 group-hover:text-[#555] group-hover:border-white/10 transition-all duration-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="font-display font-bold text-white leading-tight group-hover:text-white/80 transition-colors duration-300 mb-3"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em' }}
                >
                  {p.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#3a3a3a] uppercase tracking-[0.15em]">{p.category}</span>
                  <span className="text-sm text-[#2a2a2a] group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 inline-block">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[12px] font-mono text-[#3a3a3a]">
            More on request —{' '}
            <a href="mailto:hello@nathanmabasa.com" className="text-[#666] hover:text-white transition-colors duration-200">
              hello@nathanmabasa.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
