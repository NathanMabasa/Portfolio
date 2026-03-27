'use client'

import Link from 'next/link'

const NAV = [
  { href: '#work',      label: 'Work' },
  { href: '#about',     label: 'About' },
  { href: '#services',  label: 'Services' },
  { href: '#contact',   label: 'Contact' },
]

const SOCIAL = [
  { href: 'https://linkedin.com/in/nyikonathan-mabasa/', label: 'LinkedIn' },
  { href: 'https://instagram.com/nathanmabasa',          label: 'Instagram' },
  { href: 'https://twitter.com/nathanmabasa',            label: 'Twitter' },
]

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-[#080808] border-t border-white/[0.04] overflow-hidden relative">
      {/* Large watermark */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <p className="font-display font-black text-white/[0.015] leading-none text-center translate-y-6 whitespace-nowrap tracking-[-0.04em]"
          style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}>
          NATHANMABASA
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-8 relative z-10">
        {/* CTA row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-4">
              Ready to create something extraordinary?
            </p>
            <h2 className="font-display font-black text-white tracking-[-0.04em] leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Let&apos;s build something
              <br />
              <span className="text-accent">remarkable.</span>
            </h2>
            <a href="mailto:hello@nathanmabasa.com"
              className="text-base font-display font-medium text-[#555] hover:text-white transition-colors duration-200 link-underline">
              hello@nathanmabasa.com
            </a>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-4">Nav</p>
              <ul className="space-y-2.5">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <button onClick={() => scrollTo(l.href)}
                      className="text-sm text-[#444] hover:text-white transition-colors duration-200">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-4">Social</p>
              <ul className="space-y-2.5">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-[#444] hover:text-accent transition-colors duration-200">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/[0.04] mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm font-display font-black text-white">NM</Link>
            <span className="text-[11px] font-mono text-[#222]">© {new Date().getFullYear()} Nathan Mabasa</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[11px] font-mono text-[#222]">Johannesburg, South Africa</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[11px] font-mono text-[#333] hover:text-accent transition-colors duration-200">
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
