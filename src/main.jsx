/**
 * Application Entry Point
 * Initializes React application with StrictMode for development checks.
 * Mounts the root App component to the DOM.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// Create root and render application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
