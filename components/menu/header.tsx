import { Coffee } from "lucide-react";
import { Logo } from "@/components/logo";

export function MenuHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground sm:text-3xl">
          <Logo />
        </h1>
        <Coffee
          className="h-7 w-7 text-amber-700 sm:h-8 sm:w-8"
          strokeWidth={1.5}
        />
      </div>
    </header>
  );
}
