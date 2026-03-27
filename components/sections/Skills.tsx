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
    <section aria-label="Skills" className="py-6 border-y border-[#e5e5e5] bg-white overflow-hidden">
      <div className="marquee-wrapper mb-3">
        <div className="marquee-track">
          {D.map((s, i) => (
            <span key={`a-${i}`} className="inline-flex items-center gap-5 text-[11px] font-mono font-normal uppercase tracking-[0.22em] text-[#bbb] whitespace-nowrap px-5">
              <span className="w-1 h-1 rounded-full bg-black flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse">
          {[...D].reverse().map((s, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-5 text-[11px] font-mono font-normal uppercase tracking-[0.22em] text-[#ccc] whitespace-nowrap px-5 hover:text-[#888] transition-colors duration-300">
              <span className="w-1 h-1 border border-[#ccc] rounded-full flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
