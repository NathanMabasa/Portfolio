'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SERVICES = [
  {
    n: '01',
    title: 'Brand Identity',
    desc: 'Logos, colour systems, positioning, and brand guidelines. Strategy-first, aesthetics-always.',
    tags: ['Logo', 'Guidelines', 'Strategy'],
  },
  {
    n: '02',
    title: 'UI & UX Design',
    desc: 'User-centred interfaces — wireframes, flows, and high-fidelity prototypes that delight.',
    tags: ['Wireframes', 'Prototypes', 'Figma'],
  },
  {
    n: '03',
    title: 'Creative Development',
    desc: 'Responsive websites and apps built with pixel-perfect precision and smooth animations.',
    tags: ['Next.js', 'GSAP', 'Tailwind'],
  },
  {
    n: '04',
    title: 'Motion & Interaction',
    desc: 'Micro-interactions, scroll experiences, and motion design that make products unforgettable.',
    tags: ['GSAP', 'Lenis', 'ScrollTrigger'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const inner = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(inner,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.service-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="section bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">03 — Services</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="overflow-hidden">
            <h2 className="reveal-inner font-display font-black text-white tracking-[-0.04em] leading-[0.92]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
              What I bring
              <br />
              <span className="text-accent">to the table.</span>
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-inner text-sm text-[#555] max-w-xs leading-relaxed">
              Full-spectrum design and development for founders, studios, and ambitious brands.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-[#1a1a1a]">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="service-card opacity-0 bg-[#0d0d0d] p-10 group hover:bg-[#111] transition-all duration-400 relative overflow-hidden"
            >
              {/* Lime accent line on hover */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />

              <div className="flex items-start justify-between mb-8">
                <span className="text-[11px] font-mono text-[#333] group-hover:text-accent transition-colors duration-300">
                  {s.n}
                </span>
                <span className="text-xl text-[#222] group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  ↗
                </span>
              </div>

              <h3 className="font-display font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                {s.title}
              </h3>

              <p className="text-sm text-[#555] leading-relaxed mb-6">{s.desc}</p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[#333] border border-[#1a1a1a] px-2 py-0.5 group-hover:border-accent/20 group-hover:text-[#555] transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
