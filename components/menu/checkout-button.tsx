"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutButton() {
  return (
    <div className="fixed bottom-16 right-4 z-50 pb-[env(safe-area-inset-bottom)]">
      <Button
        size="lg"
        className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-lg"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Checkout
      </Button>
    </div>
  );
}
