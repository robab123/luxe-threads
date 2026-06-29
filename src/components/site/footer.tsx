import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="mt-32 border-t border-border bg-background">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The Bulletin</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              New collections, private events, and the occasional letter from our atelier.
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setDone(true);
              toast.success("Welcome to Maison.", { description: "Look out for our next dispatch." });
              setEmail("");
            }}
            className="flex flex-col justify-end gap-4"
          >
            <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground" htmlFor="nl">
              Email
            </label>
            <div className="flex items-end gap-3 border-b border-foreground/40 pb-3">
              <input
                id="nl"
                type="email"
                required
                placeholder="you@maison.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" aria-label="Subscribe" className="shrink-0 p-1">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {done
                ? "Thank you. You're on the list."
                : "By subscribing you agree to our privacy policy. Unsubscribe anytime."}
            </p>
          </form>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Link to="/" className="font-display text-3xl tracking-[-0.04em]">
            Maison<span className="text-[var(--gold)]">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A modern wardrobe built in small batches across Italy, Japan and Portugal. Designed in Paris since 2018.
          </p>
        </div>
        <FooterCol title="Shop" links={[
          ["/shop", "All"],
          ["/categories", "Categories"],
          ["/wishlist", "Wishlist"],
        ]} />
        <FooterCol title="House" links={[
          ["/about", "About"],
          ["/contact", "Contact"],
          ["/about", "Sustainability"],
        ]} />
        <FooterCol title="Help" links={[
          ["/contact", "Shipping"],
          ["/contact", "Returns"],
          ["/contact", "Size Guide"],
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} Maison Atelier — Paris</p>
          <p>Crafted with care · Made for Earth</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([to, label]) => (
          <li key={to + label}>
            <Link to={to} className="transition-colors hover:text-[var(--gold)]">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
