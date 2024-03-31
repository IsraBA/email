import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PopupProvider } from './Context/PopupContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PopupProvider>
      <App />
    </PopupProvider>
  </BrowserRouter>
)
