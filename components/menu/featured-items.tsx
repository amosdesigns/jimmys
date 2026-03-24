import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Plus } from "lucide-react";

interface FeaturedItem {
  name: string;
  description: string;
  price: string;
}

const items: FeaturedItem[] = [
  {
    name: "Ultimate Breakfast Burrito",
    description: "Short on breakfast with ultimate breakfast burrito",
    price: "$12.99",
  },
  {
    name: "Grilled Chicken Sandwich",
    description: "Grilled chicken sandwich with chicken, and and burrito",
    price: "$14.50",
  },
  {
    name: "Classic Pancakes",
    description: "Fluffy buttermilk pancakes with maple syrup",
    price: "$9.99",
  },
  {
    name: "Cafe Latte",
    description: "Espresso with steamed whole milk and light foam",
    price: "$5.50",
  },
];

export function FeaturedItems() {
  return (
    <section className="space-y-3 px-4 sm:px-6">
      <h2 className="text-lg font-semibold">Featured Items</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-x-visible sm:pb-0 lg:grid-cols-4">
        {items.map((product) => (
          <Card
            key={product.name}
            className="min-w-[160px] shrink-0 snap-start overflow-hidden border-border p-0 sm:min-w-0"
          >
            <div className="h-28 bg-muted flex items-center justify-center sm:h-36">
              <Coffee className="h-10 w-10 text-muted-foreground sm:h-12 sm:w-12" />
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-semibold leading-tight line-clamp-1">
                {product.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-base font-bold">{product.price}</p>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:opacity-90"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
