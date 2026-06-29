import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { getProduct } from "@/lib/products";
import { formatPrice, useCart } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Maison" },
      { name: "description", content: "Secure checkout." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const [h, setH] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();
  useEffect(() => { useCart.persist.rehydrate(); setH(true); }, []);

  const lines = h ? cart.items.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product) : [];
  const subtotal = lines.reduce((n, l) => n + (l.product?.price ?? 0) * l.qty, 0);
  const shipping = subtotal === 0 || subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-12 md:px-10 md:pt-20">
      <div className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Checkout</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Almost yours.</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Order placed", { description: "A confirmation is on its way to your inbox." });
          cart.clear();
          setTimeout(() => navigate({ to: "/" }), 1200);
        }}
        className="mt-12 grid gap-16 md:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-12">
          <Section step="01" title="Contact">
            <Field id="email" label="Email" type="email" required placeholder="you@maison.com" />
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" defaultChecked className="accent-foreground" />
              Email me with news and offers
            </label>
          </Section>

          <Section step="02" title="Shipping">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="first" label="First name" required />
              <Field id="last" label="Last name" required />
            </div>
            <Field id="address" label="Address" required />
            <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
              <Field id="city" label="City" required />
              <Field id="zip" label="Postal" required />
              <Field id="country" label="Country" required defaultValue="France" />
            </div>
          </Section>

          <Section step="03" title="Payment">
            <div className="rounded-sm border border-border bg-card p-6">
              <Field id="card" label="Card number" required placeholder="4242 4242 4242 4242" />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field id="exp" label="Expiry" required placeholder="MM / YY" />
                <Field id="cvc" label="CVC" required placeholder="123" />
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Encrypted, secure and verified.
              </p>
            </div>
          </Section>

          <button type="submit" className="w-full rounded-full bg-foreground py-4 text-sm text-background transition-transform hover:-translate-y-0.5">
            Place order — {formatPrice(total)}
          </button>
        </div>

        <aside className="h-fit md:sticky md:top-28 rounded-sm border border-border bg-card p-8">
          <p className="font-display text-2xl">Your order</p>
          <ul className="mt-6 space-y-5">
            {lines.map((l) => (
              <li key={l.id + l.size + l.color} className="flex items-start gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <img src={l.product!.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-foreground text-[10px] text-background tabular-nums">{l.qty}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{l.product!.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{l.color} · {l.size}</p>
                </div>
                <p className="shrink-0 text-sm tabular-nums">{formatPrice(l.product!.price * l.qty)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="tabular-nums text-foreground">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="tabular-nums text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-medium"><span>Total</span><span className="tabular-nums">{formatPrice(total)}</span></div>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-[var(--gold)]" /> Carbon-neutral delivery
          </p>
        </aside>
      </form>
    </div>
  );
}

function Section({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-4 border-b border-border pb-4">
        <span className="font-display text-2xl text-muted-foreground tabular-nums">{step}</span>
        <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      </div>
      <div className="mt-6 space-y-4">{children}</div>
    </section>
  );
}

function Field({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input id={id} {...props} className="mt-2 w-full border-b border-border bg-transparent py-2.5 outline-none transition-colors focus:border-foreground" />
    </div>
  );
}
