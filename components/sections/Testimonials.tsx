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
    rating: 5,
  },
  {
    quote: 'Working with Nathan felt effortless. He understood our vision immediately and delivered a brand identity that truly represents who we are.',
    name: 'Thandeka Mokoena',
    title: 'Founder, The Media Krate',
    rating: 5,
  },
  {
    quote: 'The website Nathan built for us exceeded every expectation. Premium design, flawless execution, and an incredible eye for detail.',
    name: 'James Maxwell',
    title: 'Director, Maxwell Stay',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 mb-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1L8.545 5.237H13.018L9.5 7.763L10.955 12L7 9.474L3.045 12L4.5 7.763L0.982 5.237H5.455L7 1Z"
            fill={i < count ? '#caff33' : '#222'}
          />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const inner = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(inner,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.testimonial-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        stagger: 0.15, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">04 — Testimonials</div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="overflow-hidden">
            <h2 className="reveal-inner font-display font-black text-white tracking-[-0.04em] leading-[0.92]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
              What clients
              <br />
              <span className="text-accent">say.</span>
            </h2>
          </div>
          <p className="reveal-inner text-sm text-[#555] max-w-xs leading-relaxed">
            Real feedback from real collaborations — across South Africa and internationally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card opacity-0 border border-[#1a1a1a] p-8 hover:border-accent/20 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
              <StarRating count={t.rating} />
              <p className="text-base text-[#888] leading-relaxed mb-8 font-light">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <div className="h-px bg-[#1a1a1a] mb-5" />
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-[11px] font-mono text-[#444] mt-0.5">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
