'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'

const stats = [
  { value: '5+', label: 'Years of Experience' },
  { value: '40+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '3', label: 'Continents Reached' },
]

const fadeUp = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="section relative overflow-hidden">
      {/* Background orb */}
      <div className="orb w-[600px] h-[600px] bg-accent/5 -top-32 -right-64 animate-pulse-glow" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Label */}
        <div className="section-label">
          <span>01 — About</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <TextReveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.05] mb-8">
                The Person Behind the Screen
              </h2>
            </TextReveal>

            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-fg-2 text-lg leading-relaxed mb-8 font-body"
            >
              I&apos;m Nathan Mabasa — a South African digital designer and creative developer who
              believes that the best work happens at the intersection of strategy, aesthetics,
              and technology.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              variants={fadeUp(0.4)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="relative pl-6 border-l-2 border-accent mb-8"
            >
              <p className="text-xl md:text-2xl font-display font-semibold text-white leading-snug italic">
                &ldquo;Great design isn&apos;t just visual — it&apos;s a system of decisions.&rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              variants={fadeUp(0.5)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-fg-2 text-base leading-relaxed mb-8 font-body"
            >
              I specialise in brand identity, UI/UX design, motion and interaction design,
              creative development, and design systems. I work with founders, studios, and
              brands across the globe to turn complex challenges into clear, beautiful,
              and functional digital experiences.
            </motion.p>

            <motion.p
              variants={fadeUp(0.6)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-fg-2 text-base leading-relaxed font-body"
            >
              Based in South Africa — open to international projects, collaborations,
              and full-time opportunities.
            </motion.p>
          </div>

          {/* Right: Stats + visual */}
          <div>
            {/* Stats grid */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden mb-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface p-8 flex flex-col"
                >
                  <span className="text-5xl font-display font-bold text-accent mb-2 tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-sm text-fg-2 font-body">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Expertise tags */}
            <motion.div
              variants={fadeUp(0.6)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="flex flex-wrap gap-2"
            >
              {[
                'Brand Identity',
                'UI / UX Design',
                'Motion Design',
                'Design Systems',
                'Creative Dev',
                'Digital Strategy',
                'Web Development',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-border text-sm text-fg-2 font-body hover:border-accent hover:text-accent transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
