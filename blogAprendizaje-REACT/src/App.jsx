import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PublicationPage from './pages/PublicationPage'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publication/:id" element={<PublicationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App