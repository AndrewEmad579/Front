import { getAuthHeaders, getAuthHeadersForFormData, handleResponse, handleTextResponse } from "./apiHelpers";

const API_BASE_URL = "https://03c8-105-207-159-205.ngrok-free.app"; // Replace with your actual API URL

// Helper function to get headers with ngrok bypass
const getNgrokHeaders = () => ({
  'ngrok-skip-browser-warning': '69420'
});

// Helper function to merge ngrok headers with auth headers
const getAuthHeadersWithNgrok = () => ({
  ...getAuthHeaders(),
  ...getNgrokHeaders()
});

// Helper function to merge ngrok headers with form data auth headers
const getAuthHeadersForFormDataWithNgrok = () => ({
  ...getAuthHeadersForFormData(),
  ...getNgrokHeaders()
});

export const bazaarAPI = {
  // ==========================================================
  // PUBLIC BAZAAR FUNCTIONS (No Auth Required)
  // ==========================================================

  /**
   * Fetches all publicly available bazaar items.
   * Corresponds to: GET /api/bazaar/items
   * @returns {Promise<Array<object>>} A promise that resolves to an array of bazaar item objects.
   */
  getAllItems: async () => {
    const response = await fetch(`${API_BASE_URL}/api/bazaar/items`, {
      headers: getNgrokHeaders()
    });
    return handleResponse(response);
  },

  /**
   * Fetches a single bazaar item by its ID.
   * Corresponds to: GET /api/bazaar/items/{itemId}
   * @param {number} itemId - The ID of the item to fetch.
   * @returns {Promise<object>} A promise that resolves to a single bazaar item object.
   */
  getItemById: async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/api/bazaar/items/${itemId}`, {
      headers: getNgrokHeaders()
    });
    return handleResponse(response);
  },

  // ==========================================================
  // ADMIN BAZAAR FUNCTIONS (Admin Auth Required)
  // ==========================================================

  /**
   * Creates a new bazaar item, including an optional image file.
   * Corresponds to: POST /api/admin/bazaar/additem
   * @param {object} itemData - The data for the new item.
   * @param {string} itemData.name
   * @param {string} itemData.description
   * @param {number} itemData.price
   * @param {number} itemData.stock
   * @param {File} [itemData.file] - The image file to upload (optional).
   * @returns {Promise<string>} A promise that resolves to the success message from the server.
   */
  createItem: async (itemData) => {
    const formData = new FormData();
    formData.append('name', itemData.name);
    formData.append('description', itemData.description || '');
    formData.append('price', itemData.price);
    formData.append('stock', itemData.stock);

    if (itemData.file) {
      formData.append('file', itemData.file);
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/additem`, {
      method: "POST",
      headers: getAuthHeadersForFormDataWithNgrok(),
      body: formData,
    });
    // The backend for this endpoint returns a simple text response
    return handleTextResponse(response);
  },

  /**
   * Updates an existing bazaar item, with an optional new image file.
   * Corresponds to: POST /api/admin/bazaar/updateitem
   * @param {object} itemData - The data for the item update.
   * @param {number} itemData.itemId
   * @param {string} itemData.name
   * @param {string} itemData.description
   * @param {number} itemData.price
   * @param {number} itemData.stock
   * @param {File} [itemData.file] - The new image file to upload (optional).
   * @returns {Promise<string>} A promise that resolves to the success message from the server.
   */
  updateItem: async (itemData) => {
    const formData = new FormData();
    formData.append('itemId', itemData.itemId);
    formData.append('name', itemData.name);
    formData.append('description', itemData.description || '');
    formData.append('price', itemData.price);
    formData.append('stock', itemData.stock);

    if (itemData.file) {
      formData.append('file', itemData.file);
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/updateitem`, {
      method: "POST", // Backend uses POST for this endpoint
      headers: getAuthHeadersForFormDataWithNgrok(),
      body: formData,
    });
    return handleTextResponse(response);
  },

  /**
   * Deletes a bazaar item by its ID.
   * Corresponds to: DELETE /api/admin/bazaar/deleteitem/{itemId}
   * @param {number} itemId - The ID of the item to delete.
   * @returns {Promise<string>} A promise that resolves to the success message from the server.
   */
  deleteItem: async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/deleteitem/${itemId}`, {
      method: "DELETE",
      headers: getAuthHeadersWithNgrok(),
    });
    return handleTextResponse(response);
  },
  
  /**
   * Gets a list of all user orders for the admin panel.
   * Corresponds to: GET /api/admin/bazaar/orders
   * @returns {Promise<Array<object>>} A promise that resolves to an array of all order objects.
   */
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/orders`, {
      method: "GET",
      headers: getAuthHeadersWithNgrok(),
    });
    return handleResponse(response);
  }
};