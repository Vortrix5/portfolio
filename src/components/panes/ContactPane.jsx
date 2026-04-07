import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, FileDown } from 'lucide-react'
import { contact } from '../../data/content'

const ICON_MAP = { Mail, Linkedin, Github, FileDown }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export default function ContactPane() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-2xl font-mono text-xs"
    >
      <motion.div variants={item} className="mb-4 text-muted">
        Initializing connection...
      </motion.div>

      {/* Open to */}
      <motion.div variants={item} className="mb-5 space-y-0.5">
        {contact.intro.map((line, i) => (
          <div
            key={i}
            className={line.startsWith('  -') ? 'text-muted pl-2' : 'text-text'}
          >
            {line}
          </div>
        ))}
      </motion.div>

      {/* Channels */}
      <motion.div variants={item} className="mb-1 text-text font-medium">
        CHANNELS
      </motion.div>
      <motion.div variants={item} className="text-border-active mb-2 select-none">
        {'\u2500'.repeat(46)}
      </motion.div>

      {contact.channels.map(({ icon, label, href }) => {
        const Icon = ICON_MAP[icon]
        return (
          <motion.div key={label} variants={item} className="mb-1.5">
            <a
              href={href}
              target={href.startsWith('mailto') || href.endsWith('.pdf') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-3 text-text hover:text-cyan transition-colors"
            >
              <Icon size={12} aria-hidden="true" className="shrink-0" />
              <span>{
                label === 'Resume'
                  ? 'Resume (PDF) -> [download]'
                  : label === 'Email'
                  ? href.replace('mailto:', '')
                  : href.replace('https://', '')
              }</span>
            </a>
          </motion.div>
        )
      })}

      <motion.div variants={item} className="text-border-active mt-2 mb-5 select-none">
        {'\u2500'.repeat(46)}
      </motion.div>

      <motion.div variants={item} className="space-y-0.5 text-muted">
        <div>Response time: typically &lt; 24h</div>
        <div>Timezone: UTC+1 (Tunis, Tunisia)</div>
      </motion.div>

      <motion.div variants={item} className="mt-5 text-green">
        Connection established. Awaiting your message.
      </motion.div>
    </motion.div>
  )
}
