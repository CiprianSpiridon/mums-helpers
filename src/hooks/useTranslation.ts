import { useLanguageContext } from '../context/LanguageContext';
import { translations } from '../config/translations';

// Define a type for the translation result, excluding functions initially
type TranslationValue = string | number | Record<string, unknown> | undefined;

/**
 * Custom hook to get translation functions based on the current language context.
 */
export const useTranslation = () => {
  const { state } = useLanguageContext();
  const currentLanguage = state.language || 'en'; // Default to English
  const currentTranslations = translations[currentLanguage];
  const isRtl = currentLanguage === 'ar'; // Calculate RTL flag here

  // Log the language being used by the hook
  console.log('[useTranslation] Using language:', currentLanguage, 'isRtl:', isRtl);

  /**
   * Gets a translation string for the current language.
   * Supports nested keys using dot notation (e.g., 'navigation.back').
   * 
   * @param key - The key for the translation string.
   * @param params - Optional parameters for dynamic strings (e.g., numbers for price).
   * @returns The translated string or the key itself if not found.
   */
   // Use specific types for params where known, otherwise unknown
  const t = (key: string, ...params: unknown[]): string => {
    const keys = key.split('.');
    let result: TranslationValue | ((price: number) => string) | unknown = currentTranslations;

    try {
      for (const k of keys) {
        if (typeof result === 'object' && result !== null && k in result) {
            result = (result as Record<string, unknown>)[k];
        } else {
            result = undefined;
        }
        
        if (result === undefined) {
          console.warn(`Translation key not found: ${key} for language ${currentLanguage}`);
          return key; 
        }
      }

      // Handle specific function translations
      if (key === 'serviceStep.fromPrice' && typeof result === 'function') {
          const priceParam = typeof params[0] === 'number' ? params[0] : 0;
          return (result as (price: number) => string)(priceParam);
      }
      // Handle stepIndicator function
      else if (key === 'progressSteps.stepIndicator' && typeof result === 'function') {
         const current = typeof params[0] === 'number' ? params[0] : 0;
         const total = typeof params[1] === 'number' ? params[1] : 0;
         return (result as (current: number, total: number) => string)(current, total);
      }
      // Handle confirmation subtitle function
      else if (key === 'confirmationStep.subtitle' && typeof result === 'function') {
        // Expecting the first param to be the name string
        const nameParam = typeof params[0] === 'string' ? params[0] : '';
        return (result as (name: string) => string)(nameParam);
      }
       // Add handlers for other potential function types here

      if (typeof result === 'string') {
        return result;
      }

      console.warn(`Translation key ${key} did not resolve to a string or handled function.`);
      return key; // Fallback for non-string, non-handled function results
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key; // Return key on error
    }
  };

  // Function to change language
  // Note: We get dispatch from useBookingContext inside components needing language change
  // const changeLanguage = (lang: Language) => {
  //   dispatch({ type: 'SET_LANGUAGE', language: lang });
  // };

  return { t, currentLanguage, isRtl };
}; 