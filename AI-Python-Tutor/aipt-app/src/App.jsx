import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Editor from '@monaco-editor/react'

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
    <div className='whole-page'>
      <form className='code-tool' onSubmit={handleCodeSubmit}>
        <Editor 
          height='85.3vh' 
          width='100%'
          theme='vs-dark'
          defaultLanguage='python'
          defaultValue='# Write your code here'
          onChange={handleEditorChange}></Editor>
        <button className='submit-btn' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
