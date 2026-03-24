import { Coffee, UtensilsCrossed, Salad, Beer, Star } from "lucide-react";

const categories = [
  { label: "Breakfast", icon: Coffee, color: "text-amber-700" },
  { label: "Lunch", icon: UtensilsCrossed, color: "text-green-700" },
  { label: "Sides", icon: Salad, color: "text-orange-600" },
  { label: "Drinks", icon: Beer, color: "text-blue-700" },
  { label: "Daily Specials", icon: Star, color: "text-yellow-600" },
];

export function CategoryIcons() {
  return (
    <section className="space-y-3 px-4 sm:px-6">
      <h2 className="text-lg font-semibold">Explore Categories</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:gap-6 sm:overflow-x-visible sm:pb-0">
        {categories.map((cat) => (
          <button
            key={cat.label}
            type="button"
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <cat.icon className={`h-6 w-6 ${cat.color}`} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium text-center">{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
