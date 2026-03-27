'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '5+', label: 'Years of Experience' },
  { value: '40+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '3', label: 'Continents Reached' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
  })

  return (
    <section id="about" ref={ref} className="section relative bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">01 — About</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left */}
          <div>
            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-4xl md:text-5xl font-display font-light leading-[1.1] tracking-[-0.02em] text-white mb-8"
            >
              The person behind
              <br />
              <span className="italic text-[#888]">the screen.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp(0.25)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-[#888] text-base leading-relaxed mb-6"
            >
              I&apos;m Nathan Mabasa — a South African digital designer and creative developer
              who believes that the best work happens at the intersection of strategy, aesthetics,
              and technology.
            </motion.p>

            <motion.blockquote
              variants={fadeUp(0.35)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="border-l-2 border-accent pl-5 mb-6"
            >
              <p className="text-lg font-display font-light italic text-white leading-snug">
                &ldquo;Great design isn&apos;t just visual — it&apos;s a system of decisions.&rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              variants={fadeUp(0.45)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-[#666] text-sm leading-relaxed mb-8"
            >
              I specialise in brand identity, UI/UX, motion design, creative development,
              and design systems. I work with founders, studios, and global brands to turn
              complex challenges into beautiful, functional digital experiences.
            </motion.p>

            <motion.p
              variants={fadeUp(0.55)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="text-[#555] text-sm"
            >
              Based in South Africa · Open to international projects &amp; collaborations
            </motion.p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-[#1a1a1a] rounded-xl overflow-hidden">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="bg-[#0a0a0a] p-8"
                >
                  <div className="text-4xl font-display font-light text-accent mb-1.5">{s.value}</div>
                  <div className="text-xs text-[#666] tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {['Brand Identity', 'UI / UX', 'Motion Design', 'Design Systems', 'Creative Dev', 'Web Development', 'Digital Strategy'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full border border-[#222] text-xs text-[#666] hover:border-accent/40 hover:text-[#aaa] transition-all duration-300"
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
