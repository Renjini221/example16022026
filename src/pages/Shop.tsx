import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Earrings", "Necklaces", "New Arrivals"];
const subcategories: Record<string, string[]> = {
  Earrings: ["All", "Studs", "Hoops", "Drops"],
  Necklaces: ["All", "Minimal", "Layered", "Statement"],
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeSub, setActiveSub] = useState("All");

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory === "New Arrivals") {
      result = result.filter((p) => p.isNew);
    } else if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeSub !== "All") {
      result = result.filter((p) => p.subcategory === activeSub);
    }
    return result;
  }, [activeCategory, activeSub]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/" className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-foreground">Shop</h1>
      </header>

      {/* Categories */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSub("All");
              }}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gold text-primary-foreground"
                  : "border border-border bg-card text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {subcategories[activeCategory] && (
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {subcategories[activeCategory].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeSub === sub
                    ? "bg-secondary text-gold"
                    : "text-muted-foreground"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products */}
      <div className="px-4 py-4 grid grid-cols-2 gap-4">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
