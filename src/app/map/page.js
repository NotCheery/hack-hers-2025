'use client'; // This is important because Pigeon Maps is an interactive component.

import PigeonMap from '@/app/components/PigeonMap.jsx';

export default function MapPage() {
  return (
    // The h-screen class is crucial. It gives the map container a height to fill.
    // Without it, the map would have a height of 0 and wouldn't be visible.
    <div className="w-screen h-screen">
      <PigeonMap />
    </div>
  );
}