"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

interface GoogleAuthProviderProps {
  clientId: string;
  children: React.ReactNode;
}

export function GoogleAuthProvider({ clientId, children }: GoogleAuthProviderProps) {
  return (
    <GoogleOAuthProvider 
      clientId={clientId}
      onScriptLoadError={(err) => {
        console.error('Google OAuth Script failed to load:', err);
      }}
    >
      {children}
    </GoogleOAuthProvider>
  );
} 