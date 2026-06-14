import { useState, useEffect } from 'react';

export default function useNominatim(zipCode) {
  const [location, setLocation] = useState({ city: '', state: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only search if zip code is at least 5 digits
    if (!zipCode || zipCode.length < 5) {
      setLocation({ city: '', state: '' });
      return;
    }

    const fetchLocation = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&countrycodes=us&format=json&addressdetails=1`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          const address = data[0].address;
          setLocation({
            city: address.city || address.town || address.village || address.municipality || '',
            state: address.state || ''
          });
        } else {
          setLocation({ city: '', state: '' });
        }
      } catch (err) {
        setError('Failed to fetch location data');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the fetch to avoid too many requests while typing
    const timeoutId = setTimeout(fetchLocation, 600);
    return () => clearTimeout(timeoutId);
  }, [zipCode]);

  return { location, isLoading, error };
}
