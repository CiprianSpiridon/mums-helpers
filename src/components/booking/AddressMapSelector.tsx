import React, { useState, useEffect } from 'react';
import { FormIcons } from './BookingIcons';
import GoogleMapComponent from './GoogleMapComponent';

interface AddressMapSelectorProps {
  address: string;
  setAddress: (address: string) => void;
  onAddressSelect: (address: string, lat?: number, lng?: number) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

const AddressMapSelector: React.FC<AddressMapSelectorProps> = ({
  address,
  setAddress,
  onAddressSelect,
  error,
  touched,
  onBlur = () => {},
}) => {
  // Sample addresses for demo purposes
  // In a real app, these would come from a map API
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Sample addresses - would be replaced with actual geocoding API
  const sampleAddresses = [
    'Sheikh Zayed Road, Dubai, UAE',
    'Downtown Dubai, UAE',
    'Dubai Marina, UAE',
    'Palm Jumeirah, Dubai, UAE',
    'Jumeirah Beach Residence, Dubai, UAE',
    'Business Bay, Dubai, UAE',
  ];
  
  // Filter suggestions based on input
  useEffect(() => {
    if (address.length > 2) {
      const filtered = sampleAddresses.filter(
        addr => addr.toLowerCase().includes(address.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [address]);
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleSelectAddress = (selectedAddress: string) => {
    setAddress(selectedAddress);
    onAddressSelect(selectedAddress, undefined, undefined);
    setShowSuggestions(false);
  };

  const handleMapLocationSelected = (selectedAddress: string, lat?: number, lng?: number) => {
    setAddress(selectedAddress);
    onAddressSelect(selectedAddress, lat, lng);
    setShowSuggestions(false);
  };
  
  // You should create these environment variables in your .env.local file:
  // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
  // NEXT_PUBLIC_GOOGLE_MAPS_ID=your_map_id_here
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || '';
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        Address <span className="text-red-500">*</span>
      </label>
      
      {/* Google Maps Component */}
      <GoogleMapComponent 
        onSelectLocation={handleMapLocationSelected}
        apiKey={apiKey}
        mapId={mapId}
      />
      
      {apiKey === '' && (
        <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-2">
          <p className="font-semibold">Map configuration required:</p>
          <ol className="list-decimal pl-5 mt-1 space-y-1">
            <li>Create a <span className="font-mono">.env.local</span> file in your project root</li>
            <li>Add <span className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key</span></li>
            <li>Add <span className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_ID=your_map_id</span></li>
            <li>Restart your development server</li>
          </ol>
        </div>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          onBlur={() => {
            onBlur();
            // Don't hide suggestions immediately to allow for selection
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter your address or select from map"
          required
          className={`block w-full pl-10 pr-3 py-3 border ${
            touched && error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
          } rounded-lg transition-all duration-200 text-gray-900`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {FormIcons.address}
        </div>
        
        {/* Address suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 hover:bg-pink-50 cursor-pointer text-sm"
                  onClick={() => handleSelectAddress(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {touched && error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      <p className="text-xs text-gray-500 mt-1">
        Please select your address from the map or search for it in the field above
      </p>
    </div>
  );
};

export default AddressMapSelector; 