import { getAuthHeaders, getAuthHeadersForFormData, handleResponse, handleTextResponse } from "./apiHelpers";
import { BazaarItem } from "@/types/bazaar";

const API_BASE_URL = "https://4285-197-49-220-162.ngrok-free.app"; // Replace with your actual API URL

export const bazaarAPI = {
  // ==========================================================
  // PUBLIC BAZAAR FUNCTIONS (No Auth Required)
  // ==========================================================

  /**
   * Fetches all publicly available bazaar items.
   * Corresponds to: GET /api/bazaar/items
   * @returns {Promise<Array<BazaarItem>>} A promise that resolves to an array of bazaar item objects.
   */
  getAllItems: async (): Promise<BazaarItem[]> => {
    const response = await fetch(`${API_BASE_URL}/api/bazaar/items`);
    return handleResponse(response);
  },

  /**
   * Fetches a single bazaar item by its ID.
   * Corresponds to: GET /api/bazaar/items/{itemId}
   * @param {number} itemId - The ID of the item to fetch.
   * @returns {Promise<BazaarItem>} A promise that resolves to a single bazaar item object.
   */
  getItemById: async (itemId: number): Promise<BazaarItem> => {
    const response = await fetch(`${API_BASE_URL}/api/bazaar/items/${itemId}`);
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
  createItem: async (itemData: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    file?: File;
  }): Promise<string> => {
    const formData = new FormData();
    formData.append('name', itemData.name);
    formData.append('description', itemData.description || '');
    formData.append('price', itemData.price.toString());
    formData.append('stock', itemData.stock.toString());

    if (itemData.file) {
      formData.append('file', itemData.file);
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/additem`, {
      method: "POST",
      headers: getAuthHeadersForFormData() as HeadersInit,
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
  updateItem: async (itemData: {
    itemId: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    file?: File;
  }): Promise<string> => {
    const formData = new FormData();
    formData.append('itemId', itemData.itemId.toString());
    formData.append('name', itemData.name);
    formData.append('description', itemData.description || '');
    formData.append('price', itemData.price.toString());
    formData.append('stock', itemData.stock.toString());

    if (itemData.file) {
      formData.append('file', itemData.file);
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/updateitem`, {
      method: "POST", // Backend uses POST for this endpoint
      headers: getAuthHeadersForFormData() as HeadersInit,
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
  deleteItem: async (itemId: number): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/deleteitem/${itemId}`, {
      method: "DELETE",
      headers: getAuthHeaders() as HeadersInit,
    });
    return handleTextResponse(response);
  },
  
  /**
   * Gets a list of all user orders for the admin panel.
   * Corresponds to: GET /api/admin/bazaar/orders
   * @returns {Promise<Array<object>>} A promise that resolves to an array of all order objects.
   */
  getAllOrders: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/bazaar/orders`, {
      method: "GET",
      headers: getAuthHeaders() as HeadersInit,
    });
    return handleResponse(response);
  }
}; 