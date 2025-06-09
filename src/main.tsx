import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './ui/App.tsx'
import './common/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
