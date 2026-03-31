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

      {/* Watermark */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <p
          className="font-display font-black text-white/[0.012] leading-none text-center translate-y-5 whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', letterSpacing: '-0.04em' }}
        >
          NATHANMABASA
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-8 relative z-10">

        {/* CTA row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <p className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em] mb-4">
              Ready to create something?
            </p>
            <h2
              className="font-display font-black text-white leading-[0.92] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              Let&apos;s build something<br />remarkable.
            </h2>
            <a
              href="mailto:hello@nathanmabasa.com"
              className="text-[13px] font-mono text-[#3a3a3a] hover:text-white/60 transition-colors duration-200 link-underline"
            >
              hello@nathanmabasa.com
            </a>
          </div>

          <div className="flex gap-14">
            <div>
              <p className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em] mb-4">Nav</p>
              <ul className="space-y-2.5">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollTo(l.href)}
                      className="text-[13px] text-[#3a3a3a] hover:text-white/60 transition-colors duration-200"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em] mb-4">Social</p>
              <ul className="space-y-2.5">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#3a3a3a] hover:text-white/60 transition-colors duration-200"
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
        <div className="h-px bg-white/[0.04] mb-5" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[13px] font-display font-black text-white/60">NM</Link>
            <span className="text-[10px] font-mono text-[#222]">© {new Date().getFullYear()} Nathan Mabasa</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-mono text-[#222]">Johannesburg, South Africa</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] font-mono text-[#2a2a2a] hover:text-white/50 transition-colors duration-200"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
