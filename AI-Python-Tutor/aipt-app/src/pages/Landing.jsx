import '../index.css';
import React, { useState, useEffect } from 'react';
import supabase from '../utilities/Supabase'; // Import Supabase client instance
import ProfileCard from '../components/ProfileCard';
import TopicCards from '../components/TopicCards';
import { ClipLoader } from 'react-spinners';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Welcome to PyMon</h1>
        </div>
      </header>
      <main className="container mx-auto py-10">
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
          <p className="text-gray-400 mb-6">Discover the amazing features we offer to help you achieve success.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Personalized Learning Experiences</h3>
              <p className="text-gray-400">Utilizes Large Language Models (LLMs) to tailor lessons to individual users.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">User-Friendly Interface</h3>
              <p className="text-gray-400">Accessible to individuals with no prior programming experience and uses a dark theme that is better for the eyes.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">AI Tutor Support</h3>
              <p className="text-gray-400">Allows users to learn at their own pace with guidance from an AI tutor through PyMon’s tutor chat system.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Real-Time Feedback</h3>
              <p className="text-gray-400">Provides immediate feedback on code execution through a code validation and interpretation system.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Practice and Improvement</h3>
              <p className="text-gray-400">Enables users to practice coding and receive instant suggestions for improvement.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Progress Tracking and Engagement Monitoring</h3>
              <p className="text-gray-400">Monitors user interactions and task completions, generating insightful progress reports.</p>
            </div>
          </div>
        </section>
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-white mb-4">Availability</h2>
          <p className="text-gray-400 mb-4">PyMon is free to use and requires only the creation of an account to use. PyMon is available as a web application.</p>
        </section>
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-white mb-4">About Group 16</h2>
          <p className="text-gray-400 mb-4">Pymon is changing programming education. For more information about PyMon, head over to our website: <a href="https://pymon.netlify.app" className="text-blue-500 underline">pymon.netlify.app</a></p>
        </section>
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold text-white mb-4">Get Started</h2>
          <p className="text-gray-400 mb-4">Join us today and start enjoying the benefits!</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Sign Up Now</button>
        </section>
      </main>
      <footer className="bg-blue-600 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 PyMon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
  
export default Landing;