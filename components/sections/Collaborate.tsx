'use client'

import { useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AgentChat, createAgentChat } from '@21st-sdk/react'
import theme from '@/app/theme.json'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TIMEZONES = [
  { city: 'Johannesburg', offset: 'UTC+2' },
  { city: 'London',       offset: 'UTC+0/+1' },
  { city: 'New York',     offset: 'UTC-5/-4' },
  { city: 'Dubai',        offset: 'UTC+4' },
  { city: 'Singapore',    offset: 'UTC+8' },
  { city: 'Toronto',      offset: 'UTC-5/-4' },
]

export default function Collaborate() {
  const sectionRef = useRef<HTMLElement>(null)

  const chat = useMemo(() =>
    createAgentChat({
      agent: 'nathan-portfolio',
      tokenUrl: '/api/an-token',
    }),
    []
  )

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

    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.tz-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        stagger: 0.06, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="collaborate" className="section bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">05 — International</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          <div>
            <div className="overflow-hidden mb-6">
              <h2 className="reveal-inner font-display font-black text-white tracking-[-0.04em] leading-[0.92]"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                Built for
                <br />
                <span className="text-accent">everywhere.</span>
              </h2>
            </div>
            <div className="overflow-hidden mb-8">
              <p className="reveal-inner text-sm text-[#555] leading-relaxed max-w-sm">
                From Johannesburg to London, New York to Dubai — I collaborate
                with founders and studios across time zones, delivering
                world-class design and development remotely.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1a1a1a] mb-10">
              {TIMEZONES.map((tz) => (
                <div key={tz.city} className="tz-card opacity-0 bg-[#0d0d0d] px-4 py-4 hover:bg-[#111] transition-colors duration-300">
                  <p className="text-[10px] font-mono text-[#333] uppercase tracking-[0.2em] mb-1">{tz.offset}</p>
                  <p className="text-sm font-display font-semibold text-white">{tz.city}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden">
              <p className="reveal-inner text-[11px] font-mono text-[#333] uppercase tracking-[0.2em]">
                Open to remote · async-friendly · quick to respond
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="reveal-inner text-[11px] font-mono text-[#333] uppercase tracking-[0.2em]">
              Chat with my portfolio assistant
            </p>
            <div className="border border-[#1a1a1a] bg-[#0d0d0d]" style={{ height: 480 }}>
              <AgentChat
                messages={chat.messages}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSend={(msg) => (chat.sendMessage as any)(msg)}
                status={chat.status}
                onStop={() => chat.stop()}
                error={chat.error}
                theme={theme}
                colorMode="dark"
                className="w-full h-full"
              />
            </div>
            <p className="text-[11px] font-mono text-[#222] text-right">Powered by 21st.dev</p>
          </div>
        </div>
      </div>
    </section>
  )
}
