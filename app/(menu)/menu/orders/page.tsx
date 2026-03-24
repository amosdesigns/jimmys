import { ClipboardList } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <ClipboardList className="h-12 w-12 text-muted-foreground" />
      <h1 className="text-xl font-semibold">Your Orders</h1>
      <p className="text-sm text-muted-foreground">
        Order tracking coming soon.
      </p>
    </div>
  );
}
