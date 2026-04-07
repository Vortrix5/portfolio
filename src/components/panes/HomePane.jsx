import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileDown } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
}
const line = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

const COMMANDS = [
  { cmd: 'about',      desc: "Who I am and what I'm about" },
  { cmd: 'experience', desc: 'Work history and internships' },
  { cmd: 'projects',   desc: "Things I've built" },
  { cmd: 'skills',     desc: 'Technical stack' },
  { cmd: 'awards',     desc: 'Competitions and recognition' },
  { cmd: 'contact',    desc: 'How to reach me' },
  { cmd: 'clear',      desc: 'Clear the terminal' },
  { cmd: 'history',    desc: 'View command history' },
]

const LINKS = [
  { icon: Github,   label: 'GitHub',   sub: 'github.com/Vortrix5',                   href: 'https://github.com/Vortrix5' },
  { icon: Linkedin, label: 'LinkedIn', sub: 'linkedin.com/in/mohamed-amine-zouaoui', href: 'https://linkedin.com/in/mohamed-amine-zouaoui' },
  { icon: Mail,     label: 'Email',    sub: 'amine.zouaoui@ieee.org',                href: 'mailto:amine.zouaoui@ieee.org' },
  { icon: FileDown, label: 'Resume',   sub: '[download]',                            href: '/portfolio/resume.pdf' },
]

export default function HomePane() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 font-mono text-xs md:text-sm max-w-2xl"
    >
      {/* Identity block */}
      <motion.div variants={line} className="mb-1 text-cyan font-medium">
        AZ-OS v1.0.0 - Mohamed Amine Zouaoui
      </motion.div>
      <motion.div variants={line} className="mb-1 text-muted">
        Software Engineering Student · Full-Stack Engineer · Competitive Programmer
      </motion.div>
      <motion.div variants={line} className="mb-5 text-muted">
        Tunis, Tunisia · Open to remote internships and relocation
      </motion.div>

      {/* Commands table */}
      <motion.div variants={line} className="mb-1 text-text font-medium tracking-wider">
        AVAILABLE COMMANDS
      </motion.div>
      <motion.div variants={line} className="mb-2 text-border-active select-none">
        {'\u2500'.repeat(54)}
      </motion.div>

      {COMMANDS.map(({ cmd, desc }) => (
        <motion.div key={cmd} variants={line} className="flex gap-3 mb-1">
          {/* Fixed width wide enough for "experience" (10 chars) */}
          <span className="text-cyan w-24 shrink-0">{cmd}</span>
          <span className="text-muted">{desc}</span>
        </motion.div>
      ))}

      <motion.div variants={line} className="mt-2 mb-5 text-border-active select-none">
        {'\u2500'.repeat(54)}
      </motion.div>

      {/* Quick links */}
      <motion.div variants={line} className="mb-1 text-text font-medium tracking-wider">
        QUICK LINKS
      </motion.div>

      {LINKS.map(({ icon: Icon, label, sub, href }) => (
        <motion.div key={label} variants={line} className="flex items-center gap-2 mb-1.5">
          <span className="text-cyan w-16 shrink-0">{label}</span>
          <span className="text-muted select-none">{'\u2192'}</span>
          <a
            href={href}
            target={href.startsWith('mailto') || href.endsWith('.pdf') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-text hover:text-cyan transition-colors flex items-center gap-1.5"
          >
            <Icon size={11} aria-hidden="true" className="shrink-0 opacity-60" />
            {sub}
          </a>
        </motion.div>
      ))}
      {/* No decorative prompt here — the command bar at the bottom is the only input */}
    </motion.div>
  )
}
