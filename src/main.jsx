import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RoleProvider } from './hooks/RoleContext.jsx'
import { ThemProvider } from './hooks/ThemContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemProvider>
    <RoleProvider>
      <App />
    </RoleProvider>
    </ThemProvider>
  </StrictMode>,
)
