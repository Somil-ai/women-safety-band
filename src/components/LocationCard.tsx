import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  types: string[];
  rating?: number;
}

const LocationCard: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const lat = 28.6139;
  const lng = 77.209;

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restroom&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          setPlaces(data.results);
          setError(null);
        } else {
          setError(data.error_message || 'Failed to fetch places');
        }
      } catch {
        setError('Failed to fetch places');
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [apiKey, lat, lng]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-4">
      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
        <MapPin size={18} className="mr-2 text-red-500" /> Current Location
      </h3>
      <p className="text-gray-600 mb-3">Connaught Place, New Delhi, India</p>

      {loading && <p>Loading nearby restrooms...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <ul className="mb-4 max-h-40 overflow-y-auto">
          {places.map((place) => (
            <li key={place.place_id} className="mb-2">
              <p className="font-medium">{place.name}</p>
              <p className="text-sm text-gray-600">{place.vicinity}</p>
              {place.rating && <p className="text-sm text-yellow-500">Rating: {place.rating}</p>}
            </li>
          ))}
        </ul>
      )}

      <button className="w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
        <Navigation size={16} className="mr-2" />
        View Detailed Map
      </button>
    </div>
  );
};

export default LocationCard;
