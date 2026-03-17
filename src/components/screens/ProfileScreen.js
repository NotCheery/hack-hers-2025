'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Award, Settings as SettingsIcon } from 'lucide-react';
import { StarPatch, WavyDivider, Diamond } from '@/components/ui/Decorative';

export default function ProfileScreen({
  t,
  goBack,
  navigate,
  handleLogout,
  SCREENS,
  selectedCampus,
  setSelectedCampus,
  GSU_CAMPUSES,
  user,
  updateUserProfile
}) {
  const [userFirstName, setUserFirstName] = useState('Maya');
  const [userLastName, setUserLastName] = useState('Johnson');
  const [userMiddleName, setUserMiddleName] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [originalFirstName, setOriginalFirstName] = useState('Maya');
  const [originalLastName, setOriginalLastName] = useState('Johnson');
  const [originalMiddleName, setOriginalMiddleName] = useState('');

  React.useEffect(() => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(' ');
      const firstName = nameParts[0] || 'Maya';
      let middleName = '';
      let lastName = 'Johnson';

      if (nameParts.length > 2) {
        middleName = nameParts.slice(1, -1).join(' ');
        lastName = nameParts[nameParts.length - 1];
      } else if (nameParts.length === 2) {
        lastName = nameParts[1] || 'Johnson';
      }

      setUserFirstName(firstName);
      setUserLastName(lastName);
      setUserMiddleName(middleName);
      setOriginalFirstName(firstName);
      setOriginalLastName(lastName);
      setOriginalMiddleName(middleName);
    }
  }, [user?.displayName]);

  return (
    <div className="w-full h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-3">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-taupe/10 transition">
          <ArrowLeft size={22} strokeWidth={1} className="text-maroon" />
        </button>
        <h2 className="font-display text-2xl text-near-black">My Profile</h2>
      </div>

      <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-6">
        {/* Profile card */}
        <div className="bg-white border border-soft-pink/50 p-6 rounded-xl text-center">
          <div className="w-16 h-16 bg-hot-pink rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-display">
            {userFirstName.charAt(0)}
          </div>

          {!isEditingProfile ? (
            <>
              <p className="font-display text-lg text-near-black">
                {userFirstName} {userMiddleName && userMiddleName + ' '}{userLastName}
              </p>
              <p className="text-sm text-dusty-rose mb-4">{user?.email}</p>
              <button
                onClick={() => {
                  setOriginalFirstName(userFirstName);
                  setOriginalLastName(userLastName);
                  setOriginalMiddleName(userMiddleName);
                  setIsEditingProfile(true);
                }}
                className="bg-hot-pink hover:bg-hot-pink/90 text-white px-6 py-2 rounded-full text-sm font-medium transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="fixed inset-0 bg-near-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl border border-soft-pink/50 p-8 max-w-md w-full shadow-lg">
                <h3 className="font-display text-2xl text-near-black mb-6 text-center">Edit Your Profile</h3>

                {/* Name preview */}
                <div className="bg-cream p-4 rounded-lg mb-6 text-center">
                  <p className="text-xs text-dusty-rose mb-1 label-caps">your new name</p>
                  <p className="font-display text-lg text-near-black">
                    {userFirstName} {userMiddleName && userMiddleName + ' '}{userLastName}
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="label-caps text-dusty-rose mb-2 block">First Name</label>
                    <input
                      type="text"
                      value={userFirstName}
                      onChange={(e) => setUserFirstName(e.target.value)}
                      className="w-full bg-cream text-near-black px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-hot-pink transition"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-dusty-rose mb-2 block">Middle Name</label>
                    <input
                      type="text"
                      value={userMiddleName}
                      onChange={(e) => setUserMiddleName(e.target.value)}
                      className="w-full bg-cream text-near-black px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-hot-pink transition"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-dusty-rose mb-2 block">Last Name</label>
                    <input
                      type="text"
                      value={userLastName}
                      onChange={(e) => setUserLastName(e.target.value)}
                      className="w-full bg-cream text-near-black px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-hot-pink transition"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      if (updateUserProfile) {
                        await updateUserProfile(userFirstName, userMiddleName, userLastName);
                      }
                      setIsEditingProfile(false);
                    }}
                    className="flex-1 bg-hot-pink hover:bg-hot-pink/90 text-white px-4 py-3 rounded-full font-medium transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setUserFirstName(originalFirstName);
                      setUserLastName(originalLastName);
                      setUserMiddleName(originalMiddleName);
                      setIsEditingProfile(false);
                    }}
                    className="flex-1 bg-cream text-dusty-rose px-4 py-3 rounded-full font-medium hover:bg-taupe/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="relative mt-4">
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full appearance-none bg-cream text-near-black text-sm font-medium p-2 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-hot-pink"
            >
              {GSU_CAMPUSES.map(campus => (
                <option key={campus} value={campus}>{campus}</option>
              ))}
            </select>
            <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-dusty-rose pointer-events-none" />
          </div>

          <p className="flex items-center justify-center gap-1.5 text-hot-pink mt-4 text-sm">
            <StarPatch size={16} className="text-hot-pink" /> Verified
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white border border-soft-pink/50 p-4 rounded-xl">
          <p className="label-caps text-dusty-rose mb-3">Stats</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-cream p-3 rounded-lg">
              <p className="font-display text-2xl text-hot-pink">5</p>
              <p className="text-xs text-dusty-rose">Requests</p>
            </div>
            <div className="bg-cream p-3 rounded-lg">
              <p className="font-display text-2xl text-hot-pink">8</p>
              <p className="text-xs text-dusty-rose">Helped</p>
            </div>
            <div className="bg-cream p-3 rounded-lg">
              <p className="font-display text-2xl text-hot-pink">12</p>
              <p className="text-xs text-dusty-rose">Donated</p>
            </div>
          </div>
        </div>

        <WavyDivider />

        <button className="w-full bg-white border border-soft-pink/50 p-4 rounded-xl text-sm font-medium text-near-black hover:shadow-sm transition flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Award size={18} strokeWidth={1} className="text-hot-pink" /> My Coupons
          </span>
          <ChevronRight size={16} strokeWidth={1} className="text-dusty-rose" />
        </button>

        <button onClick={() => navigate(SCREENS.SETTINGS)} className="w-full bg-white border border-soft-pink/50 p-4 rounded-xl text-sm font-medium text-near-black hover:shadow-sm transition flex justify-between items-center">
          <span className="flex items-center gap-2">
            <SettingsIcon size={18} strokeWidth={1} className="text-hot-pink" /> Settings
          </span>
          <ChevronRight size={16} strokeWidth={1} className="text-dusty-rose" />
        </button>

        <button onClick={handleLogout} className="w-full border border-maroon text-maroon p-4 rounded-xl text-sm font-medium hover:bg-maroon/5 transition">
          Sign Out
        </button>
      </div>
    </div>
  );
}
