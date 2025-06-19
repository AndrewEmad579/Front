import { getAuthHeaders, handleResponse } from "./apiHelpers"; // Use your existing helpers

const API_BASE_URL = "https://4285-197-49-220-162.ngrok-free.app"; // Replace with your actual API URL

// Helper function to get headers with ngrok bypass
const getNgrokHeaders = () => ({
  'ngrok-skip-browser-warning': '69420'
});

// Helper function to merge ngrok headers with auth headers
const getAuthHeadersWithNgrok = () => ({
  ...getAuthHeaders(),
  ...getNgrokHeaders()
});

export const userAPI = {
  /**
   * Fetches the profile information for the currently logged-in user.
   * Corresponds to: GET /api/user/profile
   * @returns {Promise<object>} A promise that resolves to the user's profile data { username, email, user_role, image_url }.
   */
  getProfile: async () => {
    try {
      console.log("Fetching user profile...");
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "GET",
        headers: getAuthHeadersWithNgrok(),
      });
      console.log("Profile response:", response);
      const data = await handleResponse(response);
      console.log("Profile data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  /**
   * Updates the username for the currently logged-in user.
   * Corresponds to: PUT /api/user/profile
   * @param {string} newUsername - The new username for the user.
   * @returns {Promise<object>} A promise that resolves to the success message object.
   */
  updateProfile: async (newUsername) => {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "PUT",
      headers: getAuthHeadersWithNgrok(),
      body: JSON.stringify({ username: newUsername }),
    });
    return handleResponse(response);
  },

  /**
   * Changes the password for the currently logged-in user.
   * Corresponds to: POST /api/user/changepassword
   * @param {string} currentPassword - The user's current password.
   * @param {string} newPassword - The new password to set.
   * @returns {Promise<object>} A promise that resolves to the success message object.
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/api/user/changepassword`, {
      method: "POST",
      headers: getAuthHeadersWithNgrok(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },

  /**
   * Deletes the account of the currently logged-in user.
   * Corresponds to: DELETE /api/user/deleteaccount
   * @param {string} password - The user's password for confirmation.
   * @returns {Promise<object>} A promise that resolves to the success message object.
   */
  deleteAccount: async (password) => {
    console.log("entered");
    const response = await fetch(`${API_BASE_URL}/api/user/deleteaccount`, {
      method: "DELETE",
      headers: getAuthHeadersWithNgrok(),
      body: JSON.stringify({ password }),
    });

    console.log(response);
    return handleResponse(response);
  },
};