/**
 * Represents the structure of a Service object fetched from Strapi,
 * after mapping (id + attributes).
 */
export interface Service {
  id: number;
  serviceTypeId: string;
  displayName: string;
  description?: string;
  basePrice: number;
  additionalRoomCost: number;
  additionalHourCost: number;
  baseDurationHours: number;
  baseRoomsIncluded: number;
  // Add other fields if needed, e.g., created_at, updated_at
}

/**
 * Represents the structure of a Customer object fetched from Strapi,
 * after mapping (id + attributes).
 */
export interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber?: string;
    // Add other fields like address components if they exist in Strapi
}

/**
 * Data payload for creating a new Booking via the Strapi API.
 * Fields match the attributes in the Booking schema.json.
 */
export interface BookingPayload {
    scheduledDateTime: string; // ISO 8601 format
    address: string;
    bookingStatus?: string; // Changed from status
    propertyType: string; // 'house' or 'flat'
    numberOfRooms: number;
    durationHours: number;
    needsCleaningSupplies: boolean;
    calculatedCost: number;
    notes?: string;
    customer: number; // Relation: Customer ID
    service: number; // Relation: Service ID
    maid?: number; // Relation: Maid ID (Optional for now)
    // Add latitude/longitude if they are added to the Booking schema
  }

/**
 * Represents the structure of a Booking object returned by Strapi API
 * after creation or fetch (includes id and attributes).
 */
export interface BookingResponse {
  id: number;
  attributes: BookingPayload & {
    // Add Strapi metadata fields if needed (createdAt, updatedAt, etc.)
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
    // Potentially include populated relations if requested
    // customer?: { data: { id: number, attributes: Omit<Customer, 'id'> } };
    // service?: { data: { id: number, attributes: Omit<Service, 'id'> } };
  };
}

// Define other Strapi types here as needed (e.g., Maid) 