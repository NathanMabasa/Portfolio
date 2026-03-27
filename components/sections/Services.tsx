'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'

const services = [
  {
    number: '01',
    title: 'Brand Identity & Strategy',
    description:
      'From positioning and naming to logos, colour systems, and guidelines — I build brands that resonate and endure. Strategy-first, aesthetics-always.',
    features: ['Logo & Visual Identity', 'Brand Strategy', 'Guidelines & Systems', 'Brand Collateral'],
  },
  {
    number: '02',
    title: 'UI & UX Design',
    description:
      'User-centred interfaces that are intuitive, accessible, and visually compelling. I design flows, wireframes, and high-fidelity prototypes that delight users.',
    features: ['User Research', 'Wireframing', 'UI Design', 'Interactive Prototypes'],
  },
  {
    number: '03',
    title: 'Creative Development',
    description:
      'I bridge design and code — building responsive, performant websites and web apps with pixel-perfect precision and smooth animations that bring designs to life.',
    features: ['Next.js / React', 'Motion & Animation', 'Responsive Development', 'CMS Integration'],
  },
  {
    number: '04',
    title: 'Motion & Interaction',
    description:
      'Micro-interactions, transitions, scroll animations, and motion design that elevate digital experiences from good to unforgettable.',
    features: ['Framer Motion', 'GSAP Animations', 'Interaction Design', 'Scroll Experiences'],
  },
  {
    number: '05',
    title: 'Design Systems',
    description:
      'Scalable, documented component libraries that keep teams aligned and products consistent. Built to grow with your product.',
    features: ['Component Libraries', 'Design Tokens', 'Documentation', 'Figma Systems'],
  },
  {
    number: '06',
    title: 'Digital Strategy',
    description:
      'Strategic thinking for digital products — from user journey mapping and content strategy to conversion optimisation and go-to-market positioning.',
    features: ['User Journey Mapping', 'Content Strategy', 'CRO', 'Launch Strategy'],
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="section relative overflow-hidden bg-surface">
      <div className="orb w-[400px] h-[400px] bg-accent/5 bottom-0 left-0 animate-pulse-glow" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Label */}
        <div className="section-label">
          <span>03 — Services</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
              What I Bring
              <br />
              <span className="text-accent">to the Table</span>
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-fg-2 text-sm font-body max-w-xs"
          >
            Full-spectrum design and development services tailored to founders, studios, and ambitious brands.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-bg p-8 hover:bg-surface transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-mono text-accent">{service.number}</span>
                <span className="text-xl text-fg-3 group-hover:text-accent transition-colors duration-300">
                  ↗
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-400">
                {service.title}
              </h3>
              <p className="text-fg-2 text-sm leading-relaxed font-body mb-6 flex-1">
                {service.description}
              </p>
              <ul className="space-y-1.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-fg-3 font-body">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {feature}
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
