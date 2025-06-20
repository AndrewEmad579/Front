import { getAuthHeaders, handleResponse, handleTextResponse } from "./apiHelpers"; // Assuming you create a shared apiHelpers.js file

const API_BASE_URL = "https://c074-197-49-220-162.ngrok-free.app"; // Replace with your actual API URL

// Helper function to get headers with ngrok bypass
const getNgrokHeaders = () => ({
  'ngrok-skip-browser-warning': '69420'
});

// Helper function to merge ngrok headers with auth headers
const getAuthHeadersWithNgrok = () => ({
  ...getAuthHeaders(),
  ...getNgrokHeaders()
});

export const cartAPI = {
  /**
   * Fetches all items in the currently logged-in user's cart.
   * Corresponds to: GET /api/cart/mycart
   * @returns {Promise<Array<object>>} A promise that resolves to an array of cart item objects.
   * The returned objects will have properties like: item_id, name, price, image_url, quantity, cart_item_id
   */
  getMyCart: async () => {
    const response = await fetch(`${API_BASE_URL}/api/cart/mycart`, {
      method: "GET",
      headers: getAuthHeadersWithNgrok(),
    });
    // This endpoint returns a JSON array of items
    return handleResponse(response);
  },

  /**
   * Adds an item to the logged-in user's cart.
   * Corresponds to: POST /api/cart/additem/{itemId}
   * @param {number} itemId - The ID of the bazaar item to add.
   * @returns {Promise<string>} A promise that resolves to the success message from the server.
   */
  addItem: async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/additem/${itemId}`, {
      method: "POST",
      headers: getAuthHeadersWithNgrok(),
    });
    // The backend for this endpoint returns a simple text response (e.g., "Item added to cart.")
    return handleTextResponse(response);
  },

  /**
   * Removes an item from the logged-in user's cart.
   * Corresponds to: DELETE /api/cart/removeitem/{cartItemId}
   * @param {number} cartItemId - The ID of the cart item entry (NOT the product ID). This ID is returned from getMyCart().
   * @returns {Promise<string>} A promise that resolves to the success message from the server.
   */
  removeItem: async (cartItemId) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/removeitem/${cartItemId}`, {
      method: "DELETE",
      headers: getAuthHeadersWithNgrok(),
    });
    // This endpoint also returns a simple text response
    return handleTextResponse(response);
  },
};