import { SearchBar } from "@/components/menu/search-bar";
import { FeaturedItems } from "@/components/menu/featured-items";
import { CategoryIcons } from "@/components/menu/category-icons";

export default function MenuPage() {
  return (
    <div className="space-y-6 py-4">
      <SearchBar />
      <FeaturedItems />
      <CategoryIcons />
    </div>
  );
}
