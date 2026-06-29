import coat from "@/assets/p-coat.jpg";
import dress from "@/assets/p-dress.jpg";
import tee from "@/assets/p-tee.jpg";
import trousers from "@/assets/p-trousers.jpg";
import bag from "@/assets/p-bag.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import knit from "@/assets/p-knit.jpg";
import jeans from "@/assets/p-jeans.jpg";

export type Category = "women" | "men" | "accessories" | "shoes";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  tags: string[];
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "atelier-trench",
    name: "Atelier Wool Coat",
    price: 489,
    image: coat,
    category: "women",
    tags: ["outerwear", "wool"],
    description:
      "An oversized double-faced wool coat cut in Italy. Drop shoulders, horn buttons, deep welt pockets — designed to layer over tailoring or denim with equal ease.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Camel", "Charcoal"],
    rating: 4.9,
    reviewCount: 184,
    featured: true,
    bestSeller: true,
  },
  {
    id: "noir-slip-dress",
    name: "Noir Silk Slip Dress",
    price: 285,
    image: dress,
    category: "women",
    tags: ["evening", "silk"],
    description:
      "A bias-cut slip in 19mm sandwashed silk. A quiet, weightless dress that catches light at every turn.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Champagne"],
    rating: 4.8,
    reviewCount: 96,
    featured: true,
  },
  {
    id: "essential-tee",
    name: "Essential Heavyweight Tee",
    price: 68,
    image: tee,
    category: "women",
    tags: ["basics", "cotton"],
    description:
      "Boxy, weighty, perfect. Knit from long-staple Egyptian cotton at 240gsm and garment-washed for an immediate broken-in feel.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Sand", "Stone"],
    rating: 4.7,
    reviewCount: 421,
    bestSeller: true,
    newArrival: true,
  },
  {
    id: "pleated-trouser",
    name: "Pleated Wool Trouser",
    price: 245,
    image: trousers,
    category: "men",
    tags: ["tailoring", "wool"],
    description:
      "High-rise, wide leg, with a single pleat that holds shape through the day. Cut from a Japanese stretch wool.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "Chocolate", "Olive"],
    rating: 4.8,
    reviewCount: 152,
    featured: true,
  },
  {
    id: "minor-crossbody",
    name: "Minor Crossbody",
    price: 320,
    image: bag,
    category: "accessories",
    tags: ["leather"],
    description:
      "A compact crossbody in full-grain Tuscan leather. Unlined, deliberately, so it softens with you.",
    sizes: ["One size"],
    colors: ["Cognac", "Black", "Ivory"],
    rating: 4.9,
    reviewCount: 268,
    featured: true,
    bestSeller: true,
  },
  {
    id: "low-court",
    name: "Low Court Sneaker",
    price: 195,
    image: sneakers,
    category: "shoes",
    tags: ["sneaker", "leather"],
    description:
      "A clean court silhouette in vegetable-tanned leather. Cup-sole construction, leather lining, no logos.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Bone"],
    rating: 4.7,
    reviewCount: 312,
    bestSeller: true,
  },
  {
    id: "cashmere-knit",
    name: "Brushed Cashmere Knit",
    price: 295,
    image: knit,
    category: "women",
    tags: ["knitwear", "cashmere"],
    description:
      "Hand-loomed Inner Mongolian cashmere, brushed to a soft halo. A piece you'll reach for first.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Oat", "Stone", "Black"],
    rating: 4.9,
    reviewCount: 207,
    newArrival: true,
  },
  {
    id: "selvedge-jean",
    name: "Selvedge Straight Jean",
    price: 178,
    image: jeans,
    category: "men",
    tags: ["denim"],
    description:
      "14oz Japanese selvedge denim with a clean straight leg. Built to fade with you.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Indigo", "Washed"],
    rating: 4.8,
    reviewCount: 174,
    newArrival: true,
  },
];

export const categories = [
  { slug: "women" as const, name: "Women", count: products.filter(p => p.category === "women").length },
  { slug: "men" as const, name: "Men", count: products.filter(p => p.category === "men").length },
  { slug: "shoes" as const, name: "Shoes", count: products.filter(p => p.category === "shoes").length },
  { slug: "accessories" as const, name: "Accessories", count: products.filter(p => p.category === "accessories").length },
];

export const getProduct = (id: string) => products.find(p => p.id === id);

export interface Review {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export const reviews: Review[] = [
  {
    name: "Élise M.",
    location: "Paris, FR",
    rating: 5,
    title: "Quietly extraordinary.",
    body: "The coat feels like it was tailored to me. Three months in, the wool has only gotten better — I've had it complimented at every dinner.",
    date: "Mar 2026",
  },
  {
    name: "Daniel K.",
    location: "Brooklyn, NY",
    rating: 5,
    title: "First trousers that actually fit.",
    body: "The pleated wool trouser drapes properly without looking costume-y. I bought two more in different colors the same week.",
    date: "Feb 2026",
  },
  {
    name: "Mira A.",
    location: "Copenhagen, DK",
    rating: 5,
    title: "Worth every euro.",
    body: "The cashmere is genuinely soft — not the scratchy 'cashmere blend' you get elsewhere at this price. Packaging is beautiful too.",
    date: "Jan 2026",
  },
];
