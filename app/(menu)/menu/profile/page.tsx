import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <User className="h-12 w-12 text-muted-foreground" />
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="text-sm text-muted-foreground">
        Customer profiles coming soon.
      </p>
    </div>
  );
}
