"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/utils/AuthApi";
import { userAPI } from "@/utils/userAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { role: string; username?: string; email?: string; imageUrl?: string } | null; // Changed role type to string
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: (credential: string) => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>; // Add fetchUser function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ role: string; username?: string; email?: string; imageUrl?: string } | null>(null);

  const fetchUser = async (): Promise<void> => {
    try {
      console.log("Fetching user profile in auth context...");
      const profileData = await userAPI.getProfile() as { 
        username: string; 
        email: string; 
        userRole: string;
      };
      console.log("Profile data received:", profileData);
      setUser({
        role: profileData.userRole || localStorage.getItem("user_role") || "User",
        username: profileData.username,
        email: profileData.email,
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // On error, try to use cached role from localStorage
      const role = localStorage.getItem("user_role");
      if (role) {
        setUser({ role });
      }
    }
  };

  useEffect(() => {
    // This effect runs once when the app loads to persist login state.
    try {
      const token = localStorage.getItem("auth_token");
      const role = localStorage.getItem("user_role"); // We saved this from the login response
      if (token) {
        // Fetch the full user profile
        fetchUser();
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to initialize auth state:", error);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_role");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authAPI.signIn(email, password);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_role", response.role);
      setUser({ role: response.role as string });
      setIsAuthenticated(true);
      // Fetch the full user profile after successful sign-in
      await fetchUser();
      // No return statement needed on success
    } catch (error) {
      throw error; // Re-throw for the component
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (username: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await authAPI.signUp(username, email, password);
      // No return statement needed on success
    } catch (error) {
      throw error; // Re-throw for the component
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (credential: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authAPI.signInWithGoogle(credential);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_role", response.role);
      setUser({ role: response.role as string });
      setIsAuthenticated(true);
      // Fetch the full user profile after successful sign-in
      await fetchUser();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async (): Promise<void> => {
    // This function is designed to always fail, so we just throw the error.
    throw new Error("Apple Sign In is not implemented.");
  };

  const signOut = async (): Promise<void> => {
    try {
      await authAPI.signOut();
    } catch (error) {
      console.error("Sign out API failed, but logging out locally anyway.", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_role");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithApple,
        signOut,
        fetchUser, // Add fetchUser to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
