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
      
      /* --- Restore marker creation --- */
      // Create marker - try advanced marker first, fallback to regular marker
      try {
        // Verify marker library is loaded
        if (!googleWindow.google?.maps?.marker) {
          console.warn('Marker library not loaded, falling back to standard marker');
          throw new Error("Google Maps Marker library not loaded.");
        }
        
        console.log('Creating advanced marker...');
        // Try to create advanced marker
        const advancedMarker = new googleWindow.google.maps.marker.AdvancedMarkerElement({
          position: defaultLocation,
          map: map,
          draggable: true,
        });
        
        setMarker(advancedMarker);
        
        // Add dragend listener to marker
        advancedMarker.addListener('dragend', () => {
          // Get the marker position
          const position = advancedMarker.position as LatLng | LatLngLiteral | null;
          
          if (position) {
            let lat: number | undefined;
            let lng: number | undefined;
            
            // Type guard to check if it's a LatLng object with callable methods
            if ('lat' in position && typeof position.lat === 'function' && 
                'lng' in position && typeof position.lng === 'function') {
              lat = position.lat();
              lng = position.lng();
            } 
            // Check if it's a LatLngLiteral object with number properties
            else if ('lat' in position && typeof position.lat === 'number' && 
                     'lng' in position && typeof position.lng === 'number') {
              lat = position.lat;
              lng = position.lng;
            }

            if (lat !== undefined && lng !== undefined) {
              console.log('Advanced Marker dragged to:', lat, lng);
              
              // Explicitly create LatLngLiteral for geocoder
              const locationLiteral: LatLngLiteral = { lat, lng };

              // Get address from coordinates using the literal
              geocoderInstance.geocode({ location: locationLiteral }, (results, status) => {
                console.log('Geocode Status (Advanced Marker):', status);
                console.log('Geocode Results (Advanced Marker):', results);
                if (status === 'OK' && results && results[0]) {
                  const address = results[0].formatted_address;
                  console.log('Geocoded Address (Advanced Marker):', address);
                  onSelectLocation(address, lat, lng);
                } else {
                  console.error('Geocode failed (Advanced Marker):', status);
                }
              });
            } else {
               console.error('Could not extract lat/lng from marker position:', position);
            }
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
          
          if (position) {
            console.log('Standard Marker dragged to:', position.lat(), position.lng());
            // Get address from coordinates
            geocoderInstance.geocode({ location: position }, (results, status) => {
              console.log('Geocode Status (Standard Marker):', status);
              console.log('Geocode Results (Standard Marker):', results);
              if (status === 'OK' && results && results[0]) {
                const address = results[0].formatted_address;
                console.log('Geocoded Address (Standard Marker):', address);
                onSelectLocation(address, position.lat(), position.lng());
              } else {
                console.error('Geocode failed (Standard Marker):', status);
              }
            });
          }
        });
      }
      
      // Add click listener to map
      map.addListener('click', (e: { latLng: LatLng }) => {
        const clickedLocation = e.latLng;
        console.log('Map clicked at:', clickedLocation?.lat(), clickedLocation?.lng());
        
        if (marker && clickedLocation) {
          // Advanced marker - use its setPosition method if available
          if (typeof (marker as AdvancedMarkerElement).setPosition === 'function') {
            (marker as AdvancedMarkerElement).setPosition(clickedLocation);
          } else {
            console.warn('Could not determine how to set marker position programmatically.');
          }
        }
        
        if (clickedLocation) {
          // Get address from coordinates
          geocoderInstance.geocode({ location: clickedLocation }, (results, status) => {
            console.log('Geocode Status (Map Click):', status);
            console.log('Geocode Results (Map Click):', results);
            if (status === 'OK' && results && results[0]) {
              const address = results[0].formatted_address;
              console.log('Geocoded Address (Map Click):', address);
              onSelectLocation(address, clickedLocation.lat(), clickedLocation.lng());
            } else {
              console.error('Geocode failed (Map Click):', status);
            }
          });
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