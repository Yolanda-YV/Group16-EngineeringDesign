import '../index.css';
import React, { useState, useEffect } from 'react';

const Landing = () => {
    return (
      <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto text-white">
          <h1 className="text-3xl font-bold text-center">Welcome to PyMon!</h1>
        </div>
      </header>
      <main className="container mx-auto py-10">
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your AI Python Tutor</h2>
          <p className="text-gray-600">Discover the amazing features we offer to help you achieve success.</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Feature One</h3>
            <p className="text-gray-600">Description of feature one.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Feature Two</h3>
            <p className="text-gray-600">Description of feature two.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Feature Three</h3>
            <p className="text-gray-600">Description of feature three.</p>
          </div>
        </section>
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">Join us today and start enjoying the benefits!</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Sign Up Now</button>
        </section>
      </main>
      <footer className="bg-blue-600 p-4">
        <div className="container mx-auto text-white text-center">
          <p>&copy; 2024 My Landing Page. All rights reserved.</p>
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