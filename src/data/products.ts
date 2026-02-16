import productStuds from "@/assets/product-studs.jpg";
import productHoops from "@/assets/product-hoops.jpg";
import productDrops from "@/assets/product-drops.jpg";
import productNecklaceMinimal from "@/assets/product-necklace-minimal.jpg";
import productNecklaceLayered from "@/assets/product-necklace-layered.jpg";
import productNecklaceStatement from "@/assets/product-necklace-statement.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  description: string;
  isNew?: boolean;
  colors: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aurora Stud Earrings",
    price: 2450,
    originalPrice: 3060,
    image: productStuds,
    category: "Earrings",
    subcategory: "Studs",
    rating: 4.8,
    reviews: 124,
    description: "Delicate ruby-set gold studs that catch the light with every movement. Handcrafted in 18K gold with ethically sourced gemstones.",
    isNew: true,
    colors: ["Gold", "Silver"],
  },
  {
    id: "2",
    name: "Celestial Hoop Earrings",
    price: 3200,
    image: productHoops,
    category: "Earrings",
    subcategory: "Hoops",
    rating: 4.9,
    reviews: 89,
    description: "Crystal-encrusted gold hoops that add elegance to any outfit. Each stone is hand-set for maximum brilliance.",
    colors: ["Gold", "Silver"],
  },
  {
    id: "3",
    name: "Pearl Drop Earrings",
    price: 2800,
    image: productDrops,
    category: "Earrings",
    subcategory: "Drops",
    rating: 4.7,
    reviews: 156,
    description: "Graceful drop earrings featuring freshwater pearls on a delicate gold chain. A timeless addition to your collection.",
    isNew: true,
    colors: ["Gold", "Silver"],
  },
  {
    id: "4",
    name: "Whisper Chain Necklace",
    price: 1950,
    image: productNecklaceMinimal,
    category: "Necklaces",
    subcategory: "Minimal",
    rating: 4.6,
    reviews: 203,
    description: "An ultra-fine gold chain with a teardrop pendant. So light you'll forget you're wearing it — until someone compliments you.",
    colors: ["Gold", "Silver"],
  },
  {
    id: "5",
    name: "Luna Layered Necklace",
    price: 4500,
    originalPrice: 5625,
    image: productNecklaceLayered,
    category: "Necklaces",
    subcategory: "Layered",
    rating: 4.9,
    reviews: 67,
    description: "Five delicate gold chains of varying lengths, designed to be worn together for an effortlessly layered look.",
    isNew: true,
    colors: ["Gold"],
  },
  {
    id: "6",
    name: "Empress Statement Necklace",
    price: 6800,
    image: productNecklaceStatement,
    category: "Necklaces",
    subcategory: "Statement",
    rating: 5.0,
    reviews: 42,
    description: "A bold geometric masterpiece in 22K gold. This statement piece transforms any outfit into an event.",
    colors: ["Gold"],
  },
];
