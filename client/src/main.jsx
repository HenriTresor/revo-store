import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import AuthContext from './context/AuthContext.jsx'
import AppContext from './context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContext>
        <AppContext>
          <App />
       </AppContext>
      </AuthContext>
    </Router>
  </React.StrictMode>,
)
