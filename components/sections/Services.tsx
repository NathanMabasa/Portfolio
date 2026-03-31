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
        stagger: 0.07, duration: 0.85, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.service-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.08, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="section bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">03 — Services</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="overflow-hidden">
            <h2
              className="reveal-inner font-display font-black text-white leading-[0.92]"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}
            >
              What I bring<br />to the table.
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-inner text-[13px] text-[#555] max-w-xs leading-relaxed">
              Full-spectrum design and development for founders, studios, and ambitious brands.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-white/[0.04]">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="service-card opacity-0 bg-[#0d0d0d] p-9 group hover:bg-[#0f0f0f] transition-colors duration-400 relative overflow-hidden"
            >
              {/* Top line — white on hover */}
              <div className="absolute top-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-500" />

              <div className="flex items-start justify-between mb-8">
                <span className="text-[10px] font-mono text-[#2a2a2a] group-hover:text-[#555] transition-colors duration-300">{s.n}</span>
                <span className="text-sm text-[#222] group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">↗</span>
              </div>

              <h3
                className="font-display font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em' }}
              >
                {s.title}
              </h3>

              <p className="text-[13px] text-[#555] leading-relaxed mb-6">{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-[#2a2a2a] border border-white/[0.05] px-2 py-0.5 group-hover:text-[#444] group-hover:border-white/10 transition-all duration-300">
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
