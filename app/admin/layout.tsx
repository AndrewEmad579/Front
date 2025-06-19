// app/admin/layout.tsx

// 1. Import your provider
import { AdminProvider } from "@/contexts/admin-context"; 

// This is a standard layout component in Next.js
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Wrap the children with the provider
    <AdminProvider>
      {/* The rest of your layout can go here, or just the children */}
      {children}
    </AdminProvider>
  );
} 