import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [geolocation, setGeolocation] = useState({ lat: null, lon: null });

  const getGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("Error al obtener la geolocalización:", error)
      );
    }
  };

  useEffect(() => {
    getGeo(); 
  }, []);

  return { geolocation, getGeo };
}
