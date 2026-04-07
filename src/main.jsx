import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'

console.log([
  "  +-----------------------------------------+",
  "  |  You opened DevTools. Nice instincts.   |",
  "  |  Stack: React + Vite + Framer Motion    |",
  "  |  IEEEXtreme: 49th globally / 6500+ ppl |",
  "  |  github.com/Vortrix5                    |",
  "  |  amine.zouaoui@ieee.org                 |",
  "  +-----------------------------------------+",
].join("\n"))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
