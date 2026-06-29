import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, useWishlist } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const cart = useCart();
  const wishlist = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    useCart.persist.rehydrate();
    useWishlist.persist.rehydrate();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const cartCount = cart.items.reduce((n, i) => n + i.qty, 0);
  const results = q.trim().length > 1
    ? products.filter((p) =>
        (p.name + " " + p.category + " " + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()),
      ).slice(0, 6)
    : [];

  return (
    <>
      <div className="bg-foreground text-background text-[11px] tracking-[0.22em] uppercase">
        <div className="overflow-hidden whitespace-nowrap py-2">
          <div className="marquee inline-flex gap-12 px-6">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="inline-flex gap-12">
                <span>Complimentary shipping over $200</span>
                <span>·</span>
                <span>SS26 collection now in stores</span>
                <span>·</span>
                <span>30-day returns, always</span>
                <span>·</span>
                <span>Carbon-neutral delivery</span>
                <span>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-300",
          scrolled ? "glass" : "bg-background",
        )}
      >
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 md:h-20 md:px-10">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden -ml-2 p-2"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-8 text-[13px]">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative tracking-wide text-foreground/80 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="justify-self-center">
            <span className="font-display text-2xl tracking-[-0.04em] md:text-[28px]">
              Maison<span className="text-[var(--gold)]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 justify-self-end">
            <button aria-label="Search" className="p-2" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button aria-label="Toggle theme" className="p-2" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.ids.length > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                  {wishlist.ids.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-medium text-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-24 max-w-2xl px-6"
            >
              <div className="flex items-center gap-3 border-b border-foreground/40 pb-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search coats, knitwear, accessories…"
                  className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                />
                <button aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 space-y-1">
                {results.length === 0 && q.length > 1 && (
                  <p className="py-6 text-sm text-muted-foreground">No matches. Try another keyword.</p>
                )}
                {results.map((p) => (
                  <Link
                    key={p.id}
                    to="/products/$id"
                    params={{ id: p.id }}
                    className="flex items-center gap-4 rounded-sm p-2 transition-colors hover:bg-muted"
                  >
                    <img src={p.image} alt="" className="h-14 w-12 rounded-sm object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.category}</p>
                    </div>
                    <p className="text-sm tabular-nums">${p.price}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-display text-2xl">Maison<span className="text-[var(--gold)]">.</span></span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6 px-8 font-display text-4xl">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link to={n.to} className="block">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
