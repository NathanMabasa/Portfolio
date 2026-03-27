'use client'

import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
}

const wordReveal = {
  hidden: { y: 120, opacity: 0, skewY: 3 },
  show: {
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20 pt-28 pb-16"
    >
      {/* Background gradient orbs */}
      <div className="orb w-[500px] h-[500px] bg-accent/8 -bottom-32 -left-48 animate-pulse-glow" />
      <div className="orb w-[300px] h-[300px] bg-accent/4 top-1/3 -right-20" />

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2.5 mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs font-body text-accent tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          South Africa · Available for Work
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
        {['NATHAN', 'MABASA'].map((word) => (
          <div key={word} className="overflow-hidden leading-[0.88]">
            <motion.h1
              variants={wordReveal}
              className="text-[clamp(3.5rem,13vw,13rem)] font-display font-extrabold tracking-tight text-white"
            >
              {word}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* Divider + subtitle row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
      >
        {/* Left: descriptor */}
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="text-accent font-display font-semibold text-lg md:text-2xl mb-4">
            Digital Designer &amp; Creative Developer
          </p>
          <p className="text-fg-2 text-base md:text-lg leading-relaxed font-body">
            Crafting immersive web experiences at the intersection of strategy, aesthetics,
            and technology. Great design isn&apos;t just visual — it&apos;s a system of decisions.
          </p>
        </motion.div>

        {/* Right: CTAs */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 flex-shrink-0">
          <MagneticButton>
            <button
              onClick={() => scrollTo('#work')}
              className="px-7 py-4 border border-fg-3 text-white text-sm font-display font-medium rounded-full hover:border-accent hover:text-accent transition-all duration-300"
            >
              View Work ↓
            </button>
          </MagneticButton>
          <MagneticButton>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-4 bg-accent text-black text-sm font-display font-semibold rounded-full hover:bg-white transition-all duration-300"
            >
              Let&apos;s Talk →
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="mt-16 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <a
          href="mailto:hello@nathanmabasa.com"
          className="text-sm text-fg-3 font-body hover:text-accent transition-colors duration-300 link-underline"
        >
          hello@nathanmabasa.com
        </a>
        <div className="flex items-center gap-6 text-xs text-fg-3 font-mono uppercase tracking-widest">
          <span>Brand Identity</span>
          <span className="text-accent">·</span>
          <span>UI/UX</span>
          <span className="text-accent">·</span>
          <span>Creative Dev</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-16 bg-gradient-to-b from-accent to-transparent"
        />
        <span className="text-[10px] text-fg-3 font-mono tracking-[0.2em] uppercase rotate-90 origin-center mt-2">
          scroll
        </span>
      </motion.div>
    </section>
  )
}
