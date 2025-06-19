/**
 * Gets the auth token from localStorage and prepares the authorization headers.
 * This is the standard header format for sending JSON data.
 * @returns {object} The headers object for a fetch request.
 */
export const getAuthHeaders = () => {
    const token = localStorage.getItem("auth_token");
    return {
      "Content-Type": "application/json",
      // Ensure the Bearer prefix is added correctly
      ...(token && { Authorization: `Bearer ${token.replace(/^Bearer\s+/, '')}` }),
    };
  };
  
  /**
   * Gets the auth token from localStorage for FormData requests.
   * Note: We do not set 'Content-Type' here, as the browser handles it for FormData.
   * @returns {object} The headers object for a FormData fetch request.
   */
  export const getAuthHeadersForFormData = () => {
    const token = localStorage.getItem("auth_token");
    return {
      // DO NOT set 'Content-Type': 'multipart/form-data'.
      // The browser needs to set this itself to include the boundary string.
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };
  
  
  /**
   * Handles API responses that are expected to be JSON.
   * Parses the JSON and throws a formatted error for failed requests.
   * @param {Response} response - The response object from a fetch call.
   * @returns {Promise<any>} The parsed JSON data from the response.
   */
  export const handleResponse = async (response) => {
    // Handle successful but empty responses (e.g., 204 No Content from a DELETE)
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return; // Return undefined or a specific success indicator as there's no body
    }
  
    const responseData = await response.json();
  
    if (!response.ok) {
      // Create a descriptive error message from the various possible error formats from the backend
      const error = responseData.message || responseData.error || responseData.title || "An unknown error occurred.";
      throw new Error(error);
    }
  
    return responseData;
  };
  
  /**
   * Handles API responses that are expected to be plain text.
   * This is common for simple success messages (e.g., "Item added successfully.").
   * Throws an error for failed requests.
   * @param {Response} response - The response object from a fetch call.
   * @returns {Promise<string>} The text content from the response.
   */
  export const handleTextResponse = async (response) => {
      const textData = await response.text();
  
      if (!response.ok) {
          // If the server sends an error, it might still be text. Use it as the error message.
          throw new Error(textData || "An unknown error occurred.");
      }
      
      return textData;
  };