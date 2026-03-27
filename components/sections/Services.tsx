'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    n: '01',
    title: 'Brand Identity & Strategy',
    desc: 'From positioning to logos, colour systems, and guidelines — brands that resonate and endure. Strategy-first, aesthetics-always.',
    features: ['Logo & Visual Identity', 'Brand Strategy', 'Style Guidelines', 'Brand Collateral'],
  },
  {
    n: '02',
    title: 'UI & UX Design',
    desc: 'User-centred interfaces that are intuitive, accessible, and compelling. Flows, wireframes, and high-fidelity prototypes.',
    features: ['User Research', 'Wireframing', 'UI Design', 'Interactive Prototypes'],
  },
  {
    n: '03',
    title: 'Creative Development',
    desc: 'Bridging design and code — responsive, performant websites with pixel-perfect precision and animations that bring designs to life.',
    features: ['Next.js / React', 'Motion & Animation', 'Responsive Dev', 'CMS Integration'],
  },
  {
    n: '04',
    title: 'Motion & Interaction',
    desc: 'Micro-interactions, transitions, and scroll animations that elevate experiences from good to unforgettable.',
    features: ['Framer Motion', 'GSAP', 'Interaction Design', 'Scroll Experiences'],
  },
  {
    n: '05',
    title: 'Design Systems',
    desc: 'Scalable, documented component libraries that keep teams aligned and products consistent.',
    features: ['Component Libraries', 'Design Tokens', 'Documentation', 'Figma Systems'],
  },
  {
    n: '06',
    title: 'Digital Strategy',
    desc: 'Strategic thinking for digital products — user journey mapping, content strategy, and conversion optimisation.',
    features: ['User Journey Mapping', 'Content Strategy', 'CRO', 'Launch Strategy'],
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" ref={ref} className="section bg-[#080808]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">03 — Services</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-display font-light tracking-[-0.02em] text-white leading-[1.1]"
          >
            What I bring
            <br />
            <span className="italic text-[#888]">to the table.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-sm text-[#555] max-w-xs"
          >
            Full-spectrum design and development for founders, studios, and ambitious brands.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#161616] rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="group bg-[#0a0a0a] p-8 hover:bg-[#0e0e0e] transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono text-accent">{s.n}</span>
                <span className="text-[#333] text-lg group-hover:text-accent transition-colors duration-300">↗</span>
              </div>
              <h3 className="text-base font-display font-medium text-white mb-3 group-hover:text-accent transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-sm text-[#666] leading-relaxed mb-6 flex-1">{s.desc}</p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-[#444]">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
