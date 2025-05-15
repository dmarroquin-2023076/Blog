import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importar Bootstrap CSS - si usas Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Importar Bootstrap JS - si necesitas los componentes JS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)