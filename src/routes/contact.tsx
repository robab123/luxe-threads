import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison" },
      { name: "description", content: "Talk to the Maison team — orders, sizing, repairs and press." },
      { property: "og:title", content: "Contact — Maison" },
      { property: "og:description", content: "Talk to the Maison team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-12 md:px-10 md:pt-20">
      <div className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Talk to the house.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Orders, sizing, repairs, press — we read every note. We aim to reply within one business day.</p>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message received", { description: "Our team will reply shortly." });
          }}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field id="name" label="Name" required />
            <Field id="email" type="email" label="Email" required />
          </div>
          <Field id="subject" label="Subject" required />
          <div>
            <label htmlFor="msg" className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Message</label>
            <textarea id="msg" required rows={6} className="mt-2 w-full resize-none border-b border-border bg-transparent py-2.5 outline-none focus:border-foreground" />
          </div>
          <button type="submit" className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm text-background">
            {sent ? "Sent" : "Send message"} <Send className="h-4 w-4" />
          </button>
        </form>

        <aside className="space-y-8">
          <Card icon={MapPin} title="Atelier" lines={["12 rue du Faubourg Saint-Antoine", "75011 Paris, France"]} />
          <Card icon={Mail} title="Email" lines={["bonjour@maison.com", "press@maison.com"]} />
          <Card icon={Phone} title="Phone" lines={["+33 (0)1 84 88 12 30", "Mon–Fri · 10:00–18:00 CET"]} />
        </aside>
      </div>
    </div>
  );
}

function Field({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input id={id} {...props} className="mt-2 w-full border-b border-border bg-transparent py-2.5 outline-none focus:border-foreground" />
    </div>
  );
}

function Card({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <Icon className="h-4 w-4 text-[var(--gold)]" />
      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">{title}</p>
      {lines.map((l) => <p key={l} className="mt-1 text-sm">{l}</p>)}
    </div>
  );
}
