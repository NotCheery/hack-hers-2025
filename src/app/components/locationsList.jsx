// this is a list of locations that you can search.
'use client';

import { useState, useEffect } from 'react';

export default function LocationList() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/locations.json')
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load locations:", err);
        setLoading(false);
      });
  }, []);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.items?.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-gray-500 mt-12">Loading locations...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Available Locations</h1>
      
      <input
        type="text"
        placeholder="Search by building or item (e.g., 'library', 'pads')"
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div key={location.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <h2 className="font-bold text-xl text-gray-800 mb-2">{location.name}</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Available:</span> {location.items && location.items.length > 0 ? location.items.join(', ') : 'Info not available'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No locations found matching your search.</p>
        )}
      </div>
    </div>
  );
}