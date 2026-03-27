'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://linkedin.com/in/nyikonathan-mabasa/', label: 'LinkedIn' },
  { href: 'https://instagram.com/nathanmabasa', label: 'Instagram' },
  { href: 'https://twitter.com/nathanmabasa', label: 'Twitter' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Large name watermark */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <p className="text-[clamp(4rem,14vw,12rem)] font-display font-extrabold text-white/[0.03] leading-none tracking-tight whitespace-nowrap text-center translate-y-8">
          NATHANMABASA
        </p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* Top: CTA + info */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-fg-3 uppercase tracking-widest mb-4"
            >
              Ready to create something extraordinary?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6"
            >
              Let&apos;s build something
              <br />
              <span className="text-accent">remarkable together.</span>
            </motion.h2>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="mailto:hello@nathanmabasa.com"
              className="text-lg md:text-2xl font-display font-semibold text-white hover:text-accent transition-colors duration-300 link-underline"
            >
              hello@nathanmabasa.com
            </motion.a>
          </div>

          <div className="flex flex-col gap-6">
            {/* Nav links */}
            <div>
              <p className="text-xs font-mono text-fg-3 uppercase tracking-widest mb-4">
                Navigation
              </p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-fg-2 hover:text-white transition-colors duration-300 font-body"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-fg-3 uppercase tracking-widest mb-4">
                Social
              </p>
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-2 hover:text-accent transition-colors duration-300 font-body link-underline"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-display font-bold text-white text-sm">
              NM
            </Link>
            <span className="text-xs text-fg-3 font-body">
              © {new Date().getFullYear()} Nathan Mabasa. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-fg-3 font-body">South Africa 🌍</span>
            <button
              onClick={scrollToTop}
              className="text-xs text-fg-3 hover:text-accent transition-colors duration-300 font-mono flex items-center gap-1"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
