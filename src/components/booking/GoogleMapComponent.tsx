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

// Re-enable the manual definition
interface AdvancedMarkerElement {
  position: LatLng | LatLngLiteral | null;
  map: GoogleMap | null;
  setPosition: (latLng: LatLng | LatLngLiteral | null) => void;
  setMap: (map: GoogleMap | null) => void;
  // Use a simpler listener definition matching existing code
  addListener: (event: string, callback: () => void) => void; // Simplified listener
  // Remove element and google.maps specific types for simplicity if causing issues
}

interface GoogleMapWindow extends Window {
  google: {
    maps: {
      Map: new (element: HTMLElement, options: MapOptions) => GoogleMap;
      marker: {
        // Reference the *local* AdvancedMarkerElement interface
        AdvancedMarkerElement: new (options: {
          position: LatLng | LatLngLiteral;
          map: GoogleMap;
          draggable?: boolean;
        }) => AdvancedMarkerElement;
      };
      Marker: new (options: MarkerOptions) => GoogleMarker;
      Geocoder: new () => GoogleGeocoder;
      // Remove event and MapsEventListener if not strictly needed by current code
    };
  };
  initMap: () => void;
  // Add property to track if Maps is already loaded or loading
  _mapsLoaded?: boolean;
  _mapsLoading?: boolean;
}

interface GoogleMap {
  setCenter: (latLng: LatLng) => void;
  getCenter: () => LatLng | null;
  // Ensure this listener signature matches usage
  addListener: (event: string, callback: (e: { latLng: LatLng }) => void) => void;
}

interface GoogleMarker {
  setPosition: (latLng: LatLng | LatLngLiteral) => void;
  getPosition: () => LatLng;
  addListener: (event: string, callback: () => void) => void;
  setMap: (map: GoogleMap | null) => void;
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
  const [mapInstance, setMapInstance] = useState<GoogleMap | null>(null); // Use local type
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [marker, setMarker] = useState<AdvancedMarkerElement | null>(null); // Use local type
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [geocoder, setGeocoder] = useState<GoogleGeocoder | null>(null); // Use local type

  // Load Google Maps script
  useEffect(() => {
    // Validate API key and map ID
    if (!apiKey) {
      setLoadError('Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment.');
      return;
    }
    
    const googleWindow = window as unknown as GoogleMapWindow;
    
    // Check if Maps is already loaded
    if (googleWindow.google?.maps) {
      console.log('Google Maps is already loaded, initializing map...');
      initMap();
      return;
    }
    
    // Check if Maps is currently loading
    if (googleWindow._mapsLoading) {
      console.log('Google Maps is already loading, waiting...');
      googleWindow.initMap = initMap;
      return;
    }

    // Define callback for when script loads
    googleWindow.initMap = initMap;
    googleWindow._mapsLoading = true;
    
    // Using the recommended loading pattern with loading=async
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&loading=async&v=weekly`;
      script.async = true;
      script.id = 'google-maps-script'; // Add ID to easily reference it
      
      // Check if the script already exists
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        console.log('Google Maps script tag already exists, reusing...');
        return existingScript as HTMLScriptElement;
      }
      
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setLoadError('Failed to load Google Maps API. Please check your API key.');
        googleWindow._mapsLoading = false;
      };
      
      document.head.appendChild(script);
      console.log('Google Maps script added to head');
      
      return script;
    };
    
    const script = loadGoogleMaps();
    
    return () => {
      // Clean up
      if (script && script.id === 'google-maps-script' && !googleWindow._mapsLoaded) {
        script.onerror = null;
        googleWindow.initMap = () => { 
          console.log('Prevented stale initMap callback'); 
        };
        googleWindow._mapsLoading = false;
      }
    };
  }, [apiKey, mapId]);

  // Initialize map when script loads
  const initMap = () => {
    if (!mapRef.current) {
      console.warn('Map reference is not available');
      return;
    }
    
    try {
      const googleWindow = window as unknown as GoogleMapWindow;
      
      // Set the global loaded flag to prevent duplicate initialization
      googleWindow._mapsLoaded = true;
      googleWindow._mapsLoading = false;
      
      // Dubai coordinates - updated to specified location
      const defaultLocation: LatLngLiteral = { lat: 25.1930452, lng: 55.3055855 };
      
      // Create map instance
      console.log('Creating map instance...');
      const mapOptions: MapOptions = {
        zoom: 12,
        center: defaultLocation,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        mapId: mapId
      };
      const map = new googleWindow.google.maps.Map(mapRef.current, mapOptions);
      setMapInstance(map);
      
      // Create geocoder
      const geocoderInstance = new googleWindow.google.maps.Geocoder();
      setGeocoder(geocoderInstance);
      
      // Function to get address from coordinates
      const updateAddressFromLocation = (location: LatLng | LatLngLiteral) => {
        // Ensure we have lat/lng values
        let lat: number;
        let lng: number;
        
        // Check if location is a LatLng object with callable methods
        if ('lat' in location && typeof location.lat === 'function' && 
            'lng' in location && typeof location.lng === 'function') {
          // It's a LatLng object
          lat = location.lat();
          lng = location.lng();
        } else if ('lat' in location && typeof location.lat === 'number' && 
                  'lng' in location && typeof location.lng === 'number') {
          // It's a LatLngLiteral object with number properties
          lat = location.lat;
          lng = location.lng;
        } else {
          console.error('Invalid location object:', location);
          return; // Exit if we can't extract coordinates
        }
        
        console.log('Getting address for location:', lat, lng);
        
        // Create LatLngLiteral for geocoder
        const locationLiteral: LatLngLiteral = { lat, lng };
        
        // Get address from coordinates
        geocoderInstance.geocode({ location: locationLiteral }, (results, status) => {
          console.log('Geocode Status:', status);
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;
            console.log('Geocoded Address:', address);
            onSelectLocation(address, lat, lng);
          } else {
            console.error('Geocode failed:', status);
          }
        });
      };
      
      // Get initial address from the default location
      updateAddressFromLocation(defaultLocation);
      
      // Add event listeners for when the map stops moving
      // This will get the address at the center of the map
      map.addListener('idle', () => {
        const center = map.getCenter();
        if (center) {
          updateAddressFromLocation(center);
        }
      });
      
      console.log('Map initialization complete');
      setMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoadError('Failed to initialize Google Maps');
      setMapLoaded(false);
    }
  };

  return (
    <div className="h-60 bg-gray-100 rounded-lg overflow-hidden relative">
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
      {/* Fixed center marker - always stays in the center of the map visually */}
      {mapLoaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
          <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.163 24.837 0 16 0ZM16 22C12.686 22 10 19.314 10 16C10 12.686 12.686 10 16 10C19.314 10 22 12.686 22 16C22 19.314 19.314 22 16 22Z" fill="#E91E63"/>
            <path d="M16 10C12.686 10 10 12.686 10 16C10 19.314 12.686 22 16 22C19.314 22 22 19.314 22 16C22 12.686 19.314 10 16 10ZM16 20C13.791 20 12 18.209 12 16C12 13.791 13.791 12 16 12C18.209 12 20 13.791 20 16C20 18.209 18.209 20 16 20Z" fill="white"/>
          </svg>
        </div>
      )}
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