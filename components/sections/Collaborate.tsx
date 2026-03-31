'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TIMEZONES = [
  { city: 'Johannesburg', offset: 'UTC+2' },
  { city: 'London',       offset: 'UTC+0/+1' },
  { city: 'New York',     offset: 'UTC-5/-4' },
  { city: 'Dubai',        offset: 'UTC+4' },
  { city: 'Singapore',    offset: 'UTC+8' },
  { city: 'Toronto',      offset: 'UTC-5/-4' },
]

const PROCESS = [
  { n: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and competitive landscape.' },
  { n: '02', title: 'Strategy',  desc: 'Defining direction — positioning, structure, and visual language.' },
  { n: '03', title: 'Design',    desc: 'Crafting every detail with intention. Iteration until it\'s right.' },
  { n: '04', title: 'Deliver',   desc: 'Production-ready files, code, or full deployment. Clean handoff.' },
]

export default function Collaborate() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const inner = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(inner,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.07, duration: 0.85, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.tz-card, .process-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        stagger: 0.06, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="collaborate" className="section bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">05 — Process</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left — heading + timezones */}
          <div>
            <div className="overflow-hidden mb-6">
              <h2
                className="reveal-inner font-display font-black text-white leading-[0.92]"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}
              >
                Built for<br />everywhere.
              </h2>
            </div>
            <div className="overflow-hidden mb-10">
              <p className="reveal-inner text-[13px] text-[#555] leading-relaxed max-w-sm">
                From Johannesburg to London, New York to Dubai — collaborating
                with founders and studios across time zones, delivering
                world-class design and development remotely.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/[0.04] mb-10">
              {TIMEZONES.map((tz) => (
                <div key={tz.city} className="tz-card opacity-0 bg-[#0a0a0a] px-4 py-4 hover:bg-[#0f0f0f] transition-colors duration-300">
                  <p className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-[0.15em] mb-1">{tz.offset}</p>
                  <p className="text-[13px] font-display font-semibold text-white/70">{tz.city}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden">
              <p className="reveal-inner text-[10px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em]">
                Remote · async-friendly · quick to respond
              </p>
            </div>
          </div>

          {/* Right — process steps */}
          <div>
            <p className="reveal-inner text-[10px] font-mono text-[#3a3a3a] uppercase tracking-[0.2em] mb-8">
              How I work
            </p>

            <div className="space-y-px">
              {PROCESS.map((step) => (
                <div
                  key={step.n}
                  className="process-card opacity-0 group flex items-start gap-6 bg-[#0a0a0a] hover:bg-[#0f0f0f] border-b border-white/[0.04] py-6 transition-colors duration-300"
                >
                  <span className="text-[10px] font-mono text-[#2a2a2a] mt-0.5 flex-shrink-0 group-hover:text-[#444] transition-colors">{step.n}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-white/80 mb-1 group-hover:text-white transition-colors">{step.title}</p>
                    <p className="text-[13px] text-[#555] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 p-7 border border-white/[0.06]">
              <p className="text-[10px] font-mono text-[#3a3a3a] uppercase tracking-[0.2em] mb-3">Ready to start?</p>
              <p className="text-[15px] font-display font-semibold text-white/80 mb-5 leading-snug">
                Let&apos;s build something worth talking about.
              </p>
              <a
                href="mailto:hello@nathanmabasa.com"
                className="inline-flex items-center gap-2 text-[12px] font-mono text-white/60 hover:text-white border-b border-white/10 hover:border-white/30 pb-0.5 transition-all duration-200"
              >
                hello@nathanmabasa.com ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
