import { motion } from 'framer-motion'
import { awards } from '../../data/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const logLine = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.22 } },
}

// Fixed column widths that fit their content without overlap:
// [2025] = 6 chars + brackets = needs ~w-14 (56px) at xs mono
// ACHIEVED = 8 chars = needs ~w-20 (80px)
const COL_YEAR     = 'w-14 shrink-0'  // "[2024]"
const COL_STATUS   = 'w-20 shrink-0'  // "ACHIEVED"

export default function AwardsPane() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-3xl"
    >
      {/* Log entries */}
      <div className="space-y-3 font-mono text-xs">
        {awards.map((award, i) => (
          <motion.div key={i} variants={logLine} className="leading-snug">
            {/* Title row */}
            <div className="flex items-baseline gap-2">
              <span className={`text-muted ${COL_YEAR}`}>[{award.year}]</span>
              <span className={`text-green font-semibold ${COL_STATUS}`}>ACHIEVED</span>
              <span className="text-yellow">{award.title}</span>
            </div>
            {/* Description row — indented to align with title */}
            {award.desc && (
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`${COL_YEAR} select-none`} aria-hidden="true" />
                <span className={`${COL_STATUS} select-none`} aria-hidden="true" />
                <span className="text-muted">{award.desc}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Loading next achievement */}
      <motion.div
        variants={logLine}
        className="font-mono text-xs mt-6 flex items-center gap-2"
      >
        <span className={`text-muted ${COL_YEAR}`}>[....]</span>
        <span className={`text-cyan font-semibold animate-pulse ${COL_STATUS}`}>
          LOADING
        </span>
        <span className="text-muted">Next achievement...</span>
      </motion.div>
    </motion.div>
  )
}
