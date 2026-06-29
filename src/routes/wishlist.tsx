import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";
import { useWishlist } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Maison" },
      { name: "description", content: "Your saved Maison pieces." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const [hydrated, setHydrated] = useState(false);
  const ids = useWishlist((s) => s.ids);
  useEffect(() => {
    useWishlist.persist.rehydrate();
    setHydrated(true);
  }, []);

  const items = hydrated ? products.filter((p) => ids.includes(p.id)) : [];

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 md:px-10 md:pt-20">
      <div className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Wishlist</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Pieces you've saved</h1>
        <p className="mt-3 text-muted-foreground">{items.length} saved {items.length === 1 ? "piece" : "pieces"}.</p>
      </div>

      {items.length === 0 ? (
        <div className="mx-auto max-w-md py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
            <Heart className="h-6 w-6" />
          </div>
          <p className="mt-6 font-display text-2xl">No favourites yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any piece to save it for later.</p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background">Browse the shop</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
