'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props {
  label?: string
  visible: boolean
}

/**
 * A floating label that follows the mouse on project row hover.
 * Parent must be position: relative (or fixed).
 */
export default function ProjectCursor({ label = 'View', visible }: Props) {
  const ref  = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const yRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      xRef.current = e.clientX
      yRef.current = e.clientY
    }

    window.addEventListener('mousemove', onMove)

    const ticker = () => {
      if (!el) return
      gsap.set(el, { x: xRef.current, y: yRef.current })
    }

    gsap.ticker.add(ticker)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(ticker)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      scale: visible ? 1 : 0,
      opacity: visible ? 1 : 0,
      duration: 0.35,
      ease: visible ? 'back.out(1.4)' : 'power2.in',
    })
  }, [visible])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[8000] pointer-events-none"
      style={{ transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-accent text-black text-xs font-display font-semibold tracking-[0.12em] uppercase">
        {label}
      </div>
    </div>
  )
}
