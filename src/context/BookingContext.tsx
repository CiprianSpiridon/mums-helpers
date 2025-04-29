'use client';

import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';
import { calculateTotalCost } from '../config/pricingConfig';

// 1. Define State Shape
interface BookingState {
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
  | { type: 'RESET_CONTACT_LOCATION' }
  | { type: 'RESET_FORM' };

// 3. Define Initial State
const initialState: BookingState = {
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
  totalCost: 0,
  errors: {},
  touched: {},
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
      const initialCost = calculateTotalCost(initialState.serviceType, initialState.propertyType, initialState.numRooms, initialState.duration);
      return { ...initialState, totalCost: initialCost }; 
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

  // Recalculate cost when relevant fields change
  useEffect(() => {
    const cost = calculateTotalCost(state.serviceType, state.propertyType, state.numRooms, state.duration);
    dispatch({ type: 'SET_COST', cost });
  }, [state.serviceType, state.propertyType, state.numRooms, state.duration]);

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