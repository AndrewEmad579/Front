import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import TabBar from "@/components/tab-bar";
import { Providers } from "@/components/providers";
import { AuthGuard } from "@/components/auth-guard";
import { GoogleAuthProvider } from "@/components/google-oauth-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "AEGYPTUS",
  description: "Ancient Egypt Reimagined for the Modern World.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('Google Client ID is not defined in environment variables');
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans bg-background antialiased`}
      >
        <GoogleAuthProvider clientId={clientId!}>
          <Providers>
            <AuthGuard>
              <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                <main className="flex-1 py-4 sm:py-8 md:py-12">{children}</main>
                <TabBar />
              </div>
            </AuthGuard>
          </Providers>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
