import { MenuHeader } from "@/components/menu/header";
import { BottomNav } from "@/components/menu/bottom-nav";
import { CheckoutButton } from "@/components/menu/checkout-button";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MenuHeader />
      <main className="flex-1 overflow-y-auto pb-24">{children}</main>
      <CheckoutButton />
      <BottomNav />
    </div>
  );
}
