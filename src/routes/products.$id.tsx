import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Shield, Truck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/product-card";
import { getProduct, products, reviews } from "@/lib/products";
import { formatPrice, useCart, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Maison` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Maison` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <h1 className="font-display text-4xl">Piece not found</h1>
      <Link to="/shop" className="mt-6 inline-block underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const cart = useCart();
  const wishlist = useWishlist();
  const liked = wishlist.ids.includes(product.id);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-8 md:px-10 md:pt-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Back to shop
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2 aspect-[4/5] overflow-hidden rounded-sm bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden rounded-sm bg-muted">
            <img src={product.image} alt="" className="h-full w-full object-cover scale-110" />
          </div>
          <div className="aspect-square overflow-hidden rounded-sm bg-muted">
            <img src={product.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: "30% 60%" }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="md:sticky md:top-28 md:self-start">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4">
            <p className="text-2xl tabular-nums">{formatPrice(product.price)}</p>
            <span className="text-xs text-muted-foreground">
              <span className="text-[var(--gold)]">{"★".repeat(Math.round(product.rating))}</span> {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Color · {color}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c: string) => (
                <button key={c} onClick={() => setColor(c)} className={cn("rounded-full border px-4 py-2 text-xs tracking-wide transition-colors", color === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/60")}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span>Size · {size}</span>
              <button className="underline-offset-4 hover:underline">Size guide</button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.sizes.map((s: string) => (
                <button key={s} onClick={() => setSize(s)} className={cn("rounded-sm border py-3 text-sm transition-colors", size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/60")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center gap-3 rounded-full border border-border px-4">
              <button aria-label="decrement" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center tabular-nums">{qty}</span>
              <button aria-label="increment" onClick={() => setQty((q) => q + 1)}><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => {
                cart.add({ id: product.id, size, color, qty });
                toast.success("Added to bag", { description: `${product.name} · ${size} · ${color}` });
              }}
              className="flex-1 rounded-full bg-foreground py-4 text-sm tracking-wide text-background transition-transform hover:-translate-y-0.5"
            >
              Add to bag — {formatPrice(product.price * qty)}
            </button>
            <button aria-label="wishlist" onClick={() => wishlist.toggle(product.id)} className="grid h-auto w-14 place-items-center rounded-full border border-border hover:border-foreground/60">
              <Heart className={cn("h-4 w-4", liked && "fill-foreground")} />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 rounded-sm border border-border p-4">
              <Truck className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
              <div>
                <p className="font-medium">Free shipping</p>
                <p className="text-muted-foreground">2–4 day delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-sm border border-border p-4">
              <Shield className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
              <div>
                <p className="font-medium">Lifetime repairs</p>
                <p className="text-muted-foreground">Through our atelier</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-display text-6xl">{product.rating}</p>
            <p className="text-[var(--gold)] tracking-[0.4em]">{"★".repeat(Math.round(product.rating))}</p>
            <p className="mt-2 text-sm text-muted-foreground">{product.reviewCount} verified reviews</p>
          </div>
          <div className="space-y-8">
            {reviews.map((r) => (
              <div key={r.name} className="border-b border-border pb-8 last:border-none">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{r.name} · {r.location}</span><span>{r.date}</span>
                </div>
                <p className="mt-3 font-display text-xl">"{r.title}"</p>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24 pb-8">
          <h2 className="font-display text-3xl tracking-tight">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
