import { getAuthHeaders, handleResponse } from "./apiHelpers"; // Assuming helpers are in the same folder

const API_BASE_URL = "https://c074-197-49-220-162.ngrok-free.app"; // Replace with your actual API URL

export const orderAPI = {
  /**
   * Triggers the checkout process on the backend for the currently logged-in user.
   * The backend will use the user's saved cart to create the order.
   * Corresponds to: POST /api/orders/checkout
   * @returns {Promise<{message: string, orderId: number}>} A promise that resolves to an object containing a success message and the new order's ID.
   */
  checkout: async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/checkout`, {
      method: "POST",
      headers: getAuthHeaders(), // Sends the 'Authorization: Bearer <token>' header
      // This endpoint does not require a body as the server uses the authenticated user's cart
    });
    // This endpoint returns a JSON object on success
    return handleResponse(response);
  },

  /**
   * Fetches the order history for the currently logged-in user.
   * Corresponds to: GET /api/orders/history
   * @returns {Promise<Array<object>>} A promise that resolves to an array of the user's past order objects.
   */
  getOrderHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/history`, {
      method: "GET",
      headers: getAuthHeaders(), // Sends the required auth token
    });
    // This endpoint returns a JSON array of order objects
    return handleResponse(response);
  },
};