import '../index.css';
import React from 'react';
import logo_primary from '/src/assets/Logo_primary.png';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto text-white">
          <h1 className="text-3xl font-bold text-center">Welcome to PyMon!</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-200 py-20 text-center">
        <div className="container mx-auto">
          <img src={logo_primary} alt="PyMon Logo" className="mx-auto mb-6" style={{ maxWidth: '300px', height: 'auto' }} />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Master Python with PyMon</h1>
          <p className="text-gray-600 mb-6 text-xl">
            Your AI-powered Python tutor, here to guide you through every step of your coding journey.
          </p>
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg">Get Started Now</button>
          </Link>
        </div>
      </section>

      <main className="container mx-auto py-10">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your AI Python Tutor</h2>
          <p className="text-gray-600">Discover amazing features of an interactive python tutor!</p>
        </section>

        <section className="text-center py-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Highlights</h2>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-5">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Personalized Learning 🍫</h3>
            <p className="text-gray-600">Utilizes Large Language Models (LLMs) (GPT 3.5/GPT-4o-mini) to tailor lessons to individual users.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">User-Friendly Interface 🟢</h3>
            <p className="text-gray-600">Accessible to individuals with no prior programming experience and uses a dark theme that is better for the eyes.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Tutor Support 🤖</h3>
            <p className="text-gray-600">Allows users to learn at their own pace with guidance from an AI tutor through PyMon’s tutor chat system.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Real-Time Feedback ⚙️</h3>
            <p className="text-gray-600">Provides immediate feedback on code execution through code validation.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Practice and Improvement 💪</h3>
            <p className="text-gray-600">Practice coding and receive instant suggestions for improvement.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Progress Tracking 📊</h3>
            <p className="text-gray-600">Monitors user interactions and task completions, generating insightful progress reports.</p>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="text-center py-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Watch Our Demo</h2>
          <p className="text-gray-600 mb-4">See PyMon in action and understand how it can help you learn Python effectively.</p>
          <div className="relative pb-9/16">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/-DiWnlg03VU"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="PyMon Demo"
            ></iframe>
          </div>
        </section>

        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">Join us today and start enjoying the learning!</p>
          <Link to="/signup">         
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Sign Up Now</button>
          </Link>
        </section>

        <section className="text-center py-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"PyMon has transformed my learning experience. The AI tutor is incredibly helpful and the interface is very user-friendly!"</p>
              <p className="text-gray-800 font-bold">- Jane Doe</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"I love the real-time feedback feature. It helps me correct my mistakes instantly and learn more efficiently."</p>
              <p className="text-gray-800 font-bold">- John Smith</p>
            </div>
          </div>
        </section>

        <section className="text-center py-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 mb-4">
            PyMon is dedicated to providing an accessible and effective learning platform for Python programming. Our mission is to empower individuals of all backgrounds to learn and master Python with the help of our innovative AI tutor.
          </p>
        </section>

        <section className="text-center py-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">Have questions or need support? Reach out to us at:</p>
          <p className="text-gray-800 mb-2">Email: support@pymon.com</p>
          <p className="text-gray-800 mb-2">Phone: +123-456-7890</p>
          <p className="text-gray-800">Address: 123 Learning St, Education City, PY 12345</p>
        </section>
      </main>

      <footer className="bg-blue-600 p-4">
        <div className="container mx-auto text-white text-center">
          <p>&copy; 2024 PyMon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
