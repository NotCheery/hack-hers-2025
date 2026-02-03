//hack-hers-2025\src\components\RealMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in Leaflet (they might not show without this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Real GSU Atlanta Campus locations (lat, lng) - based on actual campus spots
const gsuLocations = [
  { name: 'Student Center West', lat: 33.7535, lng: -84.3853, description: 'Main student hub with dining and services.' },
  { name: 'GSU Library (Pullen)', lat: 33.7531, lng: -84.3855, description: 'Central library for study and resources.' },
  { name: 'Student Health Center', lat: 33.7528, lng: -84.3848, description: 'Health services (proxy for Women\'s Center).' },
  { name: 'Urban Life Building', lat: 33.7540, lng: -84.3860, description: 'Community and event space.' },
  { name: 'Midtown Community Clinic', lat: 33.7800, lng: -84.3800, description: 'Nearby clinic (not on campus, but close).' },  // Approx. real location
  { name: 'Partner Store: Zara (Atlantic Station)', lat: 33.7925, lng: -84.3963, description: 'Shopping center with donation bins.' },  // Real location
];

export default function RealMap({ center = [33.7535, -84.3853], zoom = 16 }) {  // Default to Student Center West
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {gsuLocations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            <strong>{location.name}</strong><br />
            {location.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}