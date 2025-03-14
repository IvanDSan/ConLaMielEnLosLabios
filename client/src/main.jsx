import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Products } from './components/products.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Products />
  </StrictMode>,
)
