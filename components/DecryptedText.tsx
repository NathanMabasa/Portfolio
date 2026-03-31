'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: 'hover' | 'view'
  revealDirection?: 'start' | 'end' | 'center'
  sequential?: boolean
  useOriginalCharsOnly?: boolean
  clickMode?: 'once' | 'toggle'
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 15,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'start',
  sequential = false,
  useOriginalCharsOnly = false,
  clickMode,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating]   = useState(false)
  const [hasRun, setHasRun]             = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  const charPool = useOriginalCharsOnly ? Array.from(new Set(text.split(''))).join('') : characters

  const rand = (str: string) => str[Math.floor(Math.random() * str.length)]

  const animate = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setHasRun(true)

    const letters = text.split('')
    const revealed = new Array(letters.length).fill(false)
    let iter = 0

    const getOrder = (): number[] => {
      const idxs = letters.map((_, i) => i)
      if (revealDirection === 'end')    return idxs.reverse()
      if (revealDirection === 'center') {
        const mid = Math.floor(idxs.length / 2)
        return idxs.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))
      }
      return idxs
    }
    const order = getOrder()

    intervalRef.current = setInterval(() => {
      iter++
      const revealCount = sequential
        ? Math.floor((iter / maxIterations) * letters.length)
        : Math.floor((iter / maxIterations) * letters.length * 0.6)

      for (let i = 0; i < Math.min(revealCount, order.length); i++) {
        revealed[order[i]] = true
      }

      const next = letters.map((ch, i) => {
        if (revealed[i] || ch === ' ') return ch
        return rand(charPool)
      }).join('')

      setDisplayText(next)

      if (iter >= maxIterations) {
        clearInterval(intervalRef.current!)
        setDisplayText(text)
        setIsAnimating(false)
      }
    }, speed)
  }, [text, speed, maxIterations, charPool, revealDirection, sequential, isAnimating])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplayText(text)
    setIsAnimating(false)
  }, [text])

  // View-based trigger
  useEffect(() => {
    if (animateOn !== 'view') return
    const el = containerRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) animate()
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [animateOn, animate, hasRun])

  const handleMouseEnter = () => {
    if (animateOn !== 'hover') return
    animate()
  }
  const handleMouseLeave = () => {
    if (animateOn !== 'hover') return
    reset()
  }
  const handleClick = () => {
    if (!clickMode) return
    if (clickMode === 'once' && hasRun) return
    isAnimating ? reset() : animate()
  }

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: clickMode ? 'pointer' : undefined, display: 'inline-block' }}
    >
      {displayText.split('').map((ch, i) => (
        <span
          key={i}
          className={ch === text[i] ? className : encryptedClassName}
          style={{ display: 'inline-block', minWidth: ch === ' ' ? '0.3em' : undefined }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}
