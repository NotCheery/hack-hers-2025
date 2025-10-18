'use client';

import React, { useState, useCallback, useEffect } from 'react';
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



const ClutchAuthPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
            setLocationError(null);
          },
          (error) => {
            setLocationError(error.message);
          }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    if (showMap && !userLocation) {
      requestLocation();
    }
  }, [showMap, userLocation]);

  // Initialize map when location is available
  useEffect(() => {
    if (showMap && userLocation && typeof window !== 'undefined') {
      // Dynamically load Leaflet CSS and JS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        setTimeout(() => {
          const mapContainer = document.getElementById('map');
          if (mapContainer && window.L) {
            // Clear any existing map
            mapContainer.innerHTML = '';

            // Create map
            const map = window.L.map('map').setView([userLocation.lat, userLocation.lng], 15);

            // Add tile layer
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add marker for user location
            const customIcon = window.L.icon({
              iconUrl: '/ClutchIcons/location.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            });

            const marker = window.L.marker([userLocation.lat, userLocation.lng], {icon: customIcon}).addTo(map);
            marker.bindPopup('<b>You are here!</b>').openPopup();

            // Add accuracy circle
            window.L.circle([userLocation.lat, userLocation.lng], {
              color: '#ec4899',
              fillColor: '#ec4899',
              fillOpacity: 0.1,
              radius: userLocation.accuracy
            }).addTo(map);
          }
        }, 100);
      };
      document.head.appendChild(script);
    }
  }, [showMap, userLocation]);


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
          {/* Navbar - Always visible */}
          <nav className="w-full bg-white shadow-md p-4 flex items-center justify-center sticky top-0 z-50">
            <div className="flex items-center space-x-6">
              <img src={"/ClutchIcons/star.ico"} className="h-6 w-6" />
              <button
                  onClick={() => setShowMap(true)}
                  className="px-3 py-1 text-sm text-gray-700 hover:text-pink-600 transition duration-150"
              >
                <img src="/ClutchIcons/location.png" alt="Location" className="h-8 w-8" />
                Map
              </button>
              <button className="px-3 py-1 text-sm text-gray-700 hover:text-pink-600 transition duration-150">
                <img src="/ClutchIcons/chat.png" alt="Chat" className="h-8 w-8" />
                Community
              </button>
              <button className="px-3 py-1 text-sm text-gray-700 hover:text-pink-600 transition duration-150">
                <img src="/ClutchIcons/add.png" alt="Add" className="h-8 w-8" />
                Add Request
              </button>
              <button className="px-3 py-1 text-sm text-gray-700 hover:text-pink-600 transition duration-150">
                <img src="/ClutchIcons/caution.png" alt="Help" className="h-8 w-8" />
                Help
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
          <main className="flex-grow relative">
            {/* Map Modal - Positioned over content but below navbar */}
            {showMap && (
                <div className="fixed inset-0 top-[72px] bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg w-full max-w-6xl h-[calc(100vh-120px)] flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Map View</h2>
                      <button
                          onClick={() => setShowMap(false)}
                          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 border-b">
                      {userLocation ? (
                          <div className="text-sm flex items-center space-x-2">
                            <img src="/ClutchIcons/location.png" alt="Location" className="h-5 w-5" />
                            <div>
                              <p className="font-medium text-green-600">Location Found</p>
                              <p className="text-gray-600">
                                Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
                              </p>
                              <p className="text-gray-500 text-xs">
                                Accuracy: ±{Math.round(userLocation.accuracy)}m
                              </p>
                            </div>
                          </div>
                      ) : locationError ? (
                          <div className="text-sm">
                            <p className="font-medium text-red-600">❌ Location Error</p>
                            <p className="text-gray-600">{locationError}</p>
                            <button
                                onClick={requestLocation}
                                className="mt-2 px-3 py-1 bg-pink-500 text-white text-xs rounded hover:bg-pink-600"
                            >
                              Try Again
                            </button>
                          </div>
                      ) : (
                          <div className="text-sm text-gray-600">
                            🔄 Requesting your location...
                          </div>
                      )}
                    </div>

                    <div className="flex-1 relative">
                      {userLocation ? (
                          <div id="map" className="w-full h-full"></div>
                      ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="text-center text-gray-500">
                              <img src="/ClutchIcons/location.png" alt="Location" className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <p>Waiting for location access...</p>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
            )}

            {/* Dashboard Content */}
            <div className="p-6 text-center text-gray-600">
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
            <div className="inline-flex p-3 ">
              <img src={"/ClutchIcons/star.ico"} className="h-32 w-32 " />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1 leading-tight">
              Clutch
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
                <img src="/ClutchIcons/envelope.png" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                <img src="/ClutchIcons/lock_alt.png" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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

export default ClutchAuthPage;