import { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Practice from './pages/Practice';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ValidatorPage from './pages/ValidatorPage';

function App() {
  const codeValueRef = useRef(null);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const code = codeValueRef.current;
    console.log(code, typeof code);
  };

  const handleEditorChange = (value, event) => {
    codeValueRef.current = value;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/validator" element={<ValidatorPage />} />
      </Routes>
    </div>
  );
}

export default App;
