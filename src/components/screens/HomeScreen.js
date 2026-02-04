'use client';


import React from 'react';
import Link from 'next/link';
import { Home, Users, MapPin, Gift, Plus, Bell, User } from 'lucide-react';
// Add at the top of HomeScreen.js
import { Sun, Moon } from 'lucide-react';

export default function HomeScreen({ 
  t, 
  navigate, 
  SCREENS, 
  selectedCampus, 
  darkMode,
  setDarkMode 
}) {
  const ThemeToggle = () => (
    <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  return (
    <div className={`w-full h-screen ${t.bg} flex flex-col`}> 
      <div className="bg-gradient-to-r from-black to-pink-900 text-white p-6 rounded-b-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(SCREENS.PROFILE)} className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-90 transition">M</button>
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome, User</h2>
            <p className="text-pink-200 text-sm">{selectedCampus}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(SCREENS.NOTIFICATIONS)} className="relative p-2 rounded-full hover:bg-white/10 transition">
            <Bell size={22} />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button onClick={() => navigate(SCREENS.PROFILE)} className="p-2 rounded-full hover:bg-white/10 transition" title="Profile">
            <User size={22} />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex-1 p-6 space-y-4">
        <div className="flex gap-4 items-stretch">
          <button 
            onClick={() => navigate(SCREENS.GIVE)} 
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl"
          >
            <Gift size={24} /> Give
          </button>
          <button 
            type='button'
            onClick={() => navigate(SCREENS.REQUEST)} 
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl"
          >
            <Plus size={24} /> Request
          </button>
        </div>
        <div className={`${t.card} p-4 rounded-2xl shadow`}> 
          <p className={`${t.textTertiary} text-sm font-semibold mb-3`}>Recent Activity</p>
          <div className="space-y-2">
            <div className={`${t.bgSecondary} p-3 rounded-lg`}><p className={`font-semibold text-sm ${t.text}`}>Requested: Period Products</p><p className={`text-xs ${t.textTertiary}`}>Request sent...</p></div>
            <div className={`${t.bgSecondary} p-3 rounded-lg`}><p className={`font-semibold text-sm ${t.text}`}>Donated: All items</p><p className={`text-xs ${t.textTertiary}`}>To Women&apos;s Center</p></div>
          </div>
        </div>
      </div>
      <div className={`${t.card} border-t ${t.divider} p-4 flex gap-3`}> 
        <button onClick={() => navigate(SCREENS.HOME)} className="flex-1 py-3 bg-black text-white rounded-full font-semibold flex flex-col items-center justify-center gap-1 hover:bg-gray-900 transition text-xs"><Home size={20} /> Home</button>
        <button onClick={() => navigate(SCREENS.COMMUNITY)} className={`flex-1 py-3 ${t.bgSecondary} ${t.textSecondary} rounded-full font-semibold flex flex-col items-center justify-center gap-1 hover:opacity-80 transition text-xs`}>
          <Users className="w-5 h-5"/> Community
        </button>
        <Link 
          href="/map" 
          className={`flex-1 py-3 ${t.bgSecondary} ${t.textSecondary} rounded-full font-semibold flex flex-col items-center justify-center gap-1 hover:opacity-80 transition text-xs`}
        >
          <MapPin size={20} /> 
          <span>Map</span>
        </Link>
      </div>
    </div>
  );
}