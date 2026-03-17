'use client';

import React from 'react';

const dots = [
  { size: 8, color: '#FFD6E7', opacity: 0.45, top: 5, left: 10, dur: 22, delay: 0 },
  { size: 3, color: '#FFFFFF', opacity: 0.7, top: 12, left: 25, dur: 26, delay: 2 },
  { size: 7, color: '#FFD6E7', opacity: 0.45, top: 80, left: 5, dur: 20, delay: 4 },
  { size: 2, color: '#FFFFFF', opacity: 0.7, top: 45, left: 60, dur: 28, delay: 1 },
  { size: 9, color: '#FFD6E7', opacity: 0.45, top: 70, left: 30, dur: 24, delay: 6 },
  { size: 3, color: '#FFFFFF', opacity: 0.7, top: 20, left: 80, dur: 19, delay: 3 },
  { size: 8, color: '#FFD6E7', opacity: 0.45, top: 90, left: 50, dur: 25, delay: 8 },
  { size: 4, color: '#FFFFFF', opacity: 0.7, top: 35, left: 15, dur: 21, delay: 5 },
  { size: 7, color: '#FFD6E7', opacity: 0.45, top: 60, left: 75, dur: 27, delay: 10 },
  { size: 2, color: '#FFFFFF', opacity: 0.7, top: 15, left: 45, dur: 23, delay: 7 },
  { size: 9, color: '#FFD6E7', opacity: 0.45, top: 85, left: 20, dur: 18, delay: 12 },
  { size: 3, color: '#FFFFFF', opacity: 0.7, top: 50, left: 90, dur: 30, delay: 2 },
  { size: 8, color: '#FFD6E7', opacity: 0.45, top: 25, left: 55, dur: 22, delay: 14 },
  { size: 4, color: '#FFFFFF', opacity: 0.7, top: 75, left: 40, dur: 26, delay: 9 },
  { size: 7, color: '#FFD6E7', opacity: 0.45, top: 40, left: 85, dur: 20, delay: 11 },
  { size: 2, color: '#FFFFFF', opacity: 0.7, top: 65, left: 12, dur: 29, delay: 4 },
  { size: 9, color: '#FFD6E7', opacity: 0.45, top: 10, left: 70, dur: 24, delay: 13 },
  { size: 3, color: '#FFFFFF', opacity: 0.7, top: 55, left: 35, dur: 19, delay: 6 },
  { size: 8, color: '#FFD6E7', opacity: 0.45, top: 95, left: 65, dur: 27, delay: 15 },
  { size: 4, color: '#FFFFFF', opacity: 0.7, top: 30, left: 95, dur: 21, delay: 1 },
  { size: 7, color: '#FFD6E7', opacity: 0.45, top: 78, left: 55, dur: 23, delay: 8 },
  { size: 2, color: '#FFFFFF', opacity: 0.7, top: 8, left: 38, dur: 25, delay: 3 },
  { size: 9, color: '#FFD6E7', opacity: 0.45, top: 48, left: 8, dur: 18, delay: 10 },
  { size: 3, color: '#FFFFFF', opacity: 0.7, top: 88, left: 78, dur: 30, delay: 5 },
  { size: 8, color: '#FFD6E7', opacity: 0.45, top: 22, left: 42, dur: 22, delay: 12 },
  { size: 4, color: '#FFFFFF', opacity: 0.7, top: 62, left: 22, dur: 26, delay: 7 },
  { size: 7, color: '#FFD6E7', opacity: 0.45, top: 38, left: 68, dur: 20, delay: 14 },
  { size: 2, color: '#FFFFFF', opacity: 0.7, top: 72, left: 48, dur: 28, delay: 9 },
];

export default function SnowDots() {
  return (
    <>
      <style>{`
        @keyframes snow-drift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(80px, -120px);
          }
        }
      `}</style>
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ pointerEvents: 'none', zIndex: 0 }}
      >
        {dots.map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              backgroundColor: dot.color,
              opacity: dot.opacity,
              animation: `snow-drift ${dot.dur}s linear ${dot.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </>
  );
}
