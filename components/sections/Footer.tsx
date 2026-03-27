'use client'

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
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative bg-[#080808] border-t border-[#141414] overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <p className="text-[clamp(3rem,12vw,10rem)] font-display font-light text-white/[0.025] leading-none tracking-[-0.03em] text-center translate-y-4 whitespace-nowrap">
          NATHANMABASA
        </p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 pt-16 pb-8">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#444] mb-4">
              Ready to create something extraordinary?
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-light text-white leading-tight mb-6 tracking-[-0.02em]">
              Let&apos;s build something
              <br />
              <span className="italic text-accent">remarkable.</span>
            </h2>
            <a
              href="mailto:hello@nathanmabasa.com"
              className="text-base font-display text-[#888] hover:text-white transition-colors duration-200 link-underline"
            >
              hello@nathanmabasa.com
            </a>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#444] mb-4">Navigation</p>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollTo(l.href)}
                      className="text-sm text-[#555] hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#444] mb-4">Social</p>
              <ul className="space-y-2.5">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#555] hover:text-accent transition-colors duration-200"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#141414] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm font-display font-medium text-white">NM</Link>
            <span className="text-xs text-[#3a3a3a]">
              © {new Date().getFullYear()} Nathan Mabasa. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-xs text-[#3a3a3a]">South Africa 🌍</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-[#3a3a3a] hover:text-accent transition-colors duration-200"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
