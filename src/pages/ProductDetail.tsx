import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Star, ArrowLeft, MessageCircle } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/shop" className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-foreground truncate">
          {product.name}
        </h1>
      </header>

      <div className="bg-card">
        <img
          src={product.image_url}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover animate-fade-in"
        />
      </div>

      <div className="px-4 py-5 space-y-5 animate-fade-up">
        <div>
          {product.is_new && (
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
            {product.original_price && (
              <span className="text-base text-muted-foreground line-through">
                ₹{product.original_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <div>
          <p className="text-sm font-medium text-foreground mb-2">Available in</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <span
                key={color}
                className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        <a
          href="https://ig.me/m/_selah_jewelry_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="h-4 w-4" />
          DM Us to Order
        </a>
      </div>
    </div>
  );
};

export default ProductDetail;
