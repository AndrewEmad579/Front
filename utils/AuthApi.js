import { getAuthHeaders, handleResponse, handleTextResponse } from "./apiHelpers"; // Assuming helpers are in the same folder

const API_BASE_URL = "https://03c8-105-207-159-205.ngrok-free.app"; // Replace with your actual API URL

// Helper function to get headers with ngrok bypass
const getNgrokHeaders = () => ({
  'ngrok-skip-browser-warning': '69420',
  'Content-Type': 'application/json',
});

export const authAPI = {
  /**
   * Logs in a regular user.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, role: string}>}
   */
  signIn: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
      method: "POST",
      headers: getNgrokHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  /**
   * Registers a new regular user.
   * @param {string} username - The user's desired name.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<string>} A promise that resolves to the success message from the server.
   */
  signUp: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
      method: "POST",
      headers: getNgrokHeaders(),
      body: JSON.stringify({ username, email, password }),
    });
    // The backend for this endpoint returns a 201 with a simple text message
    return handleTextResponse(response);
  },

  /**
   * Logs in an administrator via the dedicated admin endpoint.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string}>}
   */
  adminSignIn: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: getNgrokHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },
  
  /**
   * Registers a new administrator.
   * NOTE: This endpoint on your backend is unprotected. Use with caution.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} A promise that resolves to the success message object.
   */
  adminRegister: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/register`, {
      method: "POST",
      headers: getNgrokHeaders(),
      body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response);
  },

  /**
   * Sends the Google ID Token to the backend for validation and login/registration.
   * @param {string} credential - The Google OAuth credential received from a Google OAuth library on the frontend.
   * @returns {Promise<{token: string, role: string}>}
   */
  signInWithGoogle: async (credential) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Auth/google-login`, {
        method: "POST",
        headers: getNgrokHeaders(),
        body: JSON.stringify({ credential: credential.toString() }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Google sign in error:", error);
      throw new Error("Failed to sign in with Google. Please try again.");
    }
  },

  /**
   * Logs out the currently authenticated user or admin.
   * Requires a valid token to be in localStorage.
   * @returns {Promise<object>} A promise that resolves to the success message object.
   */
  signOut: async () => {
    const response = await fetch(`${API_BASE_URL}/api/Logout`, {
      method: "POST",
      headers: { ...getAuthHeaders(), ...getNgrokHeaders() },
    });
    return handleResponse(response);
  },
};