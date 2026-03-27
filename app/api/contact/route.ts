import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sanitizeHtml } from '@/lib/utils'

// Simple in-memory rate limiter (resets on cold start)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (record.count >= RATE_LIMIT_MAX) return false
  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data.', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // Sanitize all fields before using in email HTML
    const safeName = sanitizeHtml(name)
    const safeEmail = sanitizeHtml(email)
    const safeSubject = sanitizeHtml(subject ?? 'New message from portfolio')
    const safeMessage = sanitizeHtml(message).replace(/\n/g, '<br>')

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const toEmail = process.env.CONTACT_EMAIL ?? 'hello@nathanmabasa.com'

      await resend.emails.send({
        from: 'Portfolio Contact <noreply@nathanmabasa.com>',
        to: toEmail,
        reply_to: safeEmail,
        subject: `[Portfolio] ${safeSubject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#111;">New message from ${safeName}</h2>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <hr style="border:1px solid #eee;margin:20px 0;">
            <p><strong>Message:</strong></p>
            <p style="line-height:1.6;color:#333;">${safeMessage}</p>
          </div>
        `,
      })
    } else {
      // Development fallback
      console.log('[Contact Form]', { name: safeName, email: safeEmail, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
