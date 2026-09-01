import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SerpientePorTurnos from './serpientePorTurnos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SerpientePorTurnos />
  </StrictMode>,
)