'use client';

import React from 'react';

// ── Pixel heart (Y2K style) ──
export function PixelHeart({ size = 14, className = '', color = '#FF0090', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className} {...props}>
      <rect x="2" y="0" width="4" height="2" />
      <rect x="10" y="0" width="4" height="2" />
      <rect x="0" y="2" width="8" height="2" />
      <rect x="8" y="2" width="8" height="2" />
      <rect x="0" y="4" width="16" height="2" />
      <rect x="0" y="6" width="16" height="2" />
      <rect x="2" y="8" width="12" height="2" />
      <rect x="4" y="10" width="8" height="2" />
      <rect x="6" y="12" width="4" height="2" />
    </svg>
  );
}

// ── Pixel bow (Y2K cute) ──
export function PixelBow({ size = 18, className = '', color = '#FF0090', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 14" fill={color} className={className} {...props}>
      <rect x="0" y="2" width="2" height="2" />
      <rect x="2" y="0" width="2" height="2" />
      <rect x="2" y="4" width="2" height="2" />
      <rect x="4" y="2" width="2" height="4" />
      <rect x="6" y="4" width="2" height="4" />
      <rect x="8" y="4" width="4" height="6" />
      <rect x="12" y="4" width="2" height="4" />
      <rect x="14" y="2" width="2" height="4" />
      <rect x="16" y="0" width="2" height="2" />
      <rect x="16" y="4" width="2" height="2" />
      <rect x="18" y="2" width="2" height="2" />
      <rect x="8" y="10" width="4" height="2" />
    </svg>
  );
}

// ── 4-point star SVG ──
export function FourPointStar({ size = 12, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} {...props}>
      <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
    </svg>
  );
}

// ── Sparkle star (filled, decorative) ──
export function Sparkle({ size = 16, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

// ── 5-point star patch with double outline ──
export function StarPatch({ size = 24, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.8 3-1.1-6.5L.4 8.9l6.5-.9L12 2z" stroke="currentColor" strokeWidth={1} />
      <path d="M12 4.5l2.2 4.4 4.9.7-3.5 3.5.8 4.9L12 15.5l-4.4 2.5.8-4.9-3.5-3.5 4.9-.7L12 4.5z" stroke="currentColor" strokeWidth={0.8} fill="none" />
    </svg>
  );
}

// ── Diamond ──
export function Diamond({ size = 8, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} {...props}>
      <path d="M6 1L11 6L6 11L1 6L6 1Z" />
    </svg>
  );
}

// ── Heart outline ──
export function HeartOutline({ size = 12, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// ── Asterisk ──
export function Asterisk({ size = 10, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} {...props}>
      <line x1="8" y1="1" x2="8" y2="15" />
      <line x1="1" y1="8" x2="15" y2="8" />
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  );
}

// ── Cute gift box icon (for Give) ──
export function GiftBoxIcon({ size = 40, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} {...props}>
      {/* Ribbon */}
      <rect x="21" y="6" width="6" height="38" fill="#FADADD" rx="1" />
      {/* Box body */}
      <rect x="8" y="20" width="32" height="22" rx="3" stroke="#FF0090" strokeWidth={1.8} fill="white" />
      {/* Box lid */}
      <rect x="6" y="14" width="36" height="8" rx="3" stroke="#FF0090" strokeWidth={1.8} fill="white" />
      {/* Bow left */}
      <ellipse cx="18" cy="12" rx="6" ry="5" stroke="#FF0090" strokeWidth={1.5} fill="#FFF5F9" />
      {/* Bow right */}
      <ellipse cx="30" cy="12" rx="6" ry="5" stroke="#FF0090" strokeWidth={1.5} fill="#FFF5F9" />
      {/* Bow center */}
      <circle cx="24" cy="13" r="3" fill="#FF0090" />
      {/* Vertical ribbon line */}
      <line x1="24" y1="22" x2="24" y2="42" stroke="#F9C6D0" strokeWidth={1.5} />
      {/* Horizontal ribbon */}
      <line x1="8" y1="31" x2="40" y2="31" stroke="#F9C6D0" strokeWidth={1.5} />
    </svg>
  );
}

// ── Cute hand/reach icon (for Request) ──
export function RequestHandIcon({ size = 40, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} {...props}>
      {/* Envelope body */}
      <rect x="6" y="14" width="36" height="26" rx="3" stroke="#FF0090" strokeWidth={1.8} fill="white" />
      {/* Envelope flap */}
      <path d="M6 14L24 28L42 14" stroke="#FF0090" strokeWidth={1.8} fill="#FFF5F9" />
      {/* Heart coming out */}
      <path d="M28 10C28 7.5 26.5 5 24 5C21.5 5 20 7.5 20 10C20 14 24 17 24 17C24 17 28 14 28 10Z" fill="#FF0090" opacity="0.7" />
      {/* Small sparkle */}
      <circle cx="34" cy="8" r="1.5" fill="#F9C6D0" />
      <circle cx="14" cy="10" r="1" fill="#F9C6D0" />
    </svg>
  );
}

// ── Washi tape strip ──
export function WashiTape({ className = '', rotate = '-1.5deg', variant = 'pink', ...props }) {
  const tapeClass = variant === 'rose' ? 'washi-tape-rose' : 'washi-tape';
  return (
    <div
      className={`${tapeClass} h-6 w-full rounded-sm opacity-80 ${className}`}
      style={{ transform: `rotate(${rotate})` }}
      {...props}
    />
  );
}

// ── Binder clip at top of cards ──
export function BinderClip({ className = '', side = 'left', ...props }) {
  const position = side === 'left' ? 'left-4' : 'right-4';
  return (
    <div className={`absolute -top-3 ${position} ${className}`} {...props}>
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <rect x="4" y="0" width="12" height="10" rx="2" fill="#9E4A5D" />
        <rect x="6" y="2" width="8" height="6" rx="1" fill="#C27088" />
        <rect x="2" y="8" width="16" height="4" rx="1" fill="#6B1A2A" />
        <path d="M5 12L5 20" stroke="#6B1A2A" strokeWidth="1.5" />
        <path d="M15 12L15 20" stroke="#6B1A2A" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ── Retro window frame (Y2K game window style) ──
export function RetroWindow({ title = '', children, className = '' }) {
  return (
    <div className={`retro-window ${className}`}>
      <div className="retro-window-header">
        <div className="retro-window-dot" />
        <div className="retro-window-dot" style={{ opacity: 0.4 }} />
        <div className="retro-window-dot" style={{ opacity: 0.25 }} />
        {title && (
          <span className="ml-auto text-[0.6rem] font-medium text-dusty-rose tracking-wider uppercase">
            {title}
          </span>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// ── Wavy section divider ──
export function WavyDivider({ className = '' }) {
  return <div className={`wavy-divider my-4 ${className}`} />;
}

// ── Ticket stub for transaction complete ──
export function TicketStub({ points = 10, children }) {
  return (
    <div className="relative max-w-xs w-full mx-auto">
      <div className="perforated-left rounded-r-xl overflow-hidden shadow-lg">
        <div className="bg-maroon px-6 py-3 text-center flex items-center justify-center gap-2">
          <PixelHeart size={10} color="#F9C6D0" />
          <p className="label-caps text-cream tracking-[0.3em] text-xs">CLUTCH</p>
          <PixelHeart size={10} color="#F9C6D0" />
        </div>
        <div className="bg-cream px-6 py-8 text-center bg-dots-pink">
          <p className="font-display text-5xl text-maroon mb-1">+{points}</p>
          <p className="label-caps text-taupe text-[0.65rem]">points</p>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Postcard ──
export function Postcard({ children, className = '' }) {
  return (
    <div className={`bg-cream border-2 border-soft-pink rounded-lg overflow-hidden shadow-md ${className}`}>
      <div className="bg-dots-pink p-1">
        <div className="border border-soft-pink/50 rounded p-4 bg-white/80">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Notecard ──
export function Notecard({ children, className = '' }) {
  return (
    <div className={`relative bg-white border border-soft-pink rounded-lg shadow-md ${className}`}>
      <BinderClip side="right" />
      <div className="p-5 pt-6">{children}</div>
    </div>
  );
}

// ── Product illustrations ──
export function PadIllustration({ className = '' }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="24" cy="24" rx="14" ry="20" stroke="#FF0090" strokeWidth={1.2} />
      <ellipse cx="24" cy="24" rx="8" ry="14" stroke="#F9C6D0" strokeWidth={1} strokeDasharray="3 2" />
      <path d="M10 20C7 20 5 22 5 24s2 4 5 4" stroke="#FF0090" strokeWidth={1.2} />
      <path d="M38 20C41 20 43 22 43 24s-2 4-5 4" stroke="#FF0090" strokeWidth={1.2} />
      <circle cx="24" cy="20" r="1.5" fill="#F9C6D0" />
    </svg>
  );
}

export function TamponIllustration({ className = '' }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="18" y="6" width="12" height="28" rx="6" stroke="#FF0090" strokeWidth={1.2} />
      <line x1="24" y1="34" x2="24" y2="44" stroke="#F9C6D0" strokeWidth={1} strokeDasharray="2 2" />
      <line x1="21" y1="12" x2="27" y2="12" stroke="#F9C6D0" strokeWidth={1} />
      <line x1="21" y1="16" x2="27" y2="16" stroke="#F9C6D0" strokeWidth={1} />
      <circle cx="24" cy="22" r="1.5" fill="#F9C6D0" />
    </svg>
  );
}

export function LinerIllustration({ className = '' }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="24" cy="24" rx="10" ry="18" stroke="#FF0090" strokeWidth={1.2} />
      <path d="M14 24c-2 0-3 1-3 2.5S13 29 14 29" stroke="#FF0090" strokeWidth={1.2} />
      <path d="M34 24c2 0 3 1 3 2.5S35 29 34 29" stroke="#FF0090" strokeWidth={1.2} />
      <ellipse cx="24" cy="24" rx="5" ry="10" stroke="#F9C6D0" strokeWidth={0.8} strokeDasharray="2 2" />
    </svg>
  );
}

// ── Envelope marker for map ──
export function EnvelopeMarker({ className = '' }) {
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="#FAF7F2" stroke="#FF0090" strokeWidth={1.5} className={className}>
      <rect x="1" y="1" width="22" height="18" rx="2" />
      <path d="M1 1L12 11L23 1" />
    </svg>
  );
}

// ── Decorative corner flourish ──
export function CornerFlourish({ className = '', position = 'top-left' }) {
  const posClass = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 -scale-x-100',
    'bottom-left': 'bottom-0 left-0 -scale-y-100',
    'bottom-right': 'bottom-0 right-0 -scale-x-100 -scale-y-100',
  }[position];

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`absolute ${posClass} ${className}`}>
      <path d="M0 0 Q16 2 16 16 Q2 16 0 0Z" stroke="#F9C6D0" strokeWidth={1} fill="none" />
      <circle cx="8" cy="8" r="1.5" fill="#F9C6D0" />
    </svg>
  );
}
