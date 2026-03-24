"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, ClipboardList, Gift, User } from "lucide-react";

const tabs = [
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Orders", href: "/menu/orders", icon: ClipboardList },
  { label: "Rewards", href: "/menu/rewards", icon: Gift },
  { label: "Profile", href: "/menu/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/menu"
              ? pathname === "/menu"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
