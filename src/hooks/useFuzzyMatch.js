import { useCallback } from 'react'

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

export function useFuzzyMatch(commands) {
  return useCallback((input) => {
    if (!input) return null
    let best = null
    let bestDist = Infinity
    for (const cmd of commands) {
      const d = levenshtein(input.toLowerCase(), cmd)
      if (d < bestDist) {
        bestDist = d
        best = cmd
      }
    }
    // Only suggest if reasonably close (within 3 edits)
    return bestDist <= 3 ? best : null
  }, [commands])
}
