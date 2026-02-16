import { ArrowLeft, User, Heart, Package, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Heart, label: "Wishlist", desc: "Your saved items" },
  { icon: Package, label: "Orders", desc: "Track your orders" },
  { icon: Settings, label: "Settings", desc: "Account preferences" },
  { icon: HelpCircle, label: "Help & Support", desc: "Get assistance" },
];

const Profile = () => {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/" className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-foreground">Profile</h1>
      </header>

      {/* Avatar */}
      <div className="flex flex-col items-center py-8 animate-fade-up">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-3 font-serif text-lg font-semibold text-foreground">Guest User</h2>
        <p className="text-sm text-muted-foreground">Sign in for a personalized experience</p>
        <button className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground active:scale-95 transition-transform">
          Sign In
        </button>
      </div>

      {/* Menu */}
      <div className="px-4 space-y-2">
        {menuItems.map(({ icon: Icon, label, desc }, i) => (
          <button
            key={label}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors active:bg-secondary animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
