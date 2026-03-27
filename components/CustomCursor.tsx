'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.set(dot, { x: e.clientX, y: e.clientY })
    }

    const ticker = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y })
    }

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        'a, button, [data-cursor="hover"], input, textarea, select'
      )
      gsap.to(ring, {
        scale: interactive ? 1.8 : 1,
        opacity: interactive ? 0.9 : 0.4,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: interactive ? 0.4 : 1, duration: 0.2 })
    }

    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.15 })
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.25 })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    gsap.ticker.add(ticker)

    gsap.set([dot, ring], { opacity: 0 })
    const showCursors = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      window.removeEventListener('mousemove', showCursors)
    }
    window.addEventListener('mousemove', showCursors)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', showCursors)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      gsap.ticker.remove(ticker)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-2 h-2 bg-accent rounded-full"
        style={{ transform: 'translate(-50%, -50%)', opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none w-8 h-8 border border-white/20 rounded-full"
        style={{ transform: 'translate(-50%, -50%)', opacity: 0 }}
        aria-hidden="true"
      />
    </>
  )
}
