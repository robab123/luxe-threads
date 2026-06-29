import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import edi1 from "@/assets/editorial-1.jpg";
import edi2 from "@/assets/editorial-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Maison" },
      { name: "description", content: "Maison is a Paris-based fashion house designing essentials in small batches across Italy, Japan and Portugal." },
      { property: "og:title", content: "About — Maison" },
      { property: "og:description", content: "A Paris house designing essentials in small batches." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-16 md:pt-28">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Our story</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.03em] text-balance"
        >
          We started Maison because we wanted to stop replacing our wardrobe.
        </motion.h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Founded in 2018 above a tailor's shop in the 11th arrondissement of Paris,
          Maison began as four friends frustrated with disposable fashion. Today,
          we work with thirteen workshops across Italy, Japan and Portugal,
          producing fewer than 40 pieces a season — each designed to be worn,
          repaired and passed on.
        </p>
      </section>

      <section className="relative">
        <img src={edi1} alt="" className="h-[60vh] w-full object-cover md:h-[80vh]" />
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-12 px-6 py-24 md:grid-cols-3 md:py-32">
        {[
          { n: "01", title: "Make less.", body: "We produce in seasonal drops of 40 pieces or fewer. No deadstock, no markdowns." },
          { n: "02", title: "Source slowly.", body: "Mills we've visited. Fabrics we've worn for a year before approving." },
          { n: "03", title: "Repair forever.", body: "Every Maison piece comes with a lifetime repair pass through our Como atelier." },
        ].map((c, i) => (
          <motion.div key={c.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
            <p className="font-display text-5xl text-[var(--gold)]">{c.n}</p>
            <p className="mt-4 font-display text-2xl tracking-tight">{c.title}</p>
            <p className="mt-3 text-muted-foreground">{c.body}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Workshops</p>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">From Como to Kyoto.</h2>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                ["Tailoring", "Como, IT — Lanificio Pelletti, est. 1947"],
                ["Knitwear", "Porto, PT — Casa Téxtil Almeida"],
                ["Denim", "Okayama, JP — Kojima Mill 3"],
                ["Leather", "Florence, IT — Conceria Salvatore"],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[120px_1fr] border-b border-border pb-3">
                  <span className="uppercase tracking-[0.18em] text-muted-foreground text-xs">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[460px] md:min-h-full">
            <img src={edi2} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-24 text-center md:py-32">
        <p className="font-display text-3xl leading-snug tracking-tight md:text-4xl text-balance">
          "If a garment can't be worn fifty times, it shouldn't exist."
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">— Elise Marchand, Founder</p>
        <Link to="/shop" className="mt-12 inline-block rounded-full bg-foreground px-7 py-3.5 text-sm text-background">Shop the collection</Link>
      </section>
    </div>
  );
}
