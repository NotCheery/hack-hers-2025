'use client';

import { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';

export default function ClutchPigeonMap({ userLocation }) {
    const [locations, setLocations] = useState([]);
    const [center, setCenter] = useState(userLocation ? [userLocation.lat, userLocation.lng] : [33.7533, -84.3863]);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        fetch('/data/locations.json')
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(err => console.error("Failed to fetch locations:", err));
    }, []);

    // Update center when userLocation changes
    useEffect(() => {
        if (userLocation) {
            setCenter([userLocation.lat, userLocation.lng]);
        }
    }, [userLocation]);

    const handleMapClick = ({ latLng }) => {
        const newLocationName = prompt("Enter a name for this new location:");

        if (newLocationName && newLocationName.trim() !== '') {
            const newLocation = {
                id: `new-${Date.now()}`,
                name: newLocationName,
                position: [latLng[0], latLng[1]],
                items: ["User Submitted"],
                building: "Custom Location",
                unit: "N/A"
            };

            setLocations(currentLocations => [...currentLocations, newLocation]);
        }
    };

    // Custom marker component for user location
    const UserLocationMarker = ({ left, top }) => (
        <div
            style={{
                position: 'absolute',
                left: left - 16,
                top: top - 32,
                width: '32px',
                height: '32px'
            }}
        >
            <img
                src="/ClutchIcons/location.png"
                alt="Your Location"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );

    return (
        <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <p className="text-center text-white text-sm sm:text-lg font-semibold shadow-lg">
                    Click anywhere on the map to flag a new location!
                </p>
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
                onClick={handleMapClick}
            >
                {/* User's current location marker */}
                {userLocation && (
                    <Marker
                        width={32}
                        anchor={[userLocation.lat, userLocation.lng]}
                        payload={{ type: 'user' }}
                    >
                        <UserLocationMarker />
                    </Marker>
                )}

                {/* Flagged locations */}
                {locations.map(location => {
                    if (!location.position || location.position.length !== 2) return null;

                    return (
                        <Marker
                            key={location.id}
                            width={40}
                            anchor={location.position}
                            color={location.id.toString().startsWith('new-') ? '#22c55e' : '#ec4899'}
                            onClick={() => {
                                const building = location.building || 'Unknown Building';
                                const unit = location.unit || 'N/A';
                                const items = location.items?.join(', ') || 'No items listed';
                                alert(`Location: ${location.name}\nBuilding: ${building}\nUnit: ${unit}\nAvailable: ${items}`);
                            }}
                        />
                    );
                })}
            </Map>
        </div>
    );
}