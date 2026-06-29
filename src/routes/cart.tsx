import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { getProduct } from "@/lib/products";
import { formatPrice, useCart } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Bag — Maison" },
      { name: "description", content: "Review your bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const [h, setH] = useState(false);
  const cart = useCart();
  useEffect(() => { useCart.persist.rehydrate(); setH(true); }, []);

  const lines = h
    ? cart.items.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product)
    : [];
  const subtotal = lines.reduce((n, l) => n + (l.product?.price ?? 0) * l.qty, 0);
  const shipping = subtotal === 0 || subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 md:px-10 md:pt-20">
      <div className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Your bag</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Bag</h1>
      </div>

      {lines.length === 0 ? (
        <div className="mx-auto max-w-md py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <p className="mt-6 font-display text-2xl">Your bag is empty</p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background">Discover the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <ul className="divide-y divide-border">
            {lines.map((l) => (
              <li key={l.id + l.size + l.color} className="grid grid-cols-[120px_1fr] gap-6 py-8 md:grid-cols-[160px_1fr_auto]">
                <Link to="/products/$id" params={{ id: l.id }} className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <img src={l.product!.image} alt="" className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0">
                  <p className="font-medium">{l.product!.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{l.color} · {l.size}</p>
                  <p className="mt-3 text-sm tabular-nums md:hidden">{formatPrice(l.product!.price * l.qty)}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                      <button onClick={() => cart.setQty(l.id, l.size, l.color, l.qty - 1)} aria-label="decrement"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-5 text-center text-sm tabular-nums">{l.qty}</span>
                      <button onClick={() => cart.setQty(l.id, l.size, l.color, l.qty + 1)} aria-label="increment"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => cart.remove(l.id, l.size, l.color)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
                <p className="hidden self-start text-sm tabular-nums md:block">{formatPrice(l.product!.price * l.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit md:sticky md:top-28 rounded-sm border border-border bg-card p-8">
            <p className="font-display text-2xl">Summary</p>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Complimentary" : formatPrice(shipping)} />
              <div className="my-3 border-t border-border" />
              <Row label="Total" value={formatPrice(total)} bold />
            </dl>
            <Link to="/checkout" className="mt-8 block rounded-full bg-foreground py-4 text-center text-sm text-background transition-transform hover:-translate-y-0.5">
              Proceed to checkout
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">Taxes calculated at checkout. Free returns within 30 days.</p>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={"flex items-baseline justify-between " + (bold ? "text-base font-medium" : "text-muted-foreground")}>
      <dt>{label}</dt>
      <dd className="tabular-nums text-foreground">{value}</dd>
    </div>
  );
}
