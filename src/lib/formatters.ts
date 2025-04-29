/**
 * Gets the translation key for a given service type.
 * 
 * @param type - The service type (e.g., 'regular').
 * @returns The corresponding translation key (e.g., 'common.serviceRegular').
 */
export const getServiceTranslationKey = (type: string): string => {
  switch (type) {
    case 'regular': return 'common.serviceRegular';
    case 'deep': return 'common.serviceDeep';
    case 'move': return 'common.serviceMove';
    default: return type; // Fallback to the type itself if unknown
  }
};
  
/**
 * Gets the translation key for a given property type.
 * 
 * @param type - The property type (e.g., 'house').
 * @returns The corresponding translation key (e.g., 'common.propertyHouse').
 */
export const getPropertyTranslationKey = (type: string): string => {
  switch (type) {
    case 'house': return 'common.propertyHouse';
    case 'flat': return 'common.propertyFlat';
    default: return type;
  }
};

/**
 * Formats a date string (YYYY-MM-DD) for display.
 * 
 * @param dateString - The date string.
 * @returns Formatted date string or 'Not set' / 'Invalid Date'.
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Not set';
  try {
      const date = new Date(dateString);
      // Add specific time zone handling if necessary, e.g., for Dubai
      // date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Example: Adjust to UTC if input is local
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-AE', { // Use 'en-AE' locale for consistency
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
  } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return 'Invalid Date';
  }
};

/**
 * Formats a time string (HH:MM) for display (12-hour with AM/PM).
 * 
 * @param timeString - The time string.
 * @returns Formatted time string or 'Not set' / 'Invalid Time'.
 */
export const formatTime = (timeString: string): string => {
  if (!timeString) return 'Not set';
  const parts = timeString.split(':');
  if (parts.length !== 2 || isNaN(parseInt(parts[0])) || isNaN(parseInt(parts[1]))) {
      return 'Invalid Time';
  }
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
}; 