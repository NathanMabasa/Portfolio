'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATS = [
  { value: '5+',  label: 'Years of Experience' },
  { value: '40+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '3',   label: 'Continents Reached' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // All .reveal-inner elements animate up with stagger
    const lines = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.09, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    // Stats count-up
    const statEls = sectionRef.current.querySelectorAll<HTMLElement>('.stat-value')
    statEls.forEach((el) => {
      const target = parseFloat(el.dataset.target ?? '0')
      const isInt  = Number.isInteger(target)
      const obj    = { n: 0 }
      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = (isInt ? Math.floor(obj.n) : obj.n.toFixed(1)) + (el.dataset.suffix ?? '')
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="section bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">01 — About</div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left — text */}
          <div>
            <div className="overflow-hidden mb-8">
              <h2 className="reveal-inner text-4xl md:text-5xl font-display font-extralight text-white tracking-[-0.03em] leading-[1.1]">
                The person behind
                <br />
                <em className="not-italic text-[#555]">the screen.</em>
              </h2>
            </div>

            <div className="overflow-hidden mb-6">
              <p className="reveal-inner text-base text-[#666] leading-relaxed">
                I&apos;m Nathan Mabasa — a South African digital designer and creative developer
                working at the intersection of strategy, aesthetics, and technology.
              </p>
            </div>

            <div className="overflow-hidden mb-8">
              <blockquote className="reveal-inner border-l-2 border-accent pl-5">
                <p className="text-lg font-display font-light text-white leading-snug italic">
                  &ldquo;Great design isn&apos;t just visual — it&apos;s a system of decisions.&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="overflow-hidden mb-6">
              <p className="reveal-inner text-sm text-[#555] leading-relaxed">
                I specialise in brand identity, UI/UX, motion design, creative development,
                and design systems. I work with founders and global brands to turn complex
                challenges into beautiful, functional digital experiences.
              </p>
            </div>

            <div className="overflow-hidden">
              <p className="reveal-inner text-[11px] font-mono text-[#333] uppercase tracking-[0.2em]">
                Based in South Africa · Open to international work
              </p>
            </div>
          </div>

          {/* Right — stats + tags */}
          <div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-[#111] rounded-none mb-8">
              {STATS.map((s) => (
                <div key={s.label} className="bg-black p-8 border border-[#111]">
                  <div
                    className="stat-value text-4xl md:text-5xl font-display font-extralight text-accent mb-2 tabular-nums"
                    data-target={parseFloat(s.value)}
                    data-suffix={s.value.includes('+') ? '+' : ''}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-[#444] font-sans tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                'Brand Identity', 'UI / UX', 'Motion Design',
                'Design Systems', 'Creative Dev', 'Web Development', 'Digital Strategy',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 border border-[#1a1a1a] text-xs text-[#444] hover:border-accent/40 hover:text-[#999] transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
