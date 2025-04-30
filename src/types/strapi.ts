/**
 * Represents the structure of a Service object fetched from Strapi,
 * after mapping (id + attributes).
 */
export interface Service {
  id: number;
  documentId: string;
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
    documentId: string;
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
    customer: number | string; // Relation: Customer ID or documentId
    service: number | string; // Relation: Service ID or documentId
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

/**
 * Represents the structure of a Booking object fetched for the 'My Bookings' page,
 * including populated data.
 */
export interface FetchedBooking {
  id: number; // Strapi's internal ID
  documentId: string; // Strapi's document ID
  scheduledDateTime: string;
  address: string;
  durationHours: number;
  bookingStatus: string;
  calculatedCost: number;
  notes?: string;
  // Populated data (adjust based on actual population)
  service?: {
    displayName?: string; 
  };
  customer?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  // Add maid details if populated
}

/**
 * Represents the raw structure of a single item in the Strapi API response 
 * for a booking query with populated customer and service.
 * Based on observed API output, fields are flattened.
 */
export interface StrapiBookingResponseItem {
  id: number;
  documentId: string;
  // --- Fields directly on the item, not nested under attributes ---
  scheduledDateTime: string;
  address: string;
  bookingStatus: string;
  durationHours: number;
  calculatedCost: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  propertyType?: string;
  numberOfRooms?: number;
  needsCleaningSupplies?: boolean;
  // --- Populated relations (also appear flattened) ---
  customer: {
    id: number;
    documentId: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  } | null;
  service: {
    id: number;
    documentId: string;
    displayName?: string;
  } | null;
}

// Define other Strapi types here as needed (e.g., Maid) 