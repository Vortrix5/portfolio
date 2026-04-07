import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain, Database, Network, Shield,
  GitBranch, Lock, Shuffle, Monitor,
  Users, BarChart2, Cloud,
  TrendingUp, Cpu, Activity,
  ExternalLink, Award,
} from 'lucide-react'
import { projects } from '../../data/content'

const ICONS = {
  Brain, Database, Network, Shield,
  GitBranch, Lock, Shuffle, Monitor,
  Users, BarChart2, Cloud,
  TrendingUp, Cpu, Activity,
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const entryAnim = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

function ProjectEntry({ project, dimmed }) {
  const Icon = (name) => {
    const C = ICONS[name]
    return C ? <C size={12} aria-hidden="true" className="shrink-0 mt-0.5" /> : null
  }

  return (
    <div
      className="transition-opacity duration-200"
      style={{ opacity: dimmed ? 0.3 : 1 }}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-start gap-x-4 gap-y-1 mb-1">
        <span className="font-display text-base font-bold text-text">
          {project.name}
          {project.context && (
            <span className="font-mono text-xs text-muted font-normal ml-1.5">
              {project.context}
            </span>
          )}
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          {project.status && (
            <span className="font-mono text-xs text-green">{project.status}</span>
          )}
          {project.award && (
            <span className="font-mono text-xs text-yellow">{project.award}</span>
          )}
        </div>
      </div>

      {/* Award detail */}
      {project.awardDetail && (
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted mb-2">
          <Award size={11} aria-hidden="true" />
          {project.awardDetail}
        </div>
      )}

      {/* Tagline */}
      <p className="font-serif text-sm text-text italic mb-3">
        {project.tagline}
      </p>

      {/* Highlights */}
      <div className="space-y-1 mb-3">
        {project.highlights.map((h) => (
          <div key={h.text} className="flex items-start gap-2 font-mono text-xs text-muted">
            {Icon(h.icon)}
            <span>{h.text}</span>
          </div>
        ))}
      </div>

      {/* Stack + links */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
        <span className="text-muted">
          <span className="text-cyan">STACK: </span>
          {project.stack}
        </span>
        {project.aiml && (
          <span className="text-mauve">[ ML ]</span>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on GitHub`}
            className="flex items-center gap-1.5 transition-all px-2 py-0.5 border border-cyan text-cyan hover:border-cyan hover:bg-cyan/10"
          >
            <ExternalLink size={11} aria-hidden="true" />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  )
}

export default function ProjectsPane() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-3xl"
    >
      {/* Projects list */}
      <div className="space-y-0">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={entryAnim}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <ProjectEntry
              project={project}
              dimmed={hoveredId !== null && hoveredId !== project.id}
            />
            {i < projects.length - 1 && (
              <div className="font-mono text-xs text-border my-4 select-none">
                {'\u2500'.repeat(60)}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
