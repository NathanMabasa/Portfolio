'use client'

const SKILLS = [
  'Brand Identity', 'UI Design', 'UX Strategy', 'Motion Design',
  'Creative Development', 'Design Systems', 'Web Development',
  'Visual Identity', 'Interaction Design', 'Figma', 'Next.js',
  'Tailwind CSS', 'Digital Strategy', 'Typography', 'Prototyping',
]

const D = [...SKILLS, ...SKILLS]

export default function Skills() {
  return (
    <section aria-label="Skills" className="py-4 border-y border-white/[0.04] bg-[#0a0a0a] overflow-hidden">
      <div className="marquee-wrapper mb-2.5">
        <div className="marquee-track">
          {D.map((s, i) => (
            <span key={`a-${i}`} className="inline-flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#2a2a2a] whitespace-nowrap px-5">
              <span className="w-[3px] h-[3px] rounded-full bg-white/20 flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse">
          {[...D].reverse().map((s, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#222] whitespace-nowrap px-5">
              <span className="w-[3px] h-[3px] rounded-full border border-white/10 flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
