'use client';

import React, { useEffect } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children }) => {
  const { state } = useLanguageContext();
  const currentLang = state.language;
  const direction = currentLang === 'ar' ? 'rtl' : 'ltr';

  // Update lang and dir attributes on the html element when language changes
  useEffect(() => {
    console.log(`[ClientLayoutWrapper] Setting lang=${currentLang}, dir=${direction}`);
    document.documentElement.lang = currentLang;
    document.documentElement.dir = direction;
  }, [currentLang, direction]);

  // Render children directly
  return <>{children}</>;
};

export default ClientLayoutWrapper;