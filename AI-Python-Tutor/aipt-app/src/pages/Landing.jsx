import '../index.css';
import React, { useState, useEffect } from 'react';
import logo_primary from '/src/assets/Logo_primary.png';

const Landing = () => {
    return (
      

      <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto text-white">
          <h1 className="text-3xl font-bold text-center">Welcome to PyMon!</h1>
        </div>
      </header>

      <main className="container mx-auto py-10">
        <section className="text-center ">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your AI Python Tutor</h2>
          <p className="text-gray-600">Discover amazing features of an interactive python tutor!</p>
        </section>
      
        <section className="flex items-center justify-center mb-10">
          {/* Logo on the left */}
          <div className="mr-8">
            <img className="w-12 h-12 sm:w-20 sm:h-20" src={logo_primary} alt="Logo" style={{ maxWidth: '250px', height: 'auto' }} />
          </div>
          
          {/* Description of features on the right */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Feature Highlights</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et accumsan tristique.
              Duis sed ipsum id neque varius ultrices ac non libero.
            </p>
            <p className="text-gray-600">
              Phasellus at efficitur purus, nec lacinia metus. Sed ultricies, nulla in molestie mollis, odio odio convallis.
            </p>
          </div>
        </section>



        

  
        <section className="text-center py-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Highlights</h2>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-5">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Personalized Learning Experiences🌀</h3>
            <p className="text-gray-600">Utilizes Large Language Models (LLMs) to tailor lessons to individual users.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">User-Friendly Interface🟢</h3>
            <p className="text-gray-600">Accessible to individuals with no prior programming experience and uses a dark theme that is better for the eyes.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Tutor Support🤖</h3>
            <p className="text-gray-600">Allows users to learn at their own pace with guidance from an AI tutor through PyMon’s tutor chat system.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Real-Time Feedback⚙️</h3>
            <p className="text-gray-600">Provides immediate feedback on code execution through code validation</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Practice and Improvement💪</h3>
            <p className="text-gray-600">Practice coding and receive instant suggestions for improvement.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Progress Tracking📊</h3>
            <p className="text-gray-600">Monitors user interactions and task completions, generating insightful progress reports</p>
          </div>
        </section>
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">Join us today and start enjoying the learning!</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Sign Up Now</button>
        </section>
      </main>
      <footer className="bg-blue-600 p-4">
        <div className="container mx-auto text-white text-center">
          <p>&copy; 2024 PyMon. All rights reserved.</p>
        </div>
      </footer>
    </div>
      // <div className='w-full bg-white py -24'>Landing Test
      //   <div className = 'max-w-[1400px] m -auto grid grid-cols-2'>
      //     <div>
      //       <p className='text-2x1 text-[#208486]'>START</p>
            
      //     </div>
      //   </div>
      
      
      // </div>
    )
  };
  
export default Landing;