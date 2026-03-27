'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

interface Props {
  children: ReactNode
  /** Delay before starting smooth scroll (ms). Use to wait for preloader. */
  startDelay?: number
}

export default function LenisProvider({ children, startDelay = 0 }: Props) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Optionally start paused, then resume after delay
    if (startDelay > 0) {
      lenis.stop()
      setTimeout(() => lenis.start(), startDelay)
    }

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [startDelay])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
