import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { about } from '../../data/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}
const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

function CountUp({ target, suffix, started }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let frame = 0
    const total = 40
    const id = setInterval(() => {
      frame++
      setCount(Math.min(Math.round((frame / total) * target), target))
      if (frame >= total) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [started, target])

  return <span>{count}{suffix}</span>
}

function StatCard({ stat, started }) {
  const match = stat.value.match(/^(\d+)(.*)$/)
  const numeric = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''

  return (
    <div className="border border-border p-3 flex flex-col gap-1">
      <div className="font-display text-2xl font-bold text-cyan tabular-nums">
        {numeric !== null
          ? <CountUp target={numeric} suffix={suffix} started={started} />
          : stat.value
        }
      </div>
      <div className="font-mono text-xs text-muted leading-snug whitespace-pre-line">
        {stat.label}
      </div>
    </div>
  )
}

export default function AboutPane() {
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setStatsStarted(true), 400)
    return () => clearTimeout(id)
  }, [])

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-3xl"
    >
      {/* Identity block */}
      <motion.div variants={item} className="font-mono text-xs space-y-1 mb-3">
        {about.identity.map(({ key, value }) => (
          <div key={key} className="flex gap-0">
            <span className="text-cyan w-24 shrink-0">{key}</span>
            <span className="text-text">{value}</span>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item}><hr className="border-none border-t border-border my-3" /></motion.div>

      {/* Bio */}
      <motion.div variants={item} className="space-y-2 mb-3">
        {about.bio.map((para, i) => (
          <p key={i} className="font-serif text-sm text-text leading-relaxed">
            {para}
          </p>
        ))}
      </motion.div>

      <motion.div variants={item}><hr className="border-none border-t border-border my-3" /></motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {about.stats.map(stat => (
          <StatCard key={stat.value} stat={stat} started={statsStarted} />
        ))}
      </motion.div>
    </motion.div>
  )
}
