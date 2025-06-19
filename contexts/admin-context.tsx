"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { adminAPI } from "@/utils/admin-api";
import { authAPI } from "@/utils/AuthApi";

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  admin: any | null;
  adminLogin: (
    email: string,
    password: string
  ) => Promise<void>;
  adminRegister: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  adminLogout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<any | null>(null);

  useEffect(() => {
    // This effect runs once when the app loads.
    // It checks for a token in localStorage to persist the login state.
    try {
      const adminToken = localStorage.getItem("admin_token");
      if (adminToken) {
        // For a more robust app, you would decode the token here
        // to get user info and check the expiry date.
        // For now, we'll just set the authenticated state.
        // We'll assume the role is "Admin" if an admin_token exists.
        setAdmin({ role: "Admin" }); // Set a placeholder admin object
        setIsAdminAuthenticated(true);
      }
    } catch (error) {
      // If there's an error (e.g., parsing a malformed token), clear it.
      localStorage.removeItem("admin_token");
      setIsAdminAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await adminAPI.login(email, password);
      // Your backend's admin login returns a token, but not user info
      localStorage.setItem("admin_token", response.token);
      setAdmin({ role: "Admin" }); // Set a placeholder admin object
      setIsAdminAuthenticated(true);
    } catch (error) {
      // If adminAPI.login fails, it will throw an error.
      // We simply re-throw it here so the component can catch it.
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const adminRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      // The admin register API just returns a success message.
      await adminAPI.register(username, email, password);
      // We do NOT log the user in or set a token.
      // The function simply completes successfully.
    } catch (error) {
      // Re-throw the error for the component to catch and display.
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogout = async () => {
    try {
      // Call the universal sign out endpoint
      await authAPI.signOut();
    } finally {
      // This part should run even if the API call fails,
      // to ensure the user is logged out on the frontend.
      localStorage.removeItem("admin_token");
      setAdmin(null);
      setIsAdminAuthenticated(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        isLoading,
        admin,
        adminLogin,
        adminRegister,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
