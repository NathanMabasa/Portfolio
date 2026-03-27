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
    <section aria-label="Skills" className="py-5 border-y border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
      <div className="marquee-wrapper mb-3">
        <div className="marquee-track">
          {D.map((s, i) => (
            <span key={`a-${i}`} className="inline-flex items-center gap-5 text-[11px] font-mono font-normal uppercase tracking-[0.22em] text-[#333] whitespace-nowrap px-5">
              <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse">
          {[...D].reverse().map((s, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-5 text-[11px] font-mono font-normal uppercase tracking-[0.22em] text-[#2a2a2a] whitespace-nowrap px-5 hover:text-[#555] transition-colors duration-300">
              <span className="w-1 h-1 border border-[#333] rounded-full flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
