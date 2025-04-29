import React, { useState, useEffect, useCallback } from 'react';
import { FormIcons } from './BookingIcons';
import GoogleMapComponent from '@/components/booking/GoogleMapComponent';
import { useTranslation } from '@/hooks/useTranslation';

// Move sampleAddresses outside the component
const sampleAddresses = [
  'Sheikh Zayed Road, Dubai, UAE',
  'Downtown Dubai, UAE',
  'Dubai Marina, UAE',
  'Palm Jumeirah, Dubai, UAE',
  'Jumeirah Beach Residence, Dubai, UAE',
  'Business Bay, Dubai, UAE',
];

interface AddressMapSelectorProps {
  address: string;
  setAddress: (address: string) => void;
  onAddressSelect: (address: string, lat?: number, lng?: number) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
  latitude?: number;
  longitude?: number;
}

const AddressMapSelector: React.FC<AddressMapSelectorProps> = ({
  address,
  setAddress,
  onAddressSelect,
  error,
  touched,
  onBlur = () => {},
  latitude,
  longitude
}) => {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // useEffect no longer needs sampleAddresses in deps if it's defined outside
  useEffect(() => {
    if (address.length > 2) {
      const filtered = sampleAddresses.filter(
        addr => addr.toLowerCase().includes(address.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [address]); // Remove sampleAddresses from deps
  
  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setShowSuggestions(true);
  }, [setAddress]);
  
  const handleSelectAddress = useCallback((selectedAddress: string) => {
    setAddress(selectedAddress);
    onAddressSelect(selectedAddress, undefined, undefined);
    setShowSuggestions(false);
  }, [setAddress, onAddressSelect]);

  const handleMapLocationSelected = useCallback((selectedAddress: string, lat?: number, lng?: number) => {
    setAddress(selectedAddress);
    onAddressSelect(selectedAddress, lat, lng);
    setShowSuggestions(false);
  }, [setAddress, onAddressSelect]);
  
  const handleInputBlur = useCallback(() => {
    onBlur();
    // Don't hide suggestions immediately to allow for selection
    setTimeout(() => setShowSuggestions(false), 200);
  }, [onBlur]);
  
  // You should create these environment variables in your .env.local file:
  // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
  // NEXT_PUBLIC_GOOGLE_MAPS_ID=your_map_id_here
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || '';
  
  return (
    <div className="space-y-2">
      {/* Removed duplicate label - parent component already has this label */}
      
      {/* Google Maps Component */}
      <GoogleMapComponent 
        onSelectLocation={handleMapLocationSelected}
        apiKey={apiKey}
        mapId={mapId}
        initialLat={latitude}
        initialLng={longitude}
      />
      
      {apiKey === '' && (
        <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-2">
          <p className="font-semibold">{t('mapConfigRequired')}</p>
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
          onBlur={handleInputBlur}
          onFocus={() => setShowSuggestions(true)}
          placeholder={t('locationStep.mapPlaceholder')}
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
        {t('locationStep.mapHelpText')}
      </p>
    </div>
  );
};

export default AddressMapSelector; 