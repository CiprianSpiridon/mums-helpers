'use client';

import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';
import { Language } from '../config/translations';

// State
interface LanguageState {
  language: Language;
}

// Actions
type LanguageAction = { type: 'SET_LANGUAGE'; language: Language };

// Initial State
const initialState: LanguageState = {
  language: 'en', // Default language
};

// Reducer
const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.language };
    default:
      // Exhaustive check removed to avoid linter conflict with `never` type
      return state;
  }
};

// Context
interface LanguageContextProps {
  state: LanguageState;
  dispatch: Dispatch<LanguageAction>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Provider
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  // Log state changes for debugging
  useEffect(() => {
    console.log('[LanguageContext] Language changed to:', state.language);
  }, [state.language]);

  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}; 