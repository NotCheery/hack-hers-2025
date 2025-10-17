'use client';

import React, { useState, useCallback } from 'react';
import { Timer, Mail, Lock } from 'lucide-react';


/**The following are mock api calls, the real thing will use Axios**/
const mockApiCall = async (data) => {

  if (data.email === 'test@university.edu' && data.password === 'password123') {
    return {
      success: true,
      message: 'Login successful. Redirecting to dashboard...',
      token: 'jwt-mock-token-12345', //real token will use bcrypt
    };
  } else {
    return {
      success: false,
      message: 'Invalid credentials or account not found.',
    };
  }
};



const StitchAuthPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);


    if (!formData.email || !formData.password) {
      setError('Please fill out both email and password.');
      setLoading(false);
      return;
    }

    try {
      // API call placeholder logic
      const response = await mockApiCall(formData);

      if (response.success) {
        setSuccess(response.message);
        setTimeout(() => setIsLoggedIn(true), 1000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const baseButtonClasses = 'w-full py-3 px-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300 ease-in-out';
  const loginButtonClasses = loading
      ? `${baseButtonClasses} bg-pink-400 cursor-not-allowed`
      : `${baseButtonClasses} bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300`;

  const signupButtonClasses = loading
      ? `${baseButtonClasses} border-2 border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed shadow-none`
      : `${baseButtonClasses} border-2 border-pink-500 bg-white text-pink-500 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-pink-100 shadow-none`;

  // --- Layout for the Navigation/Dashboard View (Post-Login) ---
  if (isLoggedIn) {
    return (
        <div className="min-h-screen bg-pink-50/50 flex flex-col">
          {/* Navbar based on wireframe */}
          <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center space-x-2">
              <Timer className="h-6 w-6 text-pink-600" />
              <h1 className="text-xl font-bold text-gray-800">Stitch Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {formData.email.split('@')[0]}!
              </div>
              //links buttons for future use
              <button className="px-3 py-1 text-sm text-gray-700 hover:text-pink-600 transition duration-150">
                Essentials
              </button>
              <button className="px-3 py-1 text-sm text-gray-700 hover:text-pink-600 transition duration-150">
                Community
              </button>
              <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-3 py-1 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition duration-150"
              >
                Logout
              </button>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="flex-grow p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">
              Successfully Logged In!
            </h2>
            <p>
              This is your placeholder dashboard view. The navigation bar above is ready for new pages.
            </p>
            <div className="mt-8 space-y-3 max-w-lg mx-auto">
              <div className="p-4 bg-white rounded-xl shadow-lg border border-pink-200">
                <p className="font-medium text-lg text-pink-700">Page 1: Essentials Sharing</p>
                <p className="text-sm">Manage item listings and requests.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-lg border border-pink-200">
                <p className="font-medium text-lg text-pink-700">Page 2: Community Boards</p>
                <p className="text-sm">Connect with other students.</p>
              </div>
            </div>
          </main>
        </div>
    );
  }

  // sign up---
  return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50/50 p-4">
        {/* Content Card: Max width on desktop, full width on mobile */}
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl transition-all duration-300">


          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-pink-100 mb-4">
              {/* The icon from the image is a circular/clock design */}
              <Timer className="h-10 w-10 text-pink-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1 leading-tight">
              Stitch
            </h1>
            <p className="text-gray-600 text-base font-normal tracking-wide">
              Sharing essentials, building community.
            </p>
          </div>

          {(error || success) && (
              <div className={`p-3 mb-4 rounded-xl text-sm font-medium ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {error || success}
              </div>//status messages
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Input Group */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                University Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out text-base"
                    placeholder="you@university.edu"
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={loading}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out text-base"
                    placeholder="••••••••"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 pt-2">
              {/* Log In Button - Primary (Pink) */}
              <button
                  type="submit"
                  disabled={loading}
                  className={loginButtonClasses}
              >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 inline text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Log In'
                )}
              </button>

              {/* Sign Up Button */}
              <button
                  type="button" // Use type="button" to prevent form submission
                  disabled={loading}
                  className={signupButtonClasses}
              >
                Sign Up
              </button>
            </div>
          </form>

        </div>
      </div>
  );
};

export default StitchAuthPage;
