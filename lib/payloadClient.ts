/** Type representing query parameters for API requests */
type QueryParams = Record<string, string | number | boolean>;

/** Interface representing the paginated response from Payload CMS */
interface PayloadResponse<T> {
  docs: T[]; // Array of documents
  totalDocs: number; // Total number of documents
  limit: number; // Number of documents per page
  totalPages: number; // Total number of pages
  page: number; // Current page number
  pagingCounter: number; // Starting number for document counting
  hasPrevPage: boolean; // Whether there is a previous page
  hasNextPage: boolean; // Whether there is a next page
  prevPage: number | null; // Previous page number if it exists
  nextPage: number | null; // Next page number if it exists
}

/** Interface defining the Payload CMS client methods */
interface PayloadClient {
  /**
   * Fetches multiple documents from a collection
   * @param {string} collection - The name of the collection to query
   * @param {QueryParams} [query] - Optional query parameters
   * @returns {Promise<PayloadResponse<T>>} Paginated response of documents
   */
  find: <T>(
    collection: string,
    query?: QueryParams
  ) => Promise<PayloadResponse<T>>;

  /**
   * Fetches a single document by ID
   * @param {string} collection - The name of the collection
   * @param {string} id - The document ID
   * @returns {Promise<T>} The requested document
   */
  findOne: <T>(collection: string, id: string) => Promise<T>;

  /**
   * Updates a document by ID
   * @param {string} collection - The name of the collection
   * @param {string} id - The document ID
   * @param {any} data - The data to update
   * @returns {Promise<T>} The updated document
   */
  update: <T>(collection: string, id: string, data: any) => Promise<T>;
}

/** Base API URL for Payload CMS server */
const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || 'http://localhost:3001';

/**
 * Implementation of the PayloadClient interface for interacting with Payload CMS
 * @type {PayloadClient}
 */
export const payloadClient: PayloadClient = {
  async find(collection, query = {}) {
    const url = `${API_URL}/api/${collection}?${new URLSearchParams(
      query as Record<string, string>
    )}`;
    
    console.log('Fetching from URL:', url);
    
    try {
      const response = await fetch(url, {
        next: {
          tags: [collection + "-data"],
          revalidate: Number(process.env.NEXT_PUBLIC_TTL) || 60, // revalidate every 60 seconds by default
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error in payloadClient.find:', error);
      console.error('API_URL:', API_URL);
      throw error;
    }
  },

  async findOne(collection, id) {
    const response = await fetch(`${API_URL}/api/${collection}/${id}`, {
      next: {
        tags: [collection + "-" + id],
        revalidate: Number(process.env.NEXT_PUBLIC_TTL) || 60, // revalidate every 60 seconds by default
      },
    });
    return response.json();
  },

  async update(collection, id, data) {
    const url = `${API_URL}/api/${collection}/${id}`;
    
    console.log('Updating:', url, data);
    console.log('API_URL:', API_URL);
    
    try {
      // Try PATCH first (common for Payload CMS)
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // If PATCH fails, try PUT
      if (!response.ok && response.status === 405) {
        console.log('PATCH failed, trying PUT...');
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in payloadClient.update:', error);
      console.error('API_URL:', API_URL);
      throw error;
    }
  },
};

/**
 * Factory function to get the Payload client instance
 * @returns {PayloadClient} The Payload client instance
 */
export const getPayloadClient = () => {
  return payloadClient;
};