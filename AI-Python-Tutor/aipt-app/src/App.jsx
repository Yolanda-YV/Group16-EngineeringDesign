import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Editor from '@monaco-editor/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Practice from './pages/Practice'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import supabase from './utilities/Supabase.js'

function App() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange( (event, session) => {
      console.log(event, session) // For testing purposes
      setSession(session) // If session is null, user is not signed in (INITIAL_SESSION and SIGNED_OUT)
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  // Showing different pages based on whether the user is signed in or not
  if (session) {
    // User is signed in
    // Dashboard is root Practice page is assessible
    // Logout button shown in navbar
    return (
      <div>
      <Navbar signedIn={true} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
    )
  } else {
    // User is not signed in
    // Signin page is root, and only other page accessible is signup
    // Logout button not shown in navbar
    return (
      <div>
        <Navbar signedIn={false} />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    )
  }
}

export default App
