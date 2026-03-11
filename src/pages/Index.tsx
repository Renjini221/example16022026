import { Link } from "react-router-dom";
import { Star, ArrowRight, Mail } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-model.jpg";
import offerBanner from "@/assets/offer-banner.jpg";
import { useState } from "react";
import { toast } from "sonner";

const reviews = [
  { name: "Priya S.", text: "The quality is exceptional. My Selah layered necklace gets compliments every single day!", rating: 5 },
  { name: "Ananya M.", text: "Beautiful packaging and fast delivery. The earrings are even prettier in person.", rating: 5 },
  { name: "Riya K.", text: "I've been wearing my pearl drops daily for 3 months — still looks brand new. Worth every penny.", rating: 4 },
];

const Index = () => {
  const [email, setEmail] = useState("");
  const featured = products.slice(0, 4);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the Selah family! ✨");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-center border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground">
          Luna <span className="text-gold">Ornaments</span>
        </h1>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Model wearing Luna Ornaments jewellery"
          className="h-[70vh] w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">New Collection</p>
          <h2 className="mt-1 font-serif text-3xl font-bold leading-tight text-foreground">
            Elegance,<br />Redefined
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Handcrafted jewellery for the modern woman
          </p>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-8">
        <h2 className="font-serif text-xl font-semibold text-foreground">Shop by Category</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {["Earrings", "Necklaces", "New Arrivals"].map((cat) => (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className="flex-shrink-0 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold active:scale-95"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-foreground">Featured</h2>
          <Link to="/shop" className="text-sm font-medium text-gold">
            View All
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="px-4 pb-8">
        <div className="relative overflow-hidden rounded-xl">
          <img src={offerBanner} alt="Special offer" className="h-44 w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Limited Time
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-background">
              Flat 20% Off
            </h3>
            <p className="mt-1 text-sm text-background/80">On all earrings this week</p>
            <Link
              to="/shop?category=Earrings"
              className="mt-3 rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground active:scale-95 transition-transform"
            >
              Shop Earrings
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-card px-4 py-8">
        <h2 className="font-serif text-xl font-semibold text-foreground text-center">
          What Our Customers Say
        </h2>
        <div className="mt-6 space-y-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-xl bg-background p-4 animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">"{review.text}"</p>
              <p className="mt-2 text-xs font-medium text-muted-foreground">— {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-10 text-center">
        <Mail className="mx-auto h-8 w-8 text-gold" />
        <h2 className="mt-3 font-serif text-xl font-semibold text-foreground">
          Join the Luna Family
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Get early access to new drops & exclusive offers
        </p>
        <form onSubmit={handleNewsletter} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground active:scale-95 transition-transform"
          >
            Join
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6 text-center">
        <p className="font-serif text-sm text-foreground">
          Luna <span className="text-gold">Ornaments</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Handcrafted with love in India
        </p>
      </footer>
    </div>
  );
};

export default Index;
