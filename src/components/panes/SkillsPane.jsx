import { motion } from 'framer-motion'
import JsonHighlight from '../JsonHighlight'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export default function SkillsPane() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-3xl"
    >
      {/* JSON output */}
      <motion.div variants={item} className="mb-4">
        <JsonHighlight />
      </motion.div>
    </motion.div>
  )
}
