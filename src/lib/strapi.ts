import { Service, Customer, BookingPayload, BookingResponse } from '@/types/strapi'; // Add Customer, BookingPayload, and BookingResponse
import { FetchedBooking, StrapiBookingResponseItem } from '@/types/strapi'; // Import the new types

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
  const queryParams = new URLSearchParams({
     'filters[email][$eq]': email,
     'fields[0]': 'name',
     'fields[1]': 'email',
     'fields[2]': 'phoneNumber',
     'fields[3]': 'documentId'
    });
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
      return { 
        id: item.id, 
        documentId: item.documentId,
        ...item.attributes 
      };
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
        return { 
          id: data.data.id, 
          documentId: data.data.documentId,
          ...data.data.attributes 
        };
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

/**
 * Finds bookings based on customer email, phone, or documentId.
 */
export async function findBookings(identifier: string): Promise<FetchedBooking[]> {
  console.log(`[findBookings] Searching for bookings with identifier: ${identifier}`);
  let customerDocId: string | null = null;

  // Basic check: If it looks like an email or contains numbers (phone), try finding customer first.
  // A more robust check might be needed (e.g., regex for email/phone format).
  // Assuming documentIds don't typically contain '@' or many digits like phones.
  const isLikelyContact = identifier.includes('@') || /\d{5,}/.test(identifier);
  const isLikelyDocId = !isLikelyContact && identifier.length > 10; // Basic assumption for docId

  if (isLikelyDocId) {
    console.log(`[findBookings] Assuming identifier is a documentId.`);
    customerDocId = identifier;
  } else if (isLikelyContact) {
    console.log(`[findBookings] Identifier looks like email/phone, attempting customer lookup...`);
    try {
      // TODO: Implement findCustomerByPhone if needed, or rely on email for now.
      const customer = await findCustomerByEmail(identifier);
      if (customer && customer.documentId) {
        customerDocId = customer.documentId;
        console.log(`[findBookings] Found customer documentId: ${customerDocId}`);
      } else {
        console.log(`[findBookings] No customer found for identifier: ${identifier}`);
        return []; // No customer found, so no bookings
      }
    } catch (error) {
      console.error(`[findBookings] Error finding customer by identifier ${identifier}:`, error);
      throw new Error('Failed to look up customer information.'); // Re-throw or return empty
    }
  } else {
     console.log(`[findBookings] Identifier format unclear, attempting search as documentId.`);
     customerDocId = identifier; // Default to searching by docId if unclear
  }

  if (!customerDocId) {
     console.log(`[findBookings] Could not determine customer documentId.`);
    return []; // If we couldn't find/determine a customer documentId
  }

  // Construct query parameters to filter bookings by customer documentId
  const queryParams = new URLSearchParams({
    'filters[customer][documentId][$eq]': customerDocId,
    'populate[service][fields][0]': 'displayName', // Populate service display name
    'populate[customer][fields][0]': 'name',       // Populate customer name (optional, useful for display)
    'populate[customer][fields][1]': 'email',      // Populate customer email
    'populate[customer][fields][2]': 'phoneNumber',// Populate customer phone
    'sort[0]': 'scheduledDateTime:desc'            // Sort by date descending
  });

  try {
    console.log(`[findBookings] Fetching bookings from: ${STRAPI_API_URL}/api/bookings?${queryParams.toString()}`);
    const response = await fetch(`${STRAPI_API_URL}/api/bookings?${queryParams.toString()}`, {
      headers: createHeaders(), // Auth might be needed depending on permissions
    });

    if (!response.ok) {
      console.error(`[findBookings] API Error: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error(`[findBookings] Error Body: ${errorBody}`);
      throw new Error(`Failed to fetch bookings: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('[findBookings] Raw API response:', JSON.stringify(result, null, 2));

    if (result && Array.isArray(result.data)) {
      // Map the Strapi response to our FetchedBooking structure (using flattened structure)
      const mappedBookings: FetchedBooking[] = result.data.map((item: StrapiBookingResponseItem) => ({
        id: item.id,
        documentId: item.documentId, 
        // Map fields directly from item
        scheduledDateTime: item.scheduledDateTime,
        address: item.address,
        bookingStatus: item.bookingStatus,
        durationHours: item.durationHours,
        calculatedCost: item.calculatedCost,
        notes: item.notes,
        // Extract populated data directly from item (check for null)
        service: {
          displayName: item.service?.displayName,
        },
        customer: {
          name: item.customer?.name,
          email: item.customer?.email,
          phoneNumber: item.customer?.phoneNumber,
        }
        // Map other fields as needed
      }));
       console.log('[findBookings] Mapped bookings:', mappedBookings);
      return mappedBookings;
    } else {
       console.log('[findBookings] No booking data found in response.');
      return []; // Return empty array if data format is unexpected
    }

  } catch (error) {
    console.error("[findBookings] Error fetching or processing bookings:", error);
    throw error; // Re-throw to be handled by the caller
  }
} 