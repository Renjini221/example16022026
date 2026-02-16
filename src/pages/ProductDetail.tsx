import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Star, ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "Gold");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/shop" className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-foreground truncate">
          {product.name}
        </h1>
      </header>

      {/* Image */}
      <div className="bg-card">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover animate-fade-in"
        />
      </div>

      {/* Details */}
      <div className="px-4 py-5 space-y-5 animate-fade-up">
        {/* Title & Price */}
        <div>
          {product.isNew && (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              New Arrival
            </span>
          )}
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">{product.name}</h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-gold text-gold"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        {/* Color Selector */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Material</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                  selectedColor === color
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-foreground"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Quantity</p>
          <div className="inline-flex items-center gap-4 rounded-full border border-border px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground active:bg-secondary"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground active:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Add to Cart */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart — ₹{(product.price * quantity).toLocaleString()}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
