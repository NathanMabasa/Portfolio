'use client'

const skills = [
  'Brand Identity', 'UI Design', 'UX Strategy', 'Motion Design',
  'Creative Development', 'Design Systems', 'Web Development',
  'Visual Identity', 'Interaction Design', 'Figma', 'Next.js',
  'Tailwind CSS', 'Digital Strategy', 'Typography', 'Prototyping',
]

const doubled = [...skills, ...skills]

export default function Skills() {
  return (
    <section aria-label="Skills" className="py-7 border-y border-[#141414] bg-[#080808] overflow-hidden">
      {/* Row 1 */}
      <div className="marquee-wrapper mb-3">
        <div className="marquee-track">
          {doubled.map((s, i) => (
            <span
              key={`a-${i}`}
              className="inline-flex items-center gap-5 text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-[#3a3a3a] whitespace-nowrap px-5"
            >
              <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse">
          {[...doubled].reverse().map((s, i) => (
            <span
              key={`b-${i}`}
              className="inline-flex items-center gap-5 text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-[#2a2a2a] whitespace-nowrap px-5 hover:text-[#555] transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full border border-[#2a2a2a] flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
