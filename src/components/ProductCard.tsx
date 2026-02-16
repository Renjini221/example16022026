import { Star, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0]);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="relative overflow-hidden rounded-lg bg-card">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute right-2 top-2 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-sans text-sm font-medium text-foreground leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-base font-semibold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-primary-foreground transition-transform active:scale-90"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
