'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import MagneticButton from './ui/MagneticButton'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500',
          scrolled && 'backdrop-blur-xl bg-black/70 border-b border-white/5'
        )}
      >
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl text-white tracking-tight z-10">
          NM
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-fg-2 hover:text-white transition-colors duration-300 font-body"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-fg-2 font-body">Available for work</span>
          </div>
          <MagneticButton>
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-5 py-2.5 bg-accent text-black text-sm font-display font-semibold rounded-full hover:bg-white transition-colors duration-300"
            >
              Hire Me
            </button>
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden z-10 flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-6 h-0.5 bg-white origin-center transition-all"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-white origin-center transition-all"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-6 h-0.5 bg-white origin-center transition-all"
          />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 3%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 3%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 3%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                onClick={() => handleNavClick(link.href)}
                className="text-4xl font-display font-bold text-white hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mt-4"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-fg-2">Available for work</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
