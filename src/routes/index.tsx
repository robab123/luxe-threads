import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Package, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { products, reviews, categories } from "@/lib/products";
import hero from "@/assets/hero-main.jpg";
import edi1 from "@/assets/editorial-1.jpg";
import edi2 from "@/assets/editorial-2.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catShoes from "@/assets/cat-shoes.jpg";
import catAcc from "@/assets/cat-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison — Modern wardrobe, quietly made" },
      { name: "description", content: "Considered essentials, small batches, and quiet design. Discover the SS26 collection." },
    ],
  }),
  component: Home,
});

const featured = products.filter((p) => p.featured);
const best = products.filter((p) => p.bestSeller);

const catImages: Record<string, string> = {
  women: catWomen,
  men: catMen,
  shoes: catShoes,
  accessories: catAcc,
};

function Home() {
  return (
    <>
      <section className="relative">
        <div className="grid min-h-[88vh] grid-cols-1 md:grid-cols-[1.05fr_1fr]">
          <div className="relative flex items-end px-6 pb-14 pt-16 md:px-12 md:pb-20 md:pt-24">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xs uppercase tracking-[0.28em] text-muted-foreground"
              >
                Spring/Summer 2026
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-balance"
              >
                A wardrobe of quiet conviction.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="mt-6 max-w-md text-base text-muted-foreground md:text-lg"
              >
                Essentials made in small batches across Italy, Japan and Portugal — designed to last longer than the season they belong to.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link to="/shop" className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm tracking-wide text-background transition-transform hover:-translate-y-0.5">
                  Discover the collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/about" className="text-sm underline-offset-4 hover:underline">Our story</Link>
              </motion.div>
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <div><span className="block text-foreground text-base font-display normal-case tracking-tight">12 yrs</span>Craft heritage</div>
                <div><span className="block text-foreground text-base font-display normal-case tracking-tight">94%</span>Natural fibers</div>
                <div><span className="block text-foreground text-base font-display normal-case tracking-tight">∞</span>Free returns</div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[60vh] md:min-h-full"
          >
            <img src={hero} alt="Editorial campaign" width={1600} height={1920} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-6 right-6 glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em]">Look 04 — Trench in cream</div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Categories</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Shop the house.</h2>
          </div>
          <Link to="/categories" className="hidden text-sm underline-offset-4 hover:underline md:inline">View all categories →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {categories.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}>
              <Link to="/shop" search={{ category: c.slug }} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                <img src={catImages[c.slug]} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{c.count} pieces</p>
                  <p className="mt-1 font-display text-2xl tracking-tight">{c.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Featured</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Considered pieces, this season.</h2>
          </div>
          <Link to="/shop" className="hidden text-sm underline-offset-4 hover:underline md:inline">Shop all →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-0 md:grid-cols-2">
          <div className="relative min-h-[480px] md:min-h-[640px]">
            <img src={edi1} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The Atelier</p>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">Made by people whose names we know.</h2>
            <p className="mt-6 max-w-md text-muted-foreground">Tailoring in Como. Knitwear in Porto. Leather in Florence. Every Maison piece traces back to a workshop, a craftsperson, a story.</p>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline">Meet the workshops <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Best sellers</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Quietly in demand.</h2>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { icon: Truck, title: "Complimentary shipping", body: "On orders over $200" },
            { icon: Package, title: "30-day returns", body: "Free, no questions" },
            { icon: Leaf, title: "94% natural fibers", body: "Wool, silk, linen, cotton" },
            { icon: Sparkles, title: "Lifetime repairs", body: "Through our Como atelier" },
          ].map((f) => (
            <div key={f.title} className="bg-background px-6 py-10 md:px-10 md:py-14">
              <f.icon className="h-5 w-5 text-[var(--gold)]" />
              <p className="mt-5 font-display text-xl tracking-tight">{f.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Letters from clients</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Worn, written about, kept.</h2>
          </div>
          <div className="hidden text-right md:block">
            <p className="font-display text-3xl">4.9<span className="text-muted-foreground">/5</span></p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">12,408 reviews</p>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure key={r.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="flex flex-col gap-6 rounded-sm border border-border bg-card p-8">
              <div className="text-[var(--gold)] tracking-[0.4em]">{"★".repeat(r.rating)}</div>
              <blockquote className="font-display text-2xl leading-snug tracking-tight">"{r.title}"</blockquote>
              <p className="text-sm text-muted-foreground">{r.body}</p>
              <figcaption className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span>{r.name} — {r.location}</span>
                <span>{r.date}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={edi2} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-32 md:px-10 md:py-48">
          <div className="max-w-xl text-white">
            <p className="text-xs uppercase tracking-[0.22em] opacity-80">Spring 2026</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">Softness, sharpened.</h2>
            <Link to="/shop" className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-7 py-3.5 text-sm text-foreground transition-transform hover:-translate-y-0.5">
              Shop the campaign <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
