import { Service, Customer, BookingPayload, BookingResponse } from '@/types/strapi'; // Add Customer, BookingPayload, and BookingResponse

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
// We might get the token differently depending on auth setup (e.g., from context/session)
// Revert back to using environment variable or removing if public
const AUTH_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; // Or null/undefined if public

// Helper to create headers object
const createHeaders = (includeContentType = false): HeadersInit => {
  const headers: Record<string, string> = {};
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  if (AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }
  return headers;
};

/**
 * Fetches the list of available services from the Strapi API.
 * Assumes services are publicly readable.
 */
export async function fetchServices(): Promise<Service[]> {
  try {
    // No auth or content-type needed
    const response = await fetch(`${STRAPI_API_URL}/api/services`);
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    const data = await response.json();

    // Strapi typically wraps the data in a `data` property, 
    // and each item has `id` and `attributes`.
    // We map it to a more usable format.
    if (data && Array.isArray(data.data)) {
      // Modify the map callback based on the actual API response structure
      return data.data.map((item: Service) => { // Use Service type directly
        // console.log('[fetchServices] Item received by map (direct return):', item); // Removed log
        // Assuming item structure is { id: number, displayName: string, ... } which matches our Service type
        // Just return the item directly
        return item; // No need to cast if item already matches Service
      });
    }
    return []; // Return empty array if data format is unexpected

  } catch (error) {
    console.error("Error fetching services:", error);
    // Depending on error handling strategy, you might want to re-throw the error
    // or return a specific error state.
    return []; // Return empty array on error for now
  }
}

/**
 * Finds a customer by email.
 * Assumes email is unique for customers.
 * Requires find permission for the Customer content type for the public or authenticated role.
 */
export async function findCustomerByEmail(email: string): Promise<Customer | null> {
  if (!email) return null;
  const queryParams = new URLSearchParams({ 'filters[email][$eq]': email });
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/customers?${queryParams.toString()}`, {
        headers: createHeaders(), // Use helper (auth only if needed)
      });
    if (!response.ok) {
      throw new Error(`Failed to find customer: ${response.statusText}`);
    }
    const data = await response.json();
    if (data && Array.isArray(data.data) && data.data.length > 0) {
      const item = data.data[0];
      return { id: item.id, ...item.attributes };
    }
    return null; // Not found
  } catch (error) {
    console.error("Error finding customer by email:", error);
    throw error; // Re-throw to be handled by caller
  }
}

/**
 * Creates a new customer.
 * Requires create permission for the Customer content type.
 */
export async function createCustomer(customerData: { name: string; email: string; phone?: string }): Promise<Customer> {
  // Map frontend 'phone' to backend 'phoneNumber'
  const payload = {
    name: customerData.name,
    email: customerData.email,
    ...(customerData.phone && { phoneNumber: customerData.phone }) // Conditionally add phoneNumber
  };

  try {
    const response = await fetch(`${STRAPI_API_URL}/api/customers`, {
      method: 'POST',
      headers: createHeaders(true), 
      body: JSON.stringify({ data: payload }), // Send the mapped payload
    });
    if (!response.ok) {
      // Attempt to parse error details from Strapi
      const errorBody = await response.json().catch(() => ({})); // Catch JSON parsing errors
      console.error("Strapi Error Body:", errorBody);
      throw new Error(`Failed to create customer: ${response.statusText} - ${errorBody?.error?.message || 'Unknown error'}`);
    }
    const data = await response.json();
    if (data && data.data) {
        return { id: data.data.id, ...data.data.attributes };
    }
    throw new Error("Failed to parse create customer response");

  } catch (error) {
    console.error("Error creating customer:", error);
    throw error; // Re-throw
  }
}

/**
 * Submits a new booking to the Strapi API.
 * Requires create permission for the Booking content type.
 */
export async function submitBooking(payload: BookingPayload): Promise<BookingResponse> { // Use BookingResponse
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/bookings`, {
      method: 'POST',
      headers: createHeaders(true), // Use helper (Content-Type + Auth)
      body: JSON.stringify({ data: payload }), // Strapi expects data wrapping
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error("Strapi Error Body:", errorBody);
      throw new Error(`Failed to submit booking: ${response.statusText} - ${errorBody?.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    // Return the created booking data, assuming it matches BookingResponse structure
    return data.data as BookingResponse; 

  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error; // Re-throw
  }
}

// TODO: Add functions for fetching other data (e.g., maids)

// --- Added from api.ts ---

export interface SlotDefinition {
  id: number;
  identifier: string;
  startTime: string; // e.g., "08:00:00.000"
  endTime: string;   // e.g., "08:30:00.000"
}

export async function fetchSlots(): Promise<SlotDefinition[]> {
  try {
    // Add pagination parameter to fetch all slots (assuming less than 100)
    const response = await fetch(`${STRAPI_API_URL}/api/slot-definitions?sort=startTime&pagination[pageSize]=100`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Assuming the structure is { data: [ { id: ..., attributes: { ... } } ] }
    if (!data.data) {
        console.error("Unexpected API response structure for slots:", data);
        return [];
    }

    // Adjust mapping to direct properties
    return data.data.map((item: SlotDefinition) => {
      // Directly return the item as it matches the SlotDefinition interface
      return item;
    });
  } catch (error) {
    console.error("Failed to fetch slots:", error);
    return []; // Return empty array on error
  }
} 