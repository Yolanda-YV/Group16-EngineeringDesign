import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Using useRef to hold code editor value to store it between re-renders 
  // - doesn't reset on every render 
  // - doesn't trigger a re-render on change)
  const codeValueRef = useRef(null)

  return (
    <div className='whole-page'>

    </div>
  )
}

export default App
