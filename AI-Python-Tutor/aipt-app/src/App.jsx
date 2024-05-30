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
    // supabase.auth.getSession().then(( {data: {session}} ) => {
    //   setSession(session)
    // })
    // const { data: {subscription} } = supabase.auth.onAuthStateChange(( _event, session ) => {
    //   setSession(session)
    // })
    // return () => {
    //   subscription.unsubscribe()
    // }
    const { data } = supabase.auth.onAuthStateChange( (event, session) => {
      console.log(event, session)
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
