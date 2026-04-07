import { motion } from 'framer-motion'
import { experience, education } from '../../data/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const entryAnim = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

export default function ExperiencePane() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-3xl"
    >
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute top-2 bottom-2 w-px"
          style={{
            left: '8px',
            background: 'linear-gradient(to bottom, var(--border-active), var(--border))',
          }}
        />

        <div className="space-y-8 pl-8">
          {experience.map((exp) => (
            <motion.div key={exp.company} variants={entryAnim} className="relative">
              {/* Node circle */}
              <div
                className="absolute w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  left: '-28px',
                  top: '2px',
                  borderColor: exp.current ? 'var(--green)' : 'var(--muted)',
                  background: exp.current ? 'rgba(166,227,161,0.15)' : 'var(--surface)',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: exp.current ? 'var(--green)' : 'var(--muted)' }}
                />
              </div>

              {/* Entry content - no card border, pure typography */}
              <div>
                {/* Header row */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 mb-0.5">
                  <h3 className="font-display text-base md:text-lg font-semibold text-text">
                    {exp.company}
                    {exp.current && (
                      <span className="ml-2 font-mono text-xs text-green font-normal">
                        [active]
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-muted shrink-0">{exp.dates}</span>
                </div>

                {/* Role + location */}
                <div className="font-mono text-xs text-muted mb-3">
                  {exp.role} · {exp.location}
                </div>

                {/* Description in Literata */}
                <p className="font-serif text-sm text-text leading-relaxed mb-3 max-w-xl">
                  {exp.description}
                </p>

                {/* Tags - plain text with dots, no pills */}
                <div className="font-mono text-xs text-muted">
                  {exp.tags.join(' · ')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education block */}
      <motion.div variants={entryAnim} className="mt-10">
        <hr className="term-rule" />
        <div className="font-mono text-xs text-muted mb-4">EDUCATION</div>
        <div className="space-y-4 pl-8">
          {education.map((edu) => (
            <div key={edu.institution}>
              <div className="flex flex-wrap justify-between gap-2 mb-0.5">
                <span className="font-display text-sm font-semibold text-text">
                  {edu.institution}
                </span>
                <span className="font-mono text-xs text-muted">{edu.dates}</span>
              </div>
              <div className="font-mono text-xs text-muted mb-1">{edu.degree}</div>
              <div className="font-mono text-xs text-muted opacity-70">{edu.note}</div>
              {edu.relevant && (
                <div className="font-mono text-xs text-muted opacity-50 mt-0.5">
                  {edu.relevant}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
