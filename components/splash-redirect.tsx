"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

export function SplashCta() {
  return (
    <Link
      href="/menu"
      className={cn(
        buttonVariants({ size: "lg" }),
        "mt-8 gap-2 rounded-full px-8 text-lg",
      )}
    >
      <UtensilsCrossed className="h-5 w-5" />
      Let&apos;s Eat!
    </Link>
  );
}
