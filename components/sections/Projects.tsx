'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProjectCursor from '@/components/ProjectCursor'

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
  const rowRefs    = useRef<(HTMLLIElement | null)[]>([])
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    rowRefs.current.forEach((row) => {
      if (!row) return
      gsap.fromTo(
        row,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })

    const inner = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(inner,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="work" className="section bg-white">
      <ProjectCursor label="View" visible={hoveredRow !== null} />

      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">02 — Work</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="overflow-hidden">
            <h2 className="reveal-inner inline-block text-4xl md:text-5xl lg:text-6xl font-display font-extralight text-black tracking-[-0.03em] leading-[1.05]">
              Selected Projects
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-inner inline-block text-sm text-[#888] max-w-xs leading-relaxed">
              Brand, UI/UX, and creative development for studios and founders worldwide.
            </p>
          </div>
        </div>

        <ul>
          {PROJECTS.map((p, i) => (
            <li
              key={p.number}
              ref={(el) => { rowRefs.current[i] = el }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className="group opacity-0"
            >
              <div className="hr" />

              <div className="py-7 md:py-9 grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr_auto] gap-x-6 md:gap-x-10 items-center">
                <span
                  className="font-display font-extralight text-[#ccc] group-hover:text-black transition-colors duration-500 leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  {p.number}
                </span>

                <div>
                  <h3
                    className="font-display font-light text-black group-hover:text-[#555] transition-colors duration-300 leading-tight mb-2"
                    style={{ fontSize: 'clamp(1.4rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
                  >
                    {p.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[11px] text-[#888] font-mono uppercase tracking-[0.15em]">
                      {p.category}
                    </span>
                    <span className="text-[#ccc]">·</span>
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-[#aaa] font-sans">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                  <span className="text-[11px] font-mono text-[#aaa]">{p.year}</span>
                  <span className="text-2xl text-[#ccc] group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 inline-block">
                    ↗
                  </span>
                </div>
              </div>
            </li>
          ))}

          <li><div className="hr" /></li>
        </ul>

        <p className="mt-10 text-sm text-[#888] text-center">
          More projects available on request —{' '}
          <a href="mailto:hello@nathanmabasa.com" className="text-black hover:text-[#888] transition-colors duration-200">
            get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
