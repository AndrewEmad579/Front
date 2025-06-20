import { handleResponse, getAuthHeadersForFormData } from "./apiHelpers"; // Import the helper

const API_BASE_URL = "https://c074-197-49-220-162.ngrok-free.app"; // Replace with your actual API URL

export const photoAPI = {
  /**
   * Uploads a photo for the currently logged-in user.
   * Corresponds to: POST /api/Photo/upload
   * @param {File} file - The image file object from an <input type="file"> element.
   * @returns {Promise<{filePath: string}>} A promise that resolves to an object containing the server path to the newly uploaded image.
   */
  uploadPhoto: async (file) => {
    // 1. Create a FormData object to hold the file.
    // This is necessary for sending files.
    const formData = new FormData();
    formData.append('file', file); // The key 'file' must match the parameter name in your C# controller.

    // 2. Make the fetch request.
    const response = await fetch(`${API_BASE_URL}/api/Photo/upload`, {
      method: 'POST',
      headers: getAuthHeadersForFormData(), // <-- Use the helper
      body: formData, // The body is the FormData object itself
    });

    // 3. Handle the JSON response from the server.
    return handleResponse(response);
  },
};