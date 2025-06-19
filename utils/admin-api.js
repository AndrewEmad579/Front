import { handleResponse } from "./apiHelpers";

// BEST PRACTICE: Define the base URL without "/api". We add the full path in each call.
const API_BASE_URL = "https://03c8-105-207-159-205.ngrok-free.app";

// --- ADMIN-SPECIFIC API CALLS ---

export const adminAPI = {
  /**
   * Registers a new administrator.
   * NOTE: Your backend has this as an open endpoint. In a real-world scenario,
   * this should be protected or used only for initial setup.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  register: async (username, email, password) => {
    // CORRECTED: The full fetch options object is required.
    const response = await fetch(`${API_BASE_URL}/api/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    // CORRECTED: Await the JSON response and handle errors.
    return handleResponse(response);
  },

  /**
   * Logs in an administrator. This is the same as the adminSignIn function
   * we created earlier, but consolidated here.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string}>}
   */
  login: async (email, password) => {
    // CORRECTED: Fixed variable name and added full fetch options.
    const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // --- A NOTE ON LOGOUT ---
  // There is no specific admin logout function.
  // The logout process is the same for both users and admins.
  // You should reuse the `signOut` function from your `authAPI.js` file.
  // Example:
  // import { authAPI } from './authAPI';
  //
  // const handleAdminLogout = () => {
  //   authAPI.signOut()
  //     .then(() => {
  //       localStorage.removeItem('auth_token');
  //       // redirect to login page
  //     })
  //     .catch(error => console.error(error));
  // };
};