'use client'

const skills = [
  'Brand Identity',
  'UI Design',
  'UX Strategy',
  'Motion Design',
  'Creative Development',
  'Design Systems',
  'Web Development',
  'Visual Identity',
  'Interaction Design',
  'Figma',
  'Next.js',
  'Tailwind CSS',
  'Digital Strategy',
  'Typography',
  'Prototyping',
]

const skillsDoubled = [...skills, ...skills]

export default function Skills() {
  return (
    <section aria-label="Skills" className="py-8 border-y border-border overflow-hidden">
      {/* Row 1 — left to right */}
      <div className="marquee-wrapper mb-4">
        <div className="marquee-track gap-8">
          {skillsDoubled.map((skill, i) => (
            <span
              key={`a-${i}`}
              className="inline-flex items-center gap-6 text-sm font-display font-medium uppercase tracking-widest text-fg-2 whitespace-nowrap px-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse gap-8">
          {[...skillsDoubled].reverse().map((skill, i) => (
            <span
              key={`b-${i}`}
              className="inline-flex items-center gap-6 text-sm font-display font-medium uppercase tracking-widest text-fg-3 whitespace-nowrap px-4 hover:text-accent transition-colors duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full border border-fg-3 flex-shrink-0" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
