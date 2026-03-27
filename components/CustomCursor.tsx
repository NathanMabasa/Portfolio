'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 50 })

  // Ring follows with smooth lag
  const ringX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(rawY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [data-cursor="hover"], input, textarea, select, label'
      )
      setHovering(!!el)
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY, visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: clicking ? 6 : hovering ? 8 : 8,
          height: clicking ? 6 : hovering ? 8 : 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-accent/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 52 : clicking ? 24 : 36,
          height: hovering ? 52 : clicking ? 24 : 36,
          opacity: visible ? hovering ? 0.9 : 0.5 : 0,
          backgroundColor: hovering ? 'rgba(202,255,51,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
