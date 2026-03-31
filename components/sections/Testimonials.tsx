'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TESTIMONIALS = [
  {
    quote: 'Nathan brought our brand to life in a way we never imagined. Every detail was considered — from type to motion. World-class output.',
    name: 'Sipho Dlamini',
    title: 'CEO, Comtech Network Solutions',
  },
  {
    quote: 'Working with Nathan felt effortless. He understood our vision immediately and delivered a brand identity that truly represents who we are.',
    name: 'Thandeka Mokoena',
    title: 'Founder, The Media Krate',
  },
  {
    quote: 'The website Nathan built for us exceeded every expectation. Premium design, flawless execution, and an incredible eye for detail.',
    name: 'James Maxwell',
    title: 'Director, Maxwell Stay',
  },
]

export default function Testimonials() {
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

    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.testimonial-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.12, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">04 — Testimonials</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="overflow-hidden">
            <h2
              className="reveal-inner font-display font-black text-white leading-[0.92]"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}
            >
              What clients say.
            </h2>
          </div>
          <p className="reveal-inner text-[13px] text-[#555] max-w-xs leading-relaxed">
            Real feedback from real collaborations — across South Africa and internationally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card opacity-0 bg-[#0a0a0a] p-8 hover:bg-[#0f0f0f] transition-colors duration-400 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-0 h-px bg-white/20 group-hover:w-full transition-all duration-500" />

              {/* Rating — simple dots */}
              <div className="flex items-center gap-1 mb-7">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="w-1 h-1 rounded-full bg-white/30" />
                ))}
              </div>

              <p className="text-[13px] text-[#666] leading-relaxed mb-8 font-light">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-auto">
                <div className="h-px bg-white/[0.05] mb-5" />
                <p className="text-[13px] font-semibold text-white/80">{t.name}</p>
                <p className="text-[10px] font-mono text-[#3a3a3a] mt-0.5 tracking-wide">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
