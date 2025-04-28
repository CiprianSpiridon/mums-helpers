import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapComponentProps {
  onSelectLocation: (address: string, lat?: number, lng?: number) => void;
  apiKey?: string;
  mapId?: string;
}

// Define types for Google Maps API
interface MapOptions {
  zoom: number;
  center: LatLngLiteral;
  mapTypeControl: boolean;
  fullscreenControl: boolean;
  streetViewControl: boolean;
  zoomControl: boolean;
  mapId?: string;
}

interface MarkerOptions {
  position: LatLng | LatLngLiteral;
  map: GoogleMap;
  draggable?: boolean;
}

interface GoogleMapWindow extends Window {
  google: {
    maps: {
      Map: new (element: HTMLElement, options: MapOptions) => GoogleMap;
      marker: {
        AdvancedMarkerElement: new (options: MarkerOptions) => AdvancedMarkerElement;
      };
      Marker: new (options: MarkerOptions) => GoogleMarker;
      Geocoder: new () => GoogleGeocoder;
    };
  };
  initMap: () => void;
}

interface GoogleMap {
  setCenter: (latLng: LatLng) => void;
  addListener: (event: string, callback: (e: { latLng: LatLng }) => void) => void;
}

interface AdvancedMarkerElement {
  position: LatLng | null;
  map: GoogleMap | null;
  setPosition: (latLng: LatLng | LatLngLiteral) => void;
  setMap: (map: GoogleMap | null) => void;
  addListener: (event: string, callback: () => void) => void;
}

interface GoogleMarker {
  setPosition: (latLng: LatLng | LatLngLiteral) => void;
  getPosition: () => LatLng;
  addListener: (event: string, callback: () => void) => void;
}

interface GoogleGeocoder {
  geocode: (
    request: { address?: string; location?: LatLng | LatLngLiteral },
    callback: (
      results: Array<{ formatted_address: string; geometry: { location: LatLng } }>,
      status: string
    ) => void
  ) => void;
}

interface LatLng {
  lat: () => number;
  lng: () => number;
}

interface LatLngLiteral {
  lat: number;
  lng: number;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
  onSelectLocation,
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  // These state variables are used within initMap and event handlers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mapInstance, setMapInstance] = useState<GoogleMap | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [marker, setMarker] = useState<AdvancedMarkerElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [geocoder, setGeocoder] = useState<GoogleGeocoder | null>(null);

  // Initialize map when script loads
  const initMap = () => {
    if (!mapRef.current) return;
    
    try {
      // Dubai coordinates
      const defaultLocation: LatLngLiteral = { lat: 25.276987, lng: 55.296249 };
      
      const googleWindow = window as unknown as GoogleMapWindow;
      
      // Create map instance with mapId
      const map = new googleWindow.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: defaultLocation,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        mapId: mapId // Include the Map ID for advanced markers
      });
      
      setMapInstance(map);
      
      // Create geocoder
      const geocoderInstance = new googleWindow.google.maps.Geocoder();
      setGeocoder(geocoderInstance);
      
      // Create marker - try advanced marker first, fallback to regular marker
      try {
        // Try to create advanced marker
        const advancedMarker = new googleWindow.google.maps.marker.AdvancedMarkerElement({
          position: defaultLocation,
          map: map,
          draggable: true,
        });
        
        setMarker(advancedMarker);
        
        // Add dragend listener to marker
        advancedMarker.addListener('dragend', () => {
          // Get the marker position - note the different access pattern for AdvancedMarkerElement
          const position = advancedMarker.position as unknown as LatLng;
          
          if (position) {
            // Get address from coordinates
            geocoderInstance.geocode({ location: position }, (results, status) => {
              if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                onSelectLocation(address, position.lat(), position.lng());
              }
            });
          }
        });
      } catch (error) {
        console.warn('Advanced markers not available, falling back to standard marker', error);
        
        // Fallback to standard marker
        const standardMarker = new googleWindow.google.maps.Marker({
          position: defaultLocation,
          map: map,
          draggable: true
        });
        
        // Add dragend listener to marker
        standardMarker.addListener('dragend', () => {
          const position = standardMarker.getPosition();
          
          // Get address from coordinates
          geocoderInstance.geocode({ location: position }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const address = results[0].formatted_address;
              onSelectLocation(address, position.lat(), position.lng());
            }
          });
        });
      }
      
      // Add click listener to map
      map.addListener('click', (e: { latLng: LatLng }) => {
        const clickedLocation = e.latLng;
        
        if (marker) {
          // Advanced marker
          marker.setPosition(clickedLocation);
        }
        
        // Get address from coordinates
        geocoderInstance.geocode({ location: clickedLocation }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;
            onSelectLocation(address, clickedLocation.lat(), clickedLocation.lng());
          }
        });
      });
      
      setMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoadError('Failed to initialize Google Maps');
      setMapLoaded(false);
    }
  };

  // Load Google Maps script
  useEffect(() => {
    // Validate API key and map ID
    if (!apiKey) {
      setLoadError('Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment.');
      return;
    }
    
    const googleWindow = window as unknown as GoogleMapWindow;
    
    if (googleWindow.google && googleWindow.google.maps) {
      initMap();
      return;
    }
    
    // Define callback for when script loads
    googleWindow.initMap = initMap;
    
    // Using the recommended loading pattern with loading=async
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&loading=async&v=weekly`;
      script.async = true; // This is still recommended alongside loading=async
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setLoadError('Failed to load Google Maps API. Please check your API key.');
      };
      
      document.head.appendChild(script);
      
      return script;
    };
    
    const script = loadGoogleMaps();
    
    return () => {
      // Clean up
      googleWindow.initMap = () => {};
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKey, mapId]);

  return (
    <div className="h-60 bg-gray-100 rounded-lg overflow-hidden relative">
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
      {!mapLoaded && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      )}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
          <p className="text-red-500 text-center mb-2">{loadError}</p>
          <p className="text-sm text-gray-600 text-center">
            Please make sure you have valid Google Maps API Key and Map ID set in your environment variables.
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent; 