import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categories, products } from "@/lib/products";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catShoes from "@/assets/cat-shoes.jpg";
import catAcc from "@/assets/cat-accessories.jpg";

const images: Record<string, string> = {
  women: catWomen,
  men: catMen,
  shoes: catShoes,
  accessories: catAcc,
};

const blurbs: Record<string, string> = {
  women: "Tailoring, knitwear, silk and outerwear, made to be lived in.",
  men: "Considered staples — coats, trousers, knits — built to last decades.",
  shoes: "Cup-soled, leather-lined, finished by hand in Porto.",
  accessories: "Leather, gold and silk. The pieces you'll keep forever.",
};

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Maison" },
      { name: "description", content: "Browse Maison categories: women, men, shoes and accessories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 md:px-10 md:pt-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Categories</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Four chapters. One wardrobe.</h1>
        <p className="mt-6 text-muted-foreground">Browse the house by category, or by intent. Every Maison piece is built to outlast the season.</p>
      </div>

      <div className="mt-16 space-y-3 md:space-y-5">
        {categories.map((c, i) => {
          const sample = products.filter((p) => p.category === c.slug).slice(0, 3);
          return (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Link to="/shop" search={{ category: c.slug }} className="group relative grid grid-cols-1 overflow-hidden rounded-sm bg-muted md:grid-cols-[1.2fr_1fr]">
                <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[420px]">
                  <img src={images[c.slug]} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-between gap-8 px-8 py-10 md:px-12 md:py-16">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{c.count} pieces</p>
                    <h2 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{c.name}</h2>
                    <p className="mt-4 max-w-md text-muted-foreground">{blurbs[c.slug]}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {sample.map((p) => (
                      <img key={p.id} src={p.image} alt="" className="h-20 w-16 rounded-sm object-cover" />
                    ))}
                    <span className="ml-2 text-sm underline-offset-4 group-hover:underline">Explore {c.name.toLowerCase()} →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
