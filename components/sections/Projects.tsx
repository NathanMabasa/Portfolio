'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'Comtech Network Solutions',
    category: 'Web Design & Development',
    description:
      'Full-stack web design and development for an IT infrastructure company. A clean, authoritative digital presence that communicates technical expertise while remaining approachable to all stakeholders.',
    tags: ['Web Design', 'Development', 'Brand', 'UI/UX'],
    year: '2024',
    accent: '#0066FF',
    highlight: 'rgba(0,102,255,0.06)',
  },
  {
    number: '02',
    title: 'The Media Krate',
    category: 'Brand Identity & Web Design',
    description:
      'Comprehensive brand identity and web design for a dynamic media brand. A visual language that captures the energy and creativity of media — from logo system through to every digital touchpoint.',
    tags: ['Brand Identity', 'Logo Design', 'Web Design', 'Strategy'],
    year: '2024',
    accent: '#9B5CF6',
    highlight: 'rgba(155,92,246,0.06)',
  },
  {
    number: '03',
    title: 'Maxwell Stay',
    category: 'Luxury Hospitality UI/UX',
    description:
      'Elevated UI/UX design and development for a luxury hospitality brand. Every interaction reflects warmth, exclusivity, and effortless navigation — ensuring the experience matches the quality of the property.',
    tags: ['UI/UX Design', 'Development', 'Luxury', 'Hospitality'],
    year: '2024',
    accent: '#F5C842',
    highlight: 'rgba(245,200,66,0.05)',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="work" ref={ref} className="section bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">02 — Work</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-light tracking-[-0.02em] text-white leading-[1.1]"
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-[#555] max-w-xs"
          >
            A selection of recent work across brand, UI/UX, and creative development.
          </motion.p>
        </div>

        {/* Project rows */}
        <div className="space-y-px">
          {projects.map((p, i) => (
            <motion.article
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative rounded-xl border border-[#1a1a1a] overflow-hidden transition-all duration-500"
              style={{ backgroundColor: active === i ? p.highlight : 'transparent' }}
            >
              <div className="p-7 md:p-9 grid md:grid-cols-[64px_1fr_auto] gap-6 items-start">
                {/* Number */}
                <span
                  className="text-4xl font-display font-light transition-colors duration-300 leading-none mt-1"
                  style={{ color: active === i ? p.accent : '#2a2a2a' }}
                >
                  {p.number}
                </span>

                {/* Content */}
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#555] mb-2">{p.category}</p>
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-3 group-hover:text-white">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed mb-5 max-w-2xl">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[11px] border border-[#1e1e1e] text-[#555] transition-all duration-300"
                        style={{ borderColor: active === i ? `${p.accent}30` : undefined, color: active === i ? p.accent : undefined }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow + year */}
                <div className="flex flex-col items-end gap-3 pt-1">
                  <span className="text-[11px] font-mono text-[#444]">{p.year}</span>
                  <motion.div
                    animate={{ x: active === i ? 3 : 0, y: active === i ? -3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: active === i ? p.accent : '#333' }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Border accent on hover */}
              <div
                className="absolute inset-x-0 bottom-0 h-px transition-opacity duration-300"
                style={{ background: p.accent, opacity: active === i ? 0.3 : 0 }}
              />
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 text-sm text-[#555] text-center"
        >
          More projects available on request —{' '}
          <a href="mailto:hello@nathanmabasa.com" className="text-accent hover:underline">
            hello@nathanmabasa.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
