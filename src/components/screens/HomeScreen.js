'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, MapPin, Bell, User, ArrowRight, Gift, Moon, Sun } from 'lucide-react';
import { PixelHeart, Sparkle } from '@/components/ui/Decorative';
import SnowDots from '@/components/ui/SnowDots';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen({
  t,
  navigate,
  SCREENS,
  selectedCampus,
  user,
}) {
  const displayName = user?.displayName?.split(' ')[0] || 'babe';
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`w-full h-screen flex flex-col relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#1A1A2E]' : 'bg-[#FFF0F3]'}`}>
      {/* Snow dots background layer */}
      {!darkMode && <SnowDots />}

      {/* Header — z-10 */}
      <div className="px-6 pt-7 pb-1 flex items-center justify-between relative" style={{ zIndex: 10 }}>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <PixelHeart size={8} color={darkMode ? '#FF69B4' : '#FF0090'} />
            <p className={`label-caps ${darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'}`}>{selectedCampus}</p>
          </div>
          <h2 className={`font-display text-3xl ${darkMode ? 'text-white' : 'text-near-black'}`}>
            hey, {displayName}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-full border transition shadow-sm backdrop-blur-sm ${darkMode ? 'bg-[#2A2A4A]/80 border-[#FF69B4]/40 hover:border-[#FF69B4]' : 'bg-white/80 border-soft-pink hover:border-hot-pink'}`}
          >
            {darkMode
              ? <Sun size={18} strokeWidth={1} className="text-[#FFD700]" />
              : <Moon size={18} strokeWidth={1} className="text-dusty-rose" />
            }
          </button>
          <button
            onClick={() => navigate(SCREENS.NOTIFICATIONS)}
            className={`relative p-2.5 rounded-full border transition shadow-sm backdrop-blur-sm ${darkMode ? 'bg-[#2A2A4A]/80 border-[#FF69B4]/40 hover:border-[#FF69B4]' : 'bg-white/80 border-soft-pink hover:border-hot-pink'}`}
          >
            <Bell size={18} strokeWidth={1} className={darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'} />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-hot-pink" />
          </button>
          <button
            onClick={() => navigate(SCREENS.PROFILE)}
            className={`p-2.5 rounded-full border transition shadow-sm backdrop-blur-sm ${darkMode ? 'bg-[#2A2A4A]/80 border-[#FF69B4]/40 hover:border-[#FF69B4]' : 'bg-white/80 border-soft-pink hover:border-hot-pink'}`}
          >
            <User size={18} strokeWidth={1} className={darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'} />
          </button>
        </div>
      </div>

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto pb-28 relative" style={{ zIndex: 1 }}>

        {/* Centered header — logo placeholder + tagline */}
        <div className="text-center pt-4 pb-2 relative" style={{ zIndex: 1 }}>
          {/* Logo placeholder — replace the div below with your logo Image */}
          <div className="mx-auto mb-2 w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: darkMode ? '#FF69B4' : '#F9C6D0' }}
          >
            <span className={`text-xs ${darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'}`}>logo</span>
          </div>
          <h1 className={`font-display text-2xl ${darkMode ? 'text-white' : 'text-near-black'}`}>you&apos;re a star</h1>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'}`}>give, request, repeat.</p>
        </div>

        {/* ── Pinboard section ── */}
        <div className="relative mx-6" style={{ minHeight: 380, zIndex: 1 }}>

          {/* ── GIVE CARD (left) ── */}
          <button
            onClick={() => navigate(SCREENS.GIVE)}
            className="absolute group"
            style={{
              left: 0,
              transform: 'rotate(-3deg)',
              top: 20,
              zIndex: 1,
              transition: 'all 0.2s ease',
              width: '48%',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(-3deg) scale(1.03)'; e.currentTarget.style.zIndex = 3; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-3deg)'; e.currentTarget.style.zIndex = 1; }}
          >
            {/* Washi tape */}
            <div
              className="absolute"
              style={{
                top: -10,
                left: '50%',
                transform: 'translateX(-50%) rotate(2deg)',
                width: 70,
                height: 20,
                background: 'repeating-linear-gradient(45deg, #E8D5C0 0px, #E8D5C0 4px, #D4C4A8 4px, #D4C4A8 8px)',
                opacity: 0.85,
                borderRadius: 2,
                zIndex: 5,
              }}
            />
            {/* Polaroid */}
            <div
              style={{
                background: darkMode ? '#2A2A4A' : 'white',
                borderRadius: 4,
                padding: '10px 10px 40px 10px',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.20)'
                  : '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              {/* Photo area */}
              <div
                className="flex items-center justify-center"
                style={{
                  background: darkMode ? '#1A1A2E' : '#FFF5E4',
                  borderRadius: 2,
                  height: 180,
                }}
              >
                <Image
                  src="/gift-3d.png"
                  alt="Give"
                  width={100}
                  height={100}
                  className="drop-shadow-lg float"
                />
              </div>
              {/* Caption */}
              <div className="pt-3 text-center">
                <p className={`font-display italic ${darkMode ? 'text-white' : 'text-near-black'}`} style={{ fontSize: 16 }}>give.</p>
                <p className={darkMode ? 'text-[#E8849B] mt-0.5' : 'text-dusty-rose mt-0.5'} style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>share your supplies</p>
                <div className="mt-2.5 mx-auto w-fit">
                  <span
                    className="inline-flex items-center gap-1.5 font-display italic transition-all duration-200 bg-transparent border-[1.5px] border-[#F9C6D0] text-[#C27088] rounded-full py-[5px] px-[18px] text-[13px] group-hover:bg-[#FFF0F5] group-hover:border-[#FFB6C1] group-hover:text-[#E8849B]"
                  >
                    open <ArrowRight size={11} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* ── REQUEST CARD (right) ── */}
          <button
            onClick={() => navigate(SCREENS.REQUEST)}
            className="absolute group"
            style={{
              right: 0,
              transform: 'rotate(2deg)',
              top: 10,
              zIndex: 2,
              transition: 'all 0.2s ease',
              width: '48%',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(2deg) scale(1.03)'; e.currentTarget.style.zIndex = 3; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(2deg)'; e.currentTarget.style.zIndex = 2; }}
          >
            {/* Washi tape — pink striped */}
            <div
              className="absolute"
              style={{
                top: -10,
                left: '50%',
                transform: 'translateX(-50%) rotate(-1deg)',
                width: 80,
                height: 22,
                background: 'repeating-linear-gradient(45deg, #FFB6C1 0px, #FFB6C1 4px, #FF85A1 4px, #FF85A1 8px)',
                opacity: 0.85,
                borderRadius: 2,
                zIndex: 5,
              }}
            />
            {/* Polaroid */}
            <div
              style={{
                background: darkMode ? '#2A2A4A' : 'white',
                borderRadius: 4,
                padding: '10px 10px 40px 10px',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.20)'
                  : '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              {/* Photo area with star */}
              <div
                className="flex items-center justify-center relative"
                style={{
                  background: darkMode ? '#1A1A2E' : '#FFE4EE',
                  borderRadius: 2,
                  height: 180,
                }}
              >
                <Image
                  src="/star-3d.png"
                  alt="Clutch star"
                  width={120}
                  height={120}
                  className="drop-shadow-lg float"
                  priority
                />
              </div>
              {/* Caption */}
              <div className="pt-3 text-center">
                <p className={`font-display italic ${darkMode ? 'text-white' : 'text-near-black'}`} style={{ fontSize: 18 }}>request.</p>
                <p className={darkMode ? 'text-[#E8849B] mt-0.5' : 'text-dusty-rose mt-0.5'} style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>get what you need</p>
                <div className="mt-2.5 mx-auto w-fit">
                  <span
                    className="inline-flex items-center gap-1.5 font-display italic transition-all duration-200 bg-transparent border-[1.5px] border-[#F9C6D0] text-[#C27088] rounded-full py-[5px] px-[18px] text-[13px] cursor-pointer group-hover:bg-[#FFF0F5] group-hover:border-[#FFB6C1] group-hover:text-[#E8849B]"
                  >
                    open <ArrowRight size={11} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* ── Stats row ── */}
        <div className="mx-6 mt-2 relative" style={{ zIndex: 1 }}>
          <div className={`backdrop-blur-sm rounded-2xl p-4 flex items-center justify-around ${darkMode ? 'bg-[#2A2A4A]/70 border border-[#FF69B4]/20' : 'bg-white/70 border border-soft-pink/40'}`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Image src="/star-3d.png" alt="" width={20} height={20} />
                <span className={`font-display text-lg ${darkMode ? 'text-white' : 'text-near-black'}`}>0</span>
              </div>
              <p className={darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>points</p>
            </div>
            <div className={`w-px h-8 ${darkMode ? 'bg-[#FF69B4]/20' : 'bg-soft-pink/40'}`} />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <PixelHeart size={14} color={darkMode ? '#FF69B4' : '#FF0090'} />
                <span className={`font-display text-lg ${darkMode ? 'text-white' : 'text-near-black'}`}>0</span>
              </div>
              <p className={darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>helped</p>
            </div>
            <div className={`w-px h-8 ${darkMode ? 'bg-[#FF69B4]/20' : 'bg-soft-pink/40'}`} />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkle size={14} className={darkMode ? 'text-[#FF69B4]' : 'text-hot-pink'} />
                <span className={`font-display text-lg ${darkMode ? 'text-white' : 'text-near-black'}`}>0</span>
              </div>
              <p className={darkMode ? 'text-[#E8849B]' : 'text-dusty-rose'} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>given</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div className={`absolute bottom-0 left-0 right-0 px-6 pb-5 pt-3 bg-gradient-to-t ${darkMode ? 'from-[#1A1A2E] via-[#1A1A2E]' : 'from-[#FFF0F3] via-[#FFF0F3]'} to-transparent`} style={{ zIndex: 20 }}>
        <div className={`backdrop-blur-md rounded-2xl px-8 py-3 flex items-center justify-around shadow-md ${darkMode ? 'bg-[#2A2A4A]/90 border border-[#FF69B4]/30' : 'bg-white/90 border border-soft-pink'}`}>
          <button
            onClick={() => navigate(SCREENS.HOME)}
            className="flex flex-col items-center gap-0.5 py-1"
          >
            <Home size={20} strokeWidth={1} className={darkMode ? 'text-[#FF69B4]' : 'text-hot-pink'} />
            <span className={`text-[0.6rem] font-medium ${darkMode ? 'text-[#FF69B4]' : 'text-hot-pink'}`}>Home</span>
            <PixelHeart size={6} color={darkMode ? '#FF69B4' : '#FF0090'} />
          </button>
          <Link
            href="/map"
            className="flex flex-col items-center gap-0.5 py-1"
          >
            <MapPin size={20} strokeWidth={1} className={darkMode ? 'text-[#E8849B]/60' : 'text-dusty-rose/60'} />
            <span className={`text-[0.6rem] font-medium ${darkMode ? 'text-[#E8849B]/60' : 'text-dusty-rose/60'}`}>Map</span>
            <div className="h-[6px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
