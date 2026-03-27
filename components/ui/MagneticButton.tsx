'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - (left + width / 2)) * strength,
      y: (e.clientY - (top + height / 2)) * strength,
    })
  }

  const onMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.1 }}
      className={`inline-flex ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}
