'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ContactFormData } from '@/lib/validations'
import TextReveal from '@/components/ui/TextReveal'
import MagneticButton from '@/components/ui/MagneticButton'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nyikonathan-mabasa/', handle: '@nyikonathan-mabasa' },
  { label: 'Instagram', href: 'https://instagram.com/nathanmabasa', handle: '@nathanmabasa' },
  { label: 'Twitter / X', href: 'https://twitter.com/nathanmabasa', handle: '@nathanmabasa' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setFieldErrors({})

    const form = e.currentTarget
    const data: ContactFormData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        if (json.details) {
          setFieldErrors(json.details)
          setStatus('idle')
        } else {
          setErrorMsg(json.error ?? 'Something went wrong.')
          setStatus('error')
        }
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-xl px-5 py-4 text-fg placeholder-fg-3 text-sm font-body focus:outline-none focus:border-accent transition-colors duration-300 hover:border-fg-3'

  return (
    <section id="contact" ref={ref} className="section relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-accent/6 -bottom-48 -right-48 animate-pulse-glow" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Label */}
        <div className="section-label">
          <span>04 — Contact</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: info */}
          <div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.0] mb-8">
                Let&apos;s Work
                <br />
                <span className="text-accent">Together</span>
              </h2>
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-fg-2 text-base leading-relaxed font-body mb-10"
            >
              Have a project in mind? Ready to elevate your brand or build something remarkable?
              I&apos;m always open to new challenges — whether it&apos;s a full brand identity,
              a website redesign, or a long-term creative partnership.
            </motion.p>

            {/* Direct email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10"
            >
              <p className="text-xs font-mono text-fg-3 uppercase tracking-widest mb-2">
                Or reach me directly
              </p>
              <a
                href="mailto:hello@nathanmabasa.com"
                className="text-2xl md:text-3xl font-display font-bold text-white hover:text-accent transition-colors duration-300 link-underline"
              >
                hello@nathanmabasa.com
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <p className="text-xs font-mono text-fg-3 uppercase tracking-widest mb-4">
                Find me online
              </p>
              <div className="space-y-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group border-b border-border pb-3 hover:border-accent transition-colors duration-300"
                  >
                    <span className="text-sm font-body text-fg-2 group-hover:text-white transition-colors">
                      {s.label}
                    </span>
                    <span className="text-sm font-mono text-fg-3 group-hover:text-accent transition-colors">
                      {s.handle} ↗
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-20 rounded-2xl border border-accent/30 bg-accent/5"
              >
                <div className="text-5xl mb-6">✓</div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  Message Sent!
                </h3>
                <p className="text-fg-2 text-sm font-body max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-accent text-sm font-body hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-fg-3 uppercase tracking-widest mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Nathan Mabasa"
                    className={inputClass}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-400">{fieldErrors.name[0]}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-fg-3 uppercase tracking-widest mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="hello@yourcompany.com"
                    className={inputClass}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400">{fieldErrors.email[0]}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-fg-3 uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    placeholder="Brand identity for my startup"
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-fg-3 uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`${inputClass} resize-none`}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-400">{fieldErrors.message[0]}</p>
                  )}
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p className="text-sm text-red-400 font-body" role="alert">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <MagneticButton className="w-full" strength={0.15}>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-accent text-black font-display font-bold text-base rounded-xl hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </MagneticButton>

                <p className="text-xs text-fg-3 font-body text-center">
                  Your information is kept private and never shared.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
