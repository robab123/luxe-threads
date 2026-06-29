import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, useWishlist } from "@/lib/store";
import type { Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wishlist = useWishlist();
  const liked = wishlist.ids.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={(e) => {
              e.preventDefault();
              wishlist.toggle(product.id);
            }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Heart className={cn("h-4 w-4", liked && "fill-foreground text-foreground")} />
          </button>
          {product.newArrival && (
            <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
              New
            </span>
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium tracking-tight">{product.name}</h3>
            <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {product.colors.length} colors
            </p>
          </div>
          <p className="shrink-0 text-sm tabular-nums">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
