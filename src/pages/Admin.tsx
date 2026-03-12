import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProducts, DbProduct } from "@/hooks/useProducts";
import { ArrowLeft, Plus, Pencil, Trash2, X, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ADMIN_PASSWORD = "selah2024";

const emptyForm = {
  name: "",
  price: "",
  original_price: "",
  image_url: "",
  category: "Earrings",
  subcategory: "",
  rating: "4.5",
  reviews: "0",
  description: "",
  is_new: false,
  colors: "Gold",
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { products, loading } = useProducts();
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast.error("Wrong password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="text-center">
            <Lock className="mx-auto h-10 w-10 text-gold" />
            <h1 className="mt-3 font-serif text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter password to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: DbProduct) => {
    setEditing(p);
    setForm({
      name: p.name,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : "",
      image_url: p.image_url,
      category: p.category,
      subcategory: p.subcategory,
      rating: String(p.rating),
      reviews: String(p.reviews),
      description: p.description,
      is_new: p.is_new,
      colors: p.colors.join(", "),
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: parseInt(form.price),
      original_price: form.original_price ? parseInt(form.original_price) : null,
      image_url: form.image_url,
      category: form.category,
      subcategory: form.subcategory,
      rating: parseFloat(form.rating),
      reviews: parseInt(form.reviews),
      description: form.description,
      is_new: form.is_new,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
    };

    if (editing) {
      const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
      if (error) { toast.error("Update failed"); return; }
      toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast.error("Add failed"); return; }
      toast.success("Product added");
    }
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else toast.success("Product deleted");
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/" className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-foreground">Admin Panel</h1>
        <button
          onClick={openAdd}
          className="ml-auto flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary-foreground active:scale-95 transition-transform"
        >
          <Plus className="h-3.5 w-3.5" /> Add Product
        </button>
      </header>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 pt-16 px-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md rounded-xl bg-background p-5 space-y-3 mb-10"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-foreground">
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <input
              required
              placeholder="Product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
              <input
                type="number"
                placeholder="Original price (optional)"
                value={form.original_price}
                onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <input
              required
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
              >
                <option>Earrings</option>
                <option>Necklaces</option>
                <option>Bracelets</option>
                <option>Rings</option>
              </select>
              <input
                required
                placeholder="Subcategory"
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
              <input
                type="number"
                placeholder="Reviews count"
                value={form.reviews}
                onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <textarea
              required
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none resize-none"
            />
            <input
              placeholder="Colors (comma separated, e.g. Gold, Silver)"
              value={form.colors}
              onChange={(e) => setForm({ ...form, colors: e.target.value })}
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.is_new}
                onChange={(e) => setForm({ ...form, is_new: e.target.checked })}
                className="accent-gold"
              />
              Mark as New Arrival
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform"
            >
              {editing ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl bg-card p-3 border border-border">
              <img
                src={p.image_url}
                alt={p.name}
                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">{p.name}</h3>
                <p className="text-xs text-muted-foreground">
                  ₹{p.price.toLocaleString()} · {p.category}
                  {p.is_new && <span className="ml-1 text-gold">· New</span>}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="rounded-full p-2 text-muted-foreground hover:text-gold hover:bg-secondary transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-full p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No products yet. Add your first one!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
