'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { ContactFormData } from '@/lib/validations'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Status = 'idle' | 'loading' | 'success' | 'error'

const SOCIALS = [
  { label: 'LinkedIn',    href: 'https://linkedin.com/in/nyikonathan-mabasa/', handle: '@nyikonathan-mabasa' },
  { label: 'Instagram',   href: 'https://instagram.com/nathanmabasa',          handle: '@nathanmabasa' },
  { label: 'Twitter / X', href: 'https://twitter.com/nathanmabasa',            handle: '@nathanmabasa' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus]           = useState<Status>('idle')
  const [errorMsg, setErrorMsg]       = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  useGSAP(() => {
    if (!sectionRef.current) return
    const lines = sectionRef.current.querySelectorAll<HTMLElement>('.reveal-inner')
    gsap.fromTo(lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setFieldErrors({})
    const form = e.currentTarget
    const data: ContactFormData = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
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

  const fieldCls = 'w-full bg-transparent border-b border-[#1a1a1a] py-4 text-sm text-white placeholder-[#333] focus:outline-none focus:border-accent hover:border-[#2a2a2a] transition-colors duration-200'

  return (
    <section id="contact" ref={sectionRef} className="section bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">06 — Contact</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          <div>
            <div className="overflow-hidden mb-8">
              <h2 className="reveal-inner font-display font-black text-white tracking-[-0.04em] leading-[0.92]"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                Let&apos;s work
                <br />
                <span className="text-accent">together.</span>
              </h2>
            </div>
            <div className="overflow-hidden mb-10">
              <p className="reveal-inner text-sm text-[#555] leading-relaxed max-w-sm">
                Have a project in mind? I&apos;m always open to new challenges — brand identities,
                website redesigns, or long-term creative partnerships.
              </p>
            </div>
            <div className="overflow-hidden mb-10">
              <a className="reveal-inner inline-block font-display font-bold text-white hover:text-accent transition-colors duration-300 link-underline"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
                href="mailto:hello@nathanmabasa.com">
                hello@nathanmabasa.com
              </a>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#333] uppercase tracking-[0.2em] mb-5">Online</p>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[#111] py-3.5 group hover:border-[#222] transition-colors duration-300">
                  <span className="text-sm text-[#555] group-hover:text-white transition-colors">{s.label}</span>
                  <span className="text-xs font-mono text-[#333] group-hover:text-accent transition-colors">{s.handle} ↗</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 border border-accent/20">
                <div className="text-3xl text-accent mb-4">✓</div>
                <h3 className="text-xl font-display font-bold text-white mb-2">Message sent</h3>
                <p className="text-sm text-[#555] max-w-xs mb-6">Thanks for reaching out. I&apos;ll respond within 1–2 business days.</p>
                <button onClick={() => setStatus('idle')} className="text-xs text-[#444] hover:text-accent transition-colors">Send another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-0">
                <div>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name *" className={fieldCls} />
                  {fieldErrors.name && <p className="pt-1 text-xs text-red-400">{fieldErrors.name[0]}</p>}
                </div>
                <div>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email address *" className={fieldCls} />
                  {fieldErrors.email && <p className="pt-1 text-xs text-red-400">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                  <input id="subject" name="subject" type="text" autoComplete="off" placeholder="Subject" className={fieldCls} />
                </div>
                <div>
                  <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project... *" className={`${fieldCls} resize-none`} />
                  {fieldErrors.message && <p className="pt-1 text-xs text-red-400">{fieldErrors.message[0]}</p>}
                </div>
                {status === 'error' && <p className="text-xs text-red-400 pt-2" role="alert">{errorMsg}</p>}
                <div className="pt-8">
                  <button type="submit" disabled={status === 'loading'}
                    className="flex items-center gap-3 text-sm font-display font-bold text-black bg-accent px-8 py-4 hover:bg-white disabled:opacity-50 transition-all duration-200">
                    {status === 'loading' ? (
                      <><span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Sending...</>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
