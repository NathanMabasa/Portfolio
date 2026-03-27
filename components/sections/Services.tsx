'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SERVICES = [
  { n: '01', title: 'Brand Identity & Strategy',   desc: 'Logos, colour systems, positioning, and brand guidelines. Strategy-first, aesthetics-always.' },
  { n: '02', title: 'UI & UX Design',               desc: 'User-centred interfaces — wireframes, flows, and high-fidelity prototypes that delight.' },
  { n: '03', title: 'Creative Development',         desc: 'Responsive websites and apps built with pixel-perfect precision and smooth animations.' },
  { n: '04', title: 'Motion & Interaction',         desc: 'Micro-interactions, scroll experiences, and motion design that make products unforgettable.' },
  { n: '05', title: 'Design Systems',               desc: 'Scalable component libraries and documentation that keep teams aligned and products consistent.' },
  { n: '06', title: 'Digital Strategy',             desc: 'Journey mapping, content strategy, and conversion optimisation for ambitious digital products.' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const lines = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    const rows = sectionRef.current.querySelectorAll<HTMLElement>('.service-row')
    rows.forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="section bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">03 — Services</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="overflow-hidden">
            <h2 className="reveal-inner text-4xl md:text-5xl lg:text-6xl font-display font-extralight text-black tracking-[-0.03em] leading-[1.05]">
              What I bring
              <br />
              <em className="not-italic text-[#aaa]">to the table.</em>
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-inner text-sm text-[#888] max-w-xs leading-relaxed">
              Full-spectrum design and development for founders, studios, and ambitious brands.
            </p>
          </div>
        </div>

        <ul>
          {SERVICES.map((s) => (
            <li key={s.n} className="service-row opacity-0">
              <div className="hr" />
              <div className="py-6 md:py-8 grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr_auto] gap-x-6 md:gap-x-10 items-center group">
                <span className="text-[11px] font-mono text-[#ccc] group-hover:text-black transition-colors duration-300">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-light text-black group-hover:text-[#555] transition-colors duration-300 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed max-w-xl">{s.desc}</p>
                </div>
                <span className="hidden md:block text-xl text-[#ddd] group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  ↗
                </span>
              </div>
            </li>
          ))}
          <li><div className="hr" /></li>
        </ul>
      </div>
    </section>
  )
}
