'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props {
  onComplete: () => void
}

export default function Preloader({ onComplete }: Props) {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const topRef      = useRef<HTMLDivElement>(null)
  const bottomRef   = useRef<HTMLDivElement>(null)
  const counterRef  = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const nameRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const wrap      = wrapRef.current
    const top       = topRef.current
    const bottom    = bottomRef.current
    const counter   = counterRef.current
    const progress  = progressRef.current
    const name      = nameRef.current
    if (!wrap || !top || !bottom || !counter || !progress || !name) return

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden'

    const obj = { n: 0 }

    const ctx = gsap.context(() => {
      // Phase 1 — count 0 → 100 (fast at start, decelerates at end)
      gsap.to(obj, {
        n: 100,
        duration: 2.4,
        ease: 'expo.inOut',
        onUpdate() {
          const val = Math.floor(obj.n)
          counter.textContent = String(val).padStart(2, '0')
        },
        onComplete() {
          gsap.delayedCall(0.25, () => {
            // Phase 2 — shutter open
            const tl = gsap.timeline({
              defaults: { ease: 'expo.inOut', duration: 1.1 },
              onComplete() {
                document.body.style.overflow = ''
                gsap.set(wrap, { display: 'none' })
                onComplete()
              },
            })

            tl.to(counter, { opacity: 0, y: -24, duration: 0.35, ease: 'power3.in' })
              .to(name,    { opacity: 0, y:  12, duration: 0.3,  ease: 'power2.in' }, '<')
              .to(progress, { scaleX: 1, duration: 0.4, ease: 'power2.out' },          '<0.1')
              .to(top,    { yPercent: -101, duration: 1.1, ease: 'expo.inOut' },       '+=0.05')
              .to(bottom, { yPercent:  101, duration: 1.1, ease: 'expo.inOut' },       '<')
          })
        },
      })

      // Sync progress bar with counter
      gsap.to(progress, {
        scaleX: 1,
        duration: 2.4,
        ease: 'expo.inOut',
        transformOrigin: 'left center',
      })
    })

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Top panel */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
      />

      {/* Bottom panel */}
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
      />

      {/* Counter — centered over both panels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* Large counter */}
        <div className="relative">
          <span
            ref={counterRef}
            className="block font-display font-extralight text-white leading-none tabular-nums"
            style={{ fontSize: 'clamp(6rem, 22vw, 18rem)', letterSpacing: '-0.04em' }}
          >
            00
          </span>
          {/* Progress bar pinned to bottom of the counter */}
          <div
            ref={progressRef}
            className="absolute -bottom-4 left-0 right-0 h-px bg-white"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          />
        </div>

        {/* Name */}
        <p
          ref={nameRef}
          className="text-[11px] font-sans font-normal text-white/25 tracking-[0.4em] uppercase"
        >
          Nathan Mabasa
        </p>
      </div>
    </div>
  )
}
