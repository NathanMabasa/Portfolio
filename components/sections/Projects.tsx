'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'

const projects = [
  {
    number: '01',
    title: 'Comtech Network Solutions',
    category: 'Web Design & Development',
    description:
      'Full-stack web design and development for an IT infrastructure company. Crafted a clean, professional digital presence that communicates technical authority while remaining approachable to all stakeholders.',
    tags: ['Web Design', 'Development', 'Brand', 'UI/UX'],
    year: '2024',
    accent: '#0066FF',
    bg: 'from-blue-950/40 to-surface',
  },
  {
    number: '02',
    title: 'The Media Krate',
    category: 'Brand Identity & Web Design',
    description:
      'Comprehensive brand identity and web design for a dynamic media brand. Built a visual language that captures the energy and creativity of the media industry, from logo system through to digital touchpoints.',
    tags: ['Brand Identity', 'Logo Design', 'Web Design', 'Strategy'],
    year: '2024',
    accent: '#9B5CF6',
    bg: 'from-purple-950/40 to-surface',
  },
  {
    number: '03',
    title: 'Maxwell Stay',
    category: 'Luxury Hospitality UI/UX',
    description:
      'Elevated UI/UX design and development for a luxury hospitality brand. The experience centres around warmth, exclusivity and effortless booking — ensuring every interaction reflects the premium nature of the property.',
    tags: ['UI/UX Design', 'Development', 'Luxury', 'Hospitality'],
    year: '2024',
    accent: '#F5C842',
    bg: 'from-yellow-950/30 to-surface',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="work" ref={ref} className="section relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Label */}
        <div className="section-label">
          <span>02 — Work</span>
        </div>

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
              Selected Projects
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-fg-2 text-sm font-body max-w-xs"
          >
            A selection of recent projects across brand, UI/UX, and creative development.
          </motion.p>
        </div>

        {/* Projects list */}
        <div className="space-y-px">
          {projects.map((project, i) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              className={`
                group relative rounded-2xl overflow-hidden border border-border
                bg-gradient-to-br ${project.bg}
                transition-all duration-500 cursor-pointer
                ${activeProject === i ? 'border-opacity-60 scale-[1.01]' : ''}
              `}
              style={{
                borderColor: activeProject === i ? `${project.accent}40` : undefined,
              }}
            >
              <div className="p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
                {/* Number */}
                <span
                  className="text-5xl md:text-6xl font-display font-bold leading-none transition-colors duration-300"
                  style={{ color: activeProject === i ? project.accent : '#333' }}
                >
                  {project.number}
                </span>

                {/* Content */}
                <div>
                  <p className="text-xs font-mono tracking-widest uppercase text-fg-3 mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-fg-2 text-sm md:text-base leading-relaxed font-body mb-6 max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-body border border-border text-fg-3 transition-colors duration-300"
                        style={{
                          borderColor: activeProject === i ? `${project.accent}40` : undefined,
                          color: activeProject === i ? project.accent : undefined,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: year + arrow */}
                <div className="flex flex-col items-end gap-4">
                  <span className="text-xs font-mono text-fg-3">{project.year}</span>
                  <motion.span
                    animate={{
                      x: activeProject === i ? 4 : 0,
                      y: activeProject === i ? -4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl"
                    style={{ color: activeProject === i ? project.accent : '#444' }}
                  >
                    ↗
                  </motion.span>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${project.accent}08, transparent 60%)`,
                }}
              />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-fg-2 text-sm font-body mb-4">
            More projects available on request.
          </p>
          <a
            href="mailto:hello@nathanmabasa.com"
            className="inline-flex items-center gap-2 text-accent font-display font-semibold text-sm hover:gap-4 transition-all duration-300 link-underline"
          >
            Get in touch to see more
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
