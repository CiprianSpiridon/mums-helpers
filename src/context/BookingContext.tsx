'use client';

import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';
import { Service } from '@/types/strapi';
import { fetchServices } from '@/lib/strapi';
import { CLEANING_SUPPLIES_FEE, PROPERTY_MULTIPLIERS } from '@/config/pricingConfig';

// 1. Define State Shape
interface BookingState {
  services: Service[];
  servicesLoading: boolean;
  serviceType: string;
  propertyType: string;
  numRooms: number;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  address: string;
  instructions: string;
  name: string;
  email: string;
  phone: string;
  latitude?: number;
  longitude?: number;
  needsCleaningSupplies: boolean;
  totalCost: number;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Define field type more strictly for SET_FIELD action
type SettableBookingField = keyof Omit<BookingState, 'totalCost' | 'errors' | 'touched'>;

// 2. Define Action Types
type BookingAction =
  | { type: 'SET_FIELD'; field: SettableBookingField; value: BookingState[SettableBookingField] }
  | { type: 'SET_LOCATION'; address: string; latitude?: number; longitude?: number }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SET_TOUCHED'; touched: Record<string, boolean> | { field: string; value: boolean } }
  | { type: 'SET_COST'; cost: number }
  | { type: 'SET_SERVICES'; services: Service[] }
  | { type: 'SET_SERVICES_LOADING'; loading: boolean }
  | { type: 'RESET_CONTACT_LOCATION' }
  | { type: 'RESET_FORM' };

// 3. Define Initial State
const initialState: BookingState = {
  services: [],
  servicesLoading: true,
  serviceType: 'regular',
  propertyType: 'house',
  numRooms: 2,
  bookingDate: '',
  bookingTime: '',
  duration: 2,
  address: '',
  instructions: '',
  name: '',
  email: '',
  phone: '',
  latitude: undefined,
  longitude: undefined,
  needsCleaningSupplies: false,
  totalCost: 0,
  errors: {},
  touched: {},
};

// New calculateTotalCost function using fetched service data
const calculateNewTotalCost = (
  selectedService: Service | undefined,
  propertyType: string,
  numRooms: number,
  duration: number,
  needsCleaningSupplies: boolean
): number => {
  if (!selectedService) return 0; // Return 0 if service not found/loaded

  // Start with base price from the service object
  let totalCost = selectedService.basePrice;

  // Apply property type multiplier (still using config for now)
  totalCost *= PROPERTY_MULTIPLIERS[propertyType as keyof typeof PROPERTY_MULTIPLIERS] || 1;

  // Add cost for additional rooms (using service object's baseRoomsIncluded and additionalRoomCost)
  const additionalRooms = Math.max(0, numRooms - selectedService.baseRoomsIncluded);
  totalCost += additionalRooms * selectedService.additionalRoomCost;

  // Add cost for additional hours (using service object's baseDurationHours and additionalHourCost)
  const additionalHours = Math.max(0, duration - selectedService.baseDurationHours);
  totalCost += additionalHours * selectedService.additionalHourCost;

  // Add cleaning supplies fee if needed (still using config for now)
  if (needsCleaningSupplies) {
    totalCost += CLEANING_SUPPLIES_FEE;
  }

  // Round to nearest integer
  return Math.round(totalCost);
};

// 4. Create Reducer Function
const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_FIELD':
      // Use simple version with `as any` to bypass linter issue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { ...state, [action.field]: action.value as any };
    case 'SET_LOCATION':
      return {
        ...state,
        address: action.address,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_TOUCHED':
      if ('field' in action.touched) {
        return { ...state, touched: { ...state.touched, [action.touched.field as string]: action.touched.value }};
      }
      return { ...state, touched: action.touched };
    case 'SET_COST':
      return { ...state, totalCost: action.cost };
    case 'SET_SERVICES':
      return { ...state, services: action.services, servicesLoading: false };
    case 'SET_SERVICES_LOADING':
      return { ...state, servicesLoading: action.loading };
    case 'RESET_CONTACT_LOCATION':
      return { 
        ...state, 
        address: '', 
        latitude: undefined,
        longitude: undefined,
        instructions: '', 
        name: '', 
        email: '', 
        phone: '', 
        errors: {}, 
        touched: {} 
      };
    case 'RESET_FORM':
      // Find the default service based on initialState.serviceType
      const defaultService = state.services.find(s => s.serviceTypeId === initialState.serviceType);
      const initialCost = calculateNewTotalCost(
        defaultService, 
        initialState.propertyType, 
        initialState.numRooms, 
        initialState.duration, 
        initialState.needsCleaningSupplies
      ); 
      // Reset state but keep fetched services
      return { 
          ...initialState, 
          services: state.services, 
          servicesLoading: false, // Ensure loading is false after reset
          totalCost: initialCost 
        }; 
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const exhaustiveCheck: never = action;
      return state;
  }
};

// 5. Create Context
interface BookingContextProps {
  state: BookingState;
  dispatch: Dispatch<BookingAction>;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

// 6. Create Provider Component
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Fetch services on mount
  useEffect(() => {
    const loadServices = async () => {
      dispatch({ type: 'SET_SERVICES_LOADING', loading: true });
      try {
        const fetchedServices = await fetchServices();
        dispatch({ type: 'SET_SERVICES', services: fetchedServices });
      } catch (error) {
        console.error("Failed to load services in context:", error);
        dispatch({ type: 'SET_SERVICES_LOADING', loading: false }); // Ensure loading stops on error
        // Optionally dispatch an error state to the context
      }
    };
    loadServices();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Recalculate cost when relevant fields or services change
  useEffect(() => {
    if (state.servicesLoading) return; // Don't calculate if services haven't loaded

    const selectedService = state.services.find(s => s.serviceTypeId === state.serviceType);
    
    const cost = calculateNewTotalCost(
      selectedService, 
      state.propertyType, 
      state.numRooms, 
      state.duration,
      state.needsCleaningSupplies
    );
    dispatch({ type: 'SET_COST', cost });
  }, [state.serviceType, state.propertyType, state.numRooms, state.duration, state.needsCleaningSupplies, state.services, state.servicesLoading]); // Add services and loading state to dependencies

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

// 7. Create Custom Hook for easy consumption
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
}; 