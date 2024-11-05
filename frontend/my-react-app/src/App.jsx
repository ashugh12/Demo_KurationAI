import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LeadCaptureForm from './components/LeadCapture'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<h1> Google Auth</h1>} /> */}
        <Route path="/" element={<LeadCaptureForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
