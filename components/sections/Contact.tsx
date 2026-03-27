'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ContactFormData } from '@/lib/validations'

type Status = 'idle' | 'loading' | 'success' | 'error'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nyikonathan-mabasa/', handle: '@nyikonathan-mabasa' },
  { label: 'Instagram', href: 'https://instagram.com/nathanmabasa', handle: '@nathanmabasa' },
  { label: 'Twitter / X', href: 'https://twitter.com/nathanmabasa', handle: '@nathanmabasa' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState<Status>('idle')
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
        if (json.details) { setFieldErrors(json.details); setStatus('idle') }
        else { setErrorMsg(json.error ?? 'Something went wrong.'); setStatus('error') }
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  const field = 'w-full bg-transparent border border-[#1e1e1e] rounded-lg px-5 py-3.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#444] hover:border-[#2a2a2a] transition-colors duration-200'

  return (
    <section id="contact" ref={ref} className="section bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">04 — Contact</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-display font-light tracking-[-0.02em] text-white leading-[1.1] mb-8"
            >
              Let&apos;s work
              <br />
              <span className="italic text-[#888]">together.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="text-sm text-[#666] leading-relaxed mb-10 max-w-sm"
            >
              Have a project in mind? Ready to elevate your brand or build something remarkable?
              I&apos;m always open to new challenges and long-term creative partnerships.
            </motion.p>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              href="mailto:hello@nathanmabasa.com"
              className="block text-2xl md:text-3xl font-display font-light text-white hover:text-accent transition-colors duration-300 mb-12 link-underline"
            >
              hello@nathanmabasa.com
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#444] mb-5">Find me online</p>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border-b border-[#161616] pb-3 group hover:border-[#2a2a2a] transition-colors duration-300"
                  >
                    <span className="text-sm text-[#666] group-hover:text-white transition-colors">{s.label}</span>
                    <span className="text-xs font-mono text-[#444] group-hover:text-accent transition-colors">{s.handle} ↗</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 rounded-xl border border-accent/20 bg-accent/5">
                <div className="text-4xl mb-5 text-accent">✓</div>
                <h3 className="text-xl font-display font-medium text-white mb-2">Message sent</h3>
                <p className="text-sm text-[#666] max-w-xs mb-6">
                  Thanks for reaching out. I&apos;ll get back to you within 1–2 business days.
                </p>
                <button onClick={() => setStatus('idle')} className="text-xs text-[#666] hover:text-accent transition-colors">
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <input id="name" name="name" type="text" required autoComplete="name"
                    placeholder="Your name *" className={field}
                    aria-describedby={fieldErrors.name ? 'name-err' : undefined} />
                  {fieldErrors.name && <p id="name-err" className="mt-1 text-xs text-red-400">{fieldErrors.name[0]}</p>}
                </div>

                {/* Email */}
                <div>
                  <input id="email" name="email" type="email" required autoComplete="email"
                    placeholder="Email address *" className={field}
                    aria-describedby={fieldErrors.email ? 'email-err' : undefined} />
                  {fieldErrors.email && <p id="email-err" className="mt-1 text-xs text-red-400">{fieldErrors.email[0]}</p>}
                </div>

                {/* Subject */}
                <input id="subject" name="subject" type="text" autoComplete="off"
                  placeholder="Subject (optional)" className={field} />

                {/* Message */}
                <div>
                  <textarea id="message" name="message" required rows={5}
                    placeholder="Tell me about your project... *"
                    className={`${field} resize-none`}
                    aria-describedby={fieldErrors.message ? 'msg-err' : undefined} />
                  {fieldErrors.message && <p id="msg-err" className="mt-1 text-xs text-red-400">{fieldErrors.message[0]}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-400" role="alert">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-accent text-black text-sm font-medium rounded-lg hover:bg-white disabled:opacity-50 transition-all duration-200"
                >
                  {status === 'loading' ? (
                    <><span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>Send Message <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                <p className="text-[11px] text-[#444] text-center">
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
