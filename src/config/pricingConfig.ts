// Pricing configuration for cleaning services

// Base prices per service type
const BASE_PRICES = {
  regular: 120, // AED per booking
  deep: 200,    // AED per booking
  move: 250,    // AED per booking
};

// Price multipliers
const PROPERTY_MULTIPLIERS = {
  house: 1.2,  // Houses cost more than flats
  flat: 1.0,   // Base multiplier for flats
};

// Additional room costs
const ROOM_COSTS = {
  regular: 25, // AED per additional room beyond 1
  deep: 40,    // AED per additional room beyond 1
  move: 50,    // AED per additional room beyond 1
};

// Duration multipliers (per hour beyond 2 hours)
const DURATION_COSTS = {
  regular: 50, // AED per additional hour
  deep: 70,    // AED per additional hour
  move: 90,    // AED per additional hour
};

/**
 * Calculate the total cost based on selected options
 * 
 * @param serviceType - Type of cleaning service selected
 * @param propertyType - Type of property (house or flat)
 * @param numRooms - Number of rooms
 * @param duration - Duration in hours
 * @returns The total cost in AED
 */
export const calculateTotalCost = (
  serviceType: string,
  propertyType: string,
  numRooms: number,
  duration: number
): number => {
  // Start with base price
  let totalCost = BASE_PRICES[serviceType as keyof typeof BASE_PRICES] || BASE_PRICES.regular;
  
  // Apply property type multiplier
  totalCost *= PROPERTY_MULTIPLIERS[propertyType as keyof typeof PROPERTY_MULTIPLIERS] || 1;
  
  // Add cost for additional rooms (first room is included in base price)
  const additionalRooms = Math.max(0, numRooms - 1);
  totalCost += additionalRooms * (ROOM_COSTS[serviceType as keyof typeof ROOM_COSTS] || ROOM_COSTS.regular);
  
  // Add cost for additional hours (first 2 hours included in base price)
  const additionalHours = Math.max(0, duration - 2);
  totalCost += additionalHours * (DURATION_COSTS[serviceType as keyof typeof DURATION_COSTS] || DURATION_COSTS.regular);
  
  // Round to nearest integer
  return Math.round(totalCost);
};

// Service type labels for display
export const SERVICE_LABELS = {
  regular: "Regular Cleaning",
  deep: "Deep Cleaning",
  move: "Move-in/out Cleaning"
};

// Property type labels for display
export const PROPERTY_LABELS = {
  house: "House",
  flat: "Flat/Apartment"
}; 