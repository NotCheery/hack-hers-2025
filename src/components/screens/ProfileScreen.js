'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Star, Award, Settings as SettingsIcon } from 'lucide-react';

export default function ProfileScreen({ 
  t, 
  goBack, 
  navigate, 
  handleLogout, 
  SCREENS, 
  selectedCampus, 
  setSelectedCampus, 
  GSU_CAMPUSES,
  user 
}) {
  const [userFirstName, setUserFirstName] = useState('Maya');
  const [userLastName, setUserLastName] = useState('Johnson');
  const [userMiddleName, setUserMiddleName] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <div className={`w-full h-screen bg-gradient-to-b ${t.bg} flex flex-col`}> 
      <div className="bg-gradient-to-r from-black to-pink-900 text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button onClick={goBack} className="hover:bg-pink-800 p-2 rounded-full transition"><ArrowLeft size={24} /></button>
          {/* <button onClick={() => navigate(SCREENS.HOME)} className="hover:bg-pink-800 p-2 rounded-full transition"><ArrowLeft size={24} /></button> */}
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        {/* <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 transition bg-red-600 hover:bg-red-700" title="Logout">
          <ArrowLeft size={22} />
        </button> */}
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className={`${t.card} p-6 rounded-2xl shadow text-center`}> 
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl">{userFirstName.charAt(0)}</div>
          
          {!isEditingProfile ? (
            <>
              <p className={`font-bold text-lg ${t.text}`}>{userFirstName} {userMiddleName && userMiddleName + ' '} {userLastName}</p>
              <p className={`text-sm ${t.textSecondary} mb-4`}>{user?.email}</p>
              <button onClick={() => setIsEditingProfile(true)} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition">Edit Profile</button>
            </>
          ) : (
            <div className="space-y-3 mt-4">
              <div>
                <label className={`block text-sm font-semibold ${t.text} mb-1`}>First Name</label>
                <input 
                  type="text" 
                  value={userFirstName} 
                  onChange={(e) => setUserFirstName(e.target.value)}
                  className={`w-full ${t.input} p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${t.text} mb-1`}>Middle Name (Optional)</label>
                <input 
                  type="text" 
                  value={userMiddleName} 
                  onChange={(e) => setUserMiddleName(e.target.value)}
                  placeholder="Leave blank if you don't have one"
                  className={`w-full ${t.input} p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${t.text} mb-1`}>Last Name</label>
                <input 
                  type="text" 
                  value={userLastName} 
                  onChange={(e) => setUserLastName(e.target.value)}
                  className={`w-full ${t.input} p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink-500`}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    setUserFirstName('Maya');
                    setUserLastName('Johnson');
                    setUserMiddleName('');
                    setIsEditingProfile(false);
                  }}
                  className={`flex-1 ${t.bgSecondary} ${t.textSecondary} px-4 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="relative mt-4">
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className={`w-full appearance-none ${t.input} ${t.textSecondary} text-sm font-semibold p-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-pink-500`}
            >
              {GSU_CAMPUSES.map(campus => (
                <option key={campus} value={campus}>{campus}</option>
              ))}
            </select>
            <ChevronRight size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.textTertiary} pointer-events-none`} />
          </div>
          <p className="flex items-center justify-center gap-1 text-yellow-500 mt-4"><Star size={16} className="fill-yellow-400" /> Verified</p>
        </div>
        <div className={`${t.card} p-4 rounded-2xl shadow`}> 
          <p className={`font-semibold ${t.text} mb-3`}>Stats</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className={`${t.bgSecondary} p-3 rounded-lg`}><p className="text-2xl font-bold text-pink-500">5</p><p className={`text-xs ${t.textTertiary}`}>Requests</p></div>
            <div className={`${t.bgSecondary} p-3 rounded-lg`}><p className="text-2xl font-bold text-pink-500">8</p><p className={`text-xs ${t.textTertiary}`}>Helped</p></div>
            <div className={`${t.bgSecondary} p-3 rounded-lg`}><p className="text-2xl font-bold text-pink-500">12</p><p className={`text-xs ${t.textTertiary}`}>Donated</p></div>
          </div>
        </div>
        <button className={`w-full ${t.card} p-4 rounded-2xl shadow font-semibold ${t.textSecondary} ${t.cardHover} transition flex justify-between items-center`}><span><Award size={20} className="inline mr-2" />My Coupons</span><ChevronRight size={20} /></button>
        <button onClick={() => navigate(SCREENS.SETTINGS)} className={`w-full ${t.card} p-4 rounded-2xl shadow font-semibold ${t.textSecondary} ${t.cardHover} transition flex justify-between items-center`}><span><SettingsIcon size={20} className="inline mr-2" />Settings</span><ChevronRight size={20} /></button>
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl shadow font-semibold transition">Sign Out</button>
      </div>
    </div>
  );
}