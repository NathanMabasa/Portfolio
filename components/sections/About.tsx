'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import CardSwap, { Card } from '@/components/CardSwap'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATS = [
  { value: '5+',  label: 'Years Experience' },
  { value: '40+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '3',   label: 'Continents Reached' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const lines = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.85, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    const statEls = sectionRef.current.querySelectorAll<HTMLElement>('.stat-value')
    statEls.forEach((el) => {
      const target = parseFloat(el.dataset.target ?? '0')
      const isInt  = Number.isInteger(target)
      const obj    = { n: 0 }
      gsap.to(obj, {
        n: target, duration: 1.5, ease: 'power2.out',
        onUpdate() {
          el.textContent = (isInt ? Math.floor(obj.n) : obj.n.toFixed(1)) + (el.dataset.suffix ?? '')
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="section bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">01 — About</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <div className="overflow-hidden mb-8">
              <h2
                className="reveal-inner font-display font-black text-white leading-[0.92]"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}
              >
                The person behind<br />the screen.
              </h2>
            </div>

            <div className="overflow-hidden mb-5">
              <p className="reveal-inner text-[13px] text-[#666] leading-relaxed">
                I&apos;m Nathan Mabasa — a South African digital designer and creative developer
                working at the intersection of strategy, aesthetics, and technology.
              </p>
            </div>

            <div className="overflow-hidden mb-7">
              <blockquote className="reveal-inner border-l border-white/10 pl-5">
                <p className="text-[15px] font-display font-semibold text-white/70 leading-snug">
                  &ldquo;Great design isn&apos;t just visual —<br />it&apos;s a system of decisions.&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="overflow-hidden mb-8">
              <p className="reveal-inner text-[13px] text-[#555] leading-relaxed">
                I specialise in brand identity, UI/UX, motion design, creative development,
                and design systems — working with founders and global brands to turn complex
                challenges into beautiful, functional digital experiences.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.04] mb-8">
              {STATS.map((s) => (
                <div key={s.label} className="bg-[#0a0a0a] p-6 group hover:bg-[#0f0f0f] transition-colors duration-300">
                  <div
                    className="stat-value font-display font-black text-white mb-1.5 tabular-nums"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', letterSpacing: '-0.04em' }}
                    data-target={parseFloat(s.value)}
                    data-suffix={s.value.includes('+') ? '+' : ''}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#3a3a3a] tracking-wide uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['Brand Identity', 'UI / UX', 'Motion Design', 'Design Systems', 'Creative Dev', 'Web Development', 'Digital Strategy'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 border border-white/[0.06] text-[11px] font-mono text-[#3a3a3a] hover:border-white/15 hover:text-[#666] transition-all duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — CardSwap */}
          <div style={{ height: '520px', position: 'relative' }}>
            <CardSwap cardDistance={50} verticalDistance={60} delay={4000} pauseOnHover={true}>
              <Card>
                <div>
                  <span className="text-[10px] font-mono text-[#3a3a3a] uppercase tracking-[0.2em] block mb-5">01 — Background</span>
                  <h3
                    className="font-display font-black text-white leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.03em' }}
                  >
                    5+ years of<br />design &amp; code.
                  </h3>
                  <p className="text-[13px] text-[#555] leading-relaxed">
                    Started in print, moved into digital — brand, UI, motion, and full-stack
                    development. Self-taught, agency-tested, globally delivered.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {['Figma', 'Next.js', 'GSAP', 'After Effects'].map((t) => (
                    <span key={t} className="text-[10px] font-mono text-[#3a3a3a] border border-white/[0.06] px-2.5 py-1">{t}</span>
                  ))}
                </div>
              </Card>

              <Card>
                <div>
                  <span className="text-[10px] font-mono text-[#3a3a3a] uppercase tracking-[0.2em] block mb-5">02 — Philosophy</span>
                  <h3
                    className="font-display font-black text-white leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.03em' }}
                  >
                    Design that<br />earns attention.
                  </h3>
                  <p className="text-[13px] text-[#555] leading-relaxed">
                    Restraint over excess, precision over decoration,
                    function over form — though never at the cost of beauty.
                  </p>
                </div>
                <blockquote className="mt-6 border-l border-white/[0.06] pl-4">
                  <p className="text-[12px] text-[#3a3a3a] italic leading-relaxed">
                    &ldquo;Simplicity is the ultimate sophistication.&rdquo;
                  </p>
                </blockquote>
              </Card>

              <Card>
                <div>
                  <span className="text-[10px] font-mono text-[#3a3a3a] uppercase tracking-[0.2em] block mb-5">03 — Global Reach</span>
                  <h3
                    className="font-display font-black text-white leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.03em' }}
                  >
                    Africa-based,<br />world-ready.
                  </h3>
                  <p className="text-[13px] text-[#555] leading-relaxed">
                    Delivered projects across South Africa, the UK, UAE, and North America.
                    Remote-first, async-fluent, deadline-obsessed.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-1.5">
                  {['🇿🇦 SA', '🇬🇧 UK', '🇺🇸 USA', '🇦🇪 UAE', '🇨🇦 CA', '🌍 More'].map((loc) => (
                    <span key={loc} className="text-[10px] font-mono text-[#3a3a3a] border border-white/[0.06] px-2 py-1 text-center">{loc}</span>
                  ))}
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  )
}
