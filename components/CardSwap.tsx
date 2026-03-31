'use client'

import { useEffect, useRef, useState, useCallback, Children } from 'react'
import { gsap } from 'gsap'

interface CardSwapProps {
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  children: React.ReactNode
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 rounded-2xl border border-white/[0.08] bg-[#111] p-8 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function CardSwap({
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  children,
}: CardSwapProps) {
  const cards = Children.toArray(children)
  const count = cards.length
  const [order, setOrder] = useState<number[]>(cards.map((_, i) => i))
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoveredRef = useRef(false)

  const getStyle = useCallback((stackPos: number) => {
    // stackPos 0 = front, count-1 = back
    const depth = count - 1 - stackPos
    return {
      zIndex: count - stackPos,
      x: depth * (cardDistance / count),
      y: depth * (verticalDistance / count) * -1,
      scale: 1 - depth * 0.04,
      opacity: stackPos === count - 1 ? 0 : 1,
    }
  }, [count, cardDistance, verticalDistance])

  // Apply positions on order change
  useEffect(() => {
    order.forEach((cardIdx, stackPos) => {
      const el = cardRefs.current[cardIdx]
      if (!el) return
      const s = getStyle(stackPos)
      gsap.to(el, {
        x: s.x, y: s.y, scale: s.scale, opacity: s.opacity, zIndex: s.zIndex,
        duration: 0.7, ease: 'expo.out',
      })
    })
  }, [order, getStyle])

  const advance = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev]
      // move front card to back
      const front = next.shift()!
      next.push(front)
      return next
    })
  }, [])

  const schedule = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (!hoveredRef.current) advance()
      schedule()
    }, delay)
  }, [advance, delay])

  useEffect(() => {
    schedule()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [schedule])

  const handleEnter = () => { if (pauseOnHover) hoveredRef.current = true }
  const handleLeave = () => { hoveredRef.current = false }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {cards.map((card, idx) => {
        const stackPos = order.indexOf(idx)
        const s = getStyle(stackPos)
        return (
          <div
            key={idx}
            ref={(el) => { cardRefs.current[idx] = el }}
            style={{
              position: 'absolute', inset: 0,
              zIndex: s.zIndex,
              transform: `translate(${s.x}px, ${s.y}px) scale(${s.scale})`,
              opacity: s.opacity,
            }}
          >
            {card}
          </div>
        )
      })}
    </div>
  )
}
