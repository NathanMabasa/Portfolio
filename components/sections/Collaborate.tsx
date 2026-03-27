'use client'

import { useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AgentChat, createAgentChat } from '@21st-sdk/react'
import theme from '@/app/theme.json'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TIMEZONES = [
  { city: 'Johannesburg', tz: 'Africa/Johannesburg', offset: 'UTC+2' },
  { city: 'London',       tz: 'Europe/London',       offset: 'UTC+0/+1' },
  { city: 'New York',     tz: 'America/New_York',    offset: 'UTC-5/-4' },
  { city: 'Dubai',        tz: 'Asia/Dubai',          offset: 'UTC+4' },
  { city: 'Singapore',    tz: 'Asia/Singapore',      offset: 'UTC+8' },
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
    <section ref={sectionRef} id="collaborate" className="section bg-[#fafafa] border-t border-[#e5e5e5]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">05 — International</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left — copy */}
          <div>
            <div className="overflow-hidden mb-6">
              <h2 className="reveal-inner text-4xl md:text-5xl lg:text-6xl font-display font-extralight text-black tracking-[-0.03em] leading-[1.05]">
                Built for
                <br />
                <em className="not-italic text-[#aaa]">everywhere.</em>
              </h2>
            </div>

            <div className="overflow-hidden mb-8">
              <p className="reveal-inner text-sm text-[#777] leading-relaxed max-w-sm">
                From Johannesburg to London, New York to Dubai — I collaborate
                with founders and studios across time zones, delivering
                world-class design and development remotely.
              </p>
            </div>

            {/* Timezone strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e5e5e5] mb-10">
              {TIMEZONES.map((tz) => (
                <div key={tz.city} className="tz-card opacity-0 bg-white px-4 py-4">
                  <p className="text-[10px] font-mono text-[#aaa] uppercase tracking-[0.2em] mb-1">{tz.offset}</p>
                  <p className="text-sm font-display font-light text-black">{tz.city}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden">
              <p className="reveal-inner text-[11px] font-mono text-[#aaa] uppercase tracking-[0.2em]">
                Open to remote · async-friendly · quick to respond
              </p>
            </div>
          </div>

          {/* Right — AgentChat */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden">
              <p className="reveal-inner text-[11px] font-mono text-[#aaa] uppercase tracking-[0.2em] mb-4">
                Chat with my portfolio assistant
              </p>
            </div>
            <div
              className="border border-[#e5e5e5] bg-white"
              style={{ height: 480 }}
            >
              <AgentChat
                messages={chat.messages}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSend={(msg) => (chat.sendMessage as any)(msg)}
                status={chat.status}
                onStop={() => chat.stop()}
                error={chat.error}
                theme={theme}
                colorMode="light"
                className="w-full h-full"
              />
            </div>
            <p className="text-[11px] font-mono text-[#ccc] text-right">
              Powered by 21st.dev
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
