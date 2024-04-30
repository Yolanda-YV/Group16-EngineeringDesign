import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Editor from '@monaco-editor/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Practice from './pages/Practice'
import Dashboard from './pages/Dashboard'

function App() {
  // Using useRef to hold code editor value to store it between re-renders 
  // - doesn't reset on every render 
  // - doesn't trigger a re-render on change)
  const codeValueRef = useRef(null)

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    const code = codeValueRef.current
    console.log(code, typeof(code))
  }
  const handleEditorChange = (value, event) => {
    codeValueRef.current = value
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
  )
}

export default App
