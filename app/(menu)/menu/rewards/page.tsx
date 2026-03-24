import { Gift } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <Gift className="h-12 w-12 text-muted-foreground" />
      <h1 className="text-xl font-semibold">Rewards</h1>
      <p className="text-sm text-muted-foreground">
        Loyalty rewards coming soon.
      </p>
    </div>
  );
}
