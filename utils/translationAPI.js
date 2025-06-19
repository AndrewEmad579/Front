// REPLACE WITH THIS
import { getAuthHeadersForFormData, handleResponse } from "./apiHelpers";
const API_BASE_URL = "https://4285-197-49-220-162.ngrok-free.app";

export const translationAPI = {
  /**
   * Sends an image file to the backend for translation processing.
   * @param {File} file The image file to translate.
   * @param {string} direction The direction string (e.g., 'left').
   * @returns {Promise<any>} A promise that resolves to the full JSON response from the Python API.
   */
  translateImage: async (file, direction) => {
    const formData = new FormData();
    formData.append('File', file); // 'File' must match the C# property name
    formData.append('Direction', direction); // 'Direction' must match the C# property name

    const response = await fetch(`${API_BASE_URL}/api/Translation/translate-image`, {
      method: "POST",
      // This endpoint is public (AllowAnonymous), so no auth headers are needed.
      // We also don't set 'Content-Type' for FormData.
      body: formData,
    });
    
    // Your Python API returns JSON, so we use the standard handleResponse
    return handleResponse(response);
  },
};