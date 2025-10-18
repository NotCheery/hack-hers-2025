'use client';

import { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';

export default function PigeonMap() {
    const [locations, setLocations] = useState([]);
    // UPDATED: Centered on GSU and zoomed in a bit closer
    const [center, setCenter] = useState([33.7533, -84.3863]);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        fetch('/data/locations.json')
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(err => console.error("Failed to fetch locations:", err));
    }, []);

    // NEW FEATURE: Function to handle adding a new location
    const handleMapClick = ({ latLng }) => {
        const newLocationName = prompt("Enter a name for this new location:");

        // Only add the location if the user enters a name
        if (newLocationName && newLocationName.trim() !== '') {
            const newLocation = {
                id: `new-${Date.now()}`, // A temporary unique ID
                name: newLocationName,
                position: [latLng[0], latLng[1]], // The clicked coordinates
                items: ["User Submitted"],
            };

            // Add the new location to our existing list in the component's state
            setLocations(currentLocations => [...currentLocations, newLocation]);
        }
    };

    return (
        <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <p className="text-center text-white text-lg font-semibold shadow-lg">Click anywhere on the map to flag a new location!</p>
            </div>

            <Map
                height="100%"
                width="100%"
                center={center}
                zoom={zoom}
                onBoundsChanged={({ center, zoom }) => {
                    setCenter(center);
                    setZoom(zoom);
                }}
                // Add the onClick handler to the map
                onClick={handleMapClick}
            >
                {locations.map(location => {
                    if (!location.position || location.position.length !== 2) return null;

                    return (
                        <Marker
                            key={location.id}
                            width={40}
                            anchor={location.position}
                            color={location.id.toString().startsWith('new-') ? '#22c55e' : '#db2777'} // Green for new, pink for existing
                            onClick={() => alert(`Location: ${location.name}\nAvailable: ${location.items?.join(', ')}`)}
                        />
                    );
                })}
            </Map>
        </div>
    );
}