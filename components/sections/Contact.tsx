'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
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
        stagger: 0.07, duration: 0.85, ease: 'power4.out',
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

  const fieldCls = 'w-full bg-transparent border-b border-white/[0.07] py-4 text-[13px] text-white placeholder-[#2a2a2a] focus:outline-none focus:border-white/20 hover:border-white/12 transition-colors duration-200'

  return (
    <section id="contact" ref={sectionRef} className="section bg-[#0d0d0d]">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">06 — Contact</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <div className="overflow-hidden mb-7">
              <h2
                className="reveal-inner font-display font-black text-white leading-[0.92]"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}
              >
                Let&apos;s work<br />together.
              </h2>
            </div>
            <div className="overflow-hidden mb-8">
              <p className="reveal-inner text-[13px] text-[#555] leading-relaxed max-w-sm">
                Have a project in mind? Open to new challenges — brand identities,
                website redesigns, or long-term creative partnerships.
              </p>
            </div>
            <div className="overflow-hidden mb-10">
              <a
                className="reveal-inner inline-block font-display font-semibold text-white/70 hover:text-white transition-colors duration-300 link-underline"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', letterSpacing: '-0.01em' }}
                href="mailto:hello@nathanmabasa.com"
              >
                hello@nathanmabasa.com
              </a>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em] mb-5">Online</p>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-white/[0.05] py-4 group hover:border-white/10 transition-colors duration-300"
                >
                  <span className="text-[13px] text-[#555] group-hover:text-white/70 transition-colors">{s.label}</span>
                  <span className="text-[11px] font-mono text-[#2a2a2a] group-hover:text-[#555] transition-colors">{s.handle} ↗</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 border border-white/[0.06]">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center mb-5">
                  <span className="text-sm text-white/60">✓</span>
                </div>
                <h3 className="text-[15px] font-display font-semibold text-white mb-2">Message sent</h3>
                <p className="text-[13px] text-[#555] max-w-xs mb-6 leading-relaxed">Thanks for reaching out. I&apos;ll respond within 1–2 business days.</p>
                <button onClick={() => setStatus('idle')} className="text-[11px] font-mono text-[#3a3a3a] hover:text-white/60 transition-colors">Send another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-0">
                <div>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name *" className={fieldCls} />
                  {fieldErrors.name && <p className="pt-1 text-[11px] text-red-400/80">{fieldErrors.name[0]}</p>}
                </div>
                <div>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email address *" className={fieldCls} />
                  {fieldErrors.email && <p className="pt-1 text-[11px] text-red-400/80">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                  <input id="subject" name="subject" type="text" autoComplete="off" placeholder="Subject" className={fieldCls} />
                </div>
                <div>
                  <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project... *" className={`${fieldCls} resize-none`} />
                  {fieldErrors.message && <p className="pt-1 text-[11px] text-red-400/80">{fieldErrors.message[0]}</p>}
                </div>
                {status === 'error' && <p className="text-[11px] text-red-400/80 pt-2" role="alert">{errorMsg}</p>}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex items-center gap-3 text-[12px] font-semibold text-black bg-white px-7 py-3.5 hover:bg-white/85 disabled:opacity-40 transition-all duration-200 tracking-wide"
                  >
                    {status === 'loading' ? (
                      <><span className="w-3.5 h-3.5 border border-black/20 border-t-black rounded-full animate-spin" />Sending...</>
                    ) : (
                      <>Send Message <span className="text-xs">→</span></>
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
