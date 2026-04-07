import { skills } from '../data/content'

/**
 * Renders skills as compact JSON — values inline and wrapping.
 * Uses static class names (not template literals) so Tailwind
 * does not purge text-mauve from the production bundle.
 */
export default function JsonHighlight() {
  const entries = Object.entries(skills)

  return (
    <div className="font-mono text-xs leading-relaxed">
      <div className="text-muted">{'{'}</div>

      {entries.map(([key, values], i) => {
        const isLast = i === entries.length - 1
        const isMl = key === 'ai_ml'

        return (
          <div key={key} className="pl-4 flex flex-wrap items-baseline py-0.5">
            {/* Key — ai_ml gets mauve, all others get cyan */}
            <span className="text-muted shrink-0">"</span>
            {isMl
              ? <span style={{ color: '#cba6f7' }} className="shrink-0">{key}</span>
              : <span className="text-cyan shrink-0">{key}</span>
            }
            <span className="text-muted shrink-0">"</span>
            <span className="text-text shrink-0">:&nbsp;</span>
            <span className="text-muted shrink-0">[</span>

            {/* Values inline, wrapping */}
            {values.map((v, j) => (
              <span key={v} className="inline">
                <span className="text-muted">"</span>
                <span className="text-yellow">{v}</span>
                <span className="text-muted">"</span>
                {j < values.length - 1 && (
                  <span className="text-text">,&nbsp;</span>
                )}
              </span>
            ))}

            <span className="text-muted">]</span>
            {!isLast && <span className="text-text">,</span>}
          </div>
        )
      })}

      <div className="text-muted">{'}'}</div>
    </div>
  )
}
