'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, MapPin, Bell, User, ArrowRight, Gift } from 'lucide-react';
import { PixelHeart, Sparkle } from '@/components/ui/Decorative';
import SnowDots from '@/components/ui/SnowDots';

export default function HomeScreen({
  t,
  navigate,
  SCREENS,
  selectedCampus,
  user,
}) {
  const displayName = user?.displayName?.split(' ')[0] || 'babe';

  return (
    <div className="w-full h-screen flex flex-col relative overflow-hidden" style={{ background: '#FFF0F3' }}>
      {/* Snow dots background layer */}
      <SnowDots />

      {/* Header — z-10 */}
      <div className="px-6 pt-7 pb-1 flex items-center justify-between relative" style={{ zIndex: 10 }}>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <PixelHeart size={8} color="#FF0090" />
            <p className="label-caps text-dusty-rose">{selectedCampus}</p>
          </div>
          <h2 className="font-display text-3xl text-near-black">
            hey, {displayName}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(SCREENS.NOTIFICATIONS)}
            className="relative p-2.5 rounded-full bg-white/80 border border-soft-pink hover:border-hot-pink transition shadow-sm backdrop-blur-sm"
          >
            <Bell size={18} strokeWidth={1} className="text-dusty-rose" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-hot-pink" />
          </button>
          <button
            onClick={() => navigate(SCREENS.PROFILE)}
            className="p-2.5 rounded-full bg-white/80 border border-soft-pink hover:border-hot-pink transition shadow-sm backdrop-blur-sm"
          >
            <User size={18} strokeWidth={1} className="text-dusty-rose" />
          </button>
        </div>
      </div>

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto pb-28 relative" style={{ zIndex: 1 }}>

        {/* Tagline */}
        <div className="text-center pt-4 pb-2 relative" style={{ zIndex: 1 }}>
          <p className="font-display text-lg text-near-black">you&apos;re a star</p>
          <p className="text-dusty-rose text-xs mt-0.5">give, request, repeat.</p>
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
                background: 'white',
                borderRadius: 4,
                padding: '10px 10px 40px 10px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              {/* Photo area */}
              <div
                className="flex items-center justify-center"
                style={{
                  background: '#FFF5E4',
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
                <p className="font-display italic text-near-black" style={{ fontSize: 16 }}>give.</p>
                <p className="text-dusty-rose mt-0.5" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>share your supplies</p>
                <div className="mt-2.5 mx-auto w-fit">
                  <span
                    className="inline-flex items-center gap-1.5 font-display italic transition-colors hover:bg-[#FFF0F5] hover:border-[#FFB6C1] hover:text-[#E8849B]"
                    style={{
                      background: 'transparent',
                      border: '1.5px solid #F9C6D0',
                      color: '#C27088',
                      borderRadius: 999,
                      padding: '5px 18px',
                      fontSize: 13,
                    }}
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
                background: 'white',
                borderRadius: 4,
                padding: '10px 10px 40px 10px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              {/* Photo area with star */}
              <div
                className="flex items-center justify-center relative"
                style={{
                  background: '#FFE4EE',
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
                <p className="font-display italic text-near-black" style={{ fontSize: 18 }}>request.</p>
                <p className="text-dusty-rose mt-0.5" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>get what you need</p>
                <div className="mt-2.5 mx-auto w-fit">
                  <span
                    className="inline-flex items-center gap-1.5 font-display italic transition-colors hover:bg-[#FFF0F5] hover:border-[#FFB6C1] hover:text-[#E8849B] cursor-pointer"
                    style={{
                      background: 'transparent',
                      border: '1.5px solid #F9C6D0',
                      color: '#C27088',
                      borderRadius: 999,
                      padding: '5px 18px',
                      fontSize: 13,
                    }}
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
          <div className="bg-white/70 backdrop-blur-sm border border-soft-pink/40 rounded-2xl p-4 flex items-center justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Image src="/star-3d.png" alt="" width={20} height={20} />
                <span className="font-display text-lg text-near-black">0</span>
              </div>
              <p className="text-dusty-rose" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>points</p>
            </div>
            <div className="w-px h-8 bg-soft-pink/40" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <PixelHeart size={14} color="#FF0090" />
                <span className="font-display text-lg text-near-black">0</span>
              </div>
              <p className="text-dusty-rose" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>helped</p>
            </div>
            <div className="w-px h-8 bg-soft-pink/40" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkle size={14} className="text-hot-pink" />
                <span className="font-display text-lg text-near-black">0</span>
              </div>
              <p className="text-dusty-rose" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>given</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-3 bg-gradient-to-t from-[#FFF0F3] via-[#FFF0F3] to-transparent" style={{ zIndex: 20 }}>
        <div className="bg-white/90 backdrop-blur-md border border-soft-pink rounded-2xl px-8 py-3 flex items-center justify-around shadow-md">
          <button
            onClick={() => navigate(SCREENS.HOME)}
            className="flex flex-col items-center gap-0.5 py-1"
          >
            <Home size={20} strokeWidth={1} className="text-hot-pink" />
            <span className="text-[0.6rem] font-medium text-hot-pink">Home</span>
            <PixelHeart size={6} color="#FF0090" />
          </button>
          <Link
            href="/map"
            className="flex flex-col items-center gap-0.5 py-1"
          >
            <MapPin size={20} strokeWidth={1} className="text-dusty-rose/60" />
            <span className="text-[0.6rem] font-medium text-dusty-rose/60">Map</span>
            <div className="h-[6px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
