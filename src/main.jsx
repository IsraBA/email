import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PopupProvider } from './Context/PopupContext.jsx'
import { SearchHighlightProvider } from './Context/HighlightContext.jsx'
import { UserProvider } from './Context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <SearchHighlightProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </SearchHighlightProvider>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
