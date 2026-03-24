import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="px-4 sm:px-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search menu..."
          className="pl-9 rounded-full bg-muted border-transparent focus-visible:border-primary"
        />
      </div>
    </div>
  );
}
