'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Timer, Mail, Lock } from 'lucide-react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const ClutchAuthPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    avatar: <img src="/ClutchIcons/user.png" alt="User" className="w-28 h-28" />,
    helpedCount: 23,
    requestedItems: ["Period Products", "Cosmetics", "Medication"],
    activePairings: 2
  };

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        router.push('/signup'); // Redirect to signup first
      }
    });

    return () => unsubscribe();
  }, [router]);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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
    if (showMap && userLocation) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: userLocation.lat, lng: userLocation.lng },
          zoom: 15
        });
        
        new window.google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          map: map,
          title: 'Your Location'
        });
      };
      
      document.head.appendChild(script);
    }
  }, [showMap, userLocation]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50/50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // If no user, redirect to signup (this should not show due to useEffect redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-pink-50/50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-2 sm:p-4 flex items-center justify-center sticky top-0 z-50 overflow-x-auto">
        <div className="flex items-center space-x-2 sm:space-x-6 min-w-max">
          <button onClick={() => setCurrentView('dashboard')}>
            <img src="/ClutchIcons/star.ico" className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
          </button>
          <button
            onClick={() => setShowMap(true)}
            className="px-1 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 hover:text-pink-600 transition duration-150 flex flex-col items-center"
          >
            <img src="/ClutchIcons/location.png" alt="Location" className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs hidden sm:inline">Map</span>
          </button>
          <button
            onClick={() => setCurrentView('community')}
            className="px-1 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 hover:text-pink-600 transition duration-150 flex flex-col items-center"
          >
            <img src="/ClutchIcons/chat.png" alt="Chat" className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs hidden sm:inline">Community</span>
          </button>
          <button
            onClick={() => setCurrentView('addRequest')}
            className="px-1 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 hover:text-pink-600 transition duration-150 flex flex-col items-center"
          >
            <img src="/ClutchIcons/add.png" alt="Add" className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs hidden sm:inline">Add</span>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className="px-1 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 hover:text-pink-600 transition duration-150 flex flex-col items-center"
          >
            <img src="/ClutchIcons/user.png" alt="User" className="h-8 w-8 sm:h-12 sm:w-12" />
            <span className="text-xs hidden sm:inline">You</span>
          </button>
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                router.push('/signup');
              } catch (error) {
                console.error('Error signing out:', error);
              }
            }}
            className="px-1 sm:px-3 py-1 text-gray-700 hover:text-pink-600 text-xs sm:text-sm rounded-lg transition duration-150 flex flex-col items-center"
          >
            <img src="/ClutchIcons/logout.png" alt="Logout" className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-xs hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Clutch!</h1>
          <p className="text-gray-600">You are successfully logged in as {user.email}</p>
          
          {/* Map Modal */}
          {showMap && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Map View</h2>
                  <button
                    onClick={() => setShowMap(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div id="map" className="w-full h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClutchAuthPage;