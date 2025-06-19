"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Languages, ShoppingBag, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const tabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/translate", icon: Languages, label: "Translate" },
  { href: "/bazaar", icon: ShoppingBag, label: "Bazaar" },
  { href: "/sites", icon: Map, label: "Sites" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function TabBar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Don't show tab bar on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 md:top-0 md:bottom-auto left-1/2 md:left-0 transform md:transform-none -translate-x-1/2 md:translate-x-0 w-full max-w-md md:max-w-full bg-background/95 backdrop-blur-sm border-t md:border-b md:border-t-0 border-border z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-[#FFD700] bg-[#FFD700]/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
