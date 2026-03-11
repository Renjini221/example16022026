import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/" className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-foreground">
          Cart ({items.length})
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4 animate-fade-in">
          <ShoppingBag className="h-16 w-16 text-border" />
          <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover our beautiful collection
          </p>
          <Link
            to="/shop"
            className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground active:scale-95 transition-transform"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="px-4 py-4 space-y-4">
            {items.map((item, i) => (
              <div
                key={`${item.product.id}-${item.color}`}
                className="flex gap-3 rounded-xl bg-card p-3 animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
              >
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-20 rounded-lg object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground leading-tight">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.color}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-foreground">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => {
                          removeFromCart(item.product.id);
                          toast.info("Item removed from cart");
                        }}
                        className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Bar */}
          <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-serif text-lg font-bold text-foreground">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <a
              href="https://ig.me/m/_selah_jewelry_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform"
            >
              Order via Instagram DM
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
