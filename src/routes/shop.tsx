import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/site/product-card";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.enum(["women", "men", "shoes", "accessories"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Maison" },
      { name: "description", content: "Browse the full Maison collection — coats, knitwear, tailoring, leather and footwear." },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "low" | "high" | "new";

function Shop() {
  const { category, q } = Route.useSearch();
  const [sort, setSort] = useState<Sort>("featured");
  const [priceMax, setPriceMax] = useState(500);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    list = list.filter((p) => p.price <= priceMax);
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
    return list;
  }, [category, q, sort, priceMax]);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 md:px-10 md:pt-16">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col gap-3 border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The Collection</p>
        <h1 className="font-display text-5xl tracking-tight md:text-6xl">
          {category ? categories.find((c) => c.slug === category)?.name : "All pieces"}
        </h1>
        <p className="max-w-xl text-muted-foreground">
          {filtered.length} pieces. Free shipping over $200, always.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="space-y-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Category</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/shop" className={cn("transition-colors hover:text-foreground", !category ? "text-foreground" : "text-muted-foreground")}>All</Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to="/shop" search={{ category: c.slug }} className={cn("flex items-center justify-between transition-colors hover:text-foreground", category === c.slug ? "text-foreground" : "text-muted-foreground")}>
                    <span>{c.name}</span><span className="tabular-nums text-xs">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Max price</p>
            <input type="range" min={50} max={500} step={10} value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="mt-4 w-full accent-foreground" />
            <p className="mt-2 text-sm tabular-nums text-muted-foreground">Up to ${priceMax}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Sort</p>
            <div className="mt-4 space-y-2 text-sm">
              {([
                ["featured", "Featured"],
                ["new", "New arrivals"],
                ["low", "Price, low to high"],
                ["high", "Price, high to low"],
              ] as [Sort, string][]).map(([k, label]) => (
                <button key={k} onClick={() => setSort(k)} className={cn("block text-left transition-colors hover:text-foreground", sort === k ? "text-foreground" : "text-muted-foreground")}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          {filtered.length === 0 && (
            <p className="col-span-full py-24 text-center text-muted-foreground">Nothing matches that filter. Try another.</p>
          )}
        </div>
      </div>
    </div>
  );
}
