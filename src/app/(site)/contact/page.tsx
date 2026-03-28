import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Contact | ${siteConfig.name}`,
  description:
    "Date de contact si detalii despre cum poti propune o afacere sau un oras pentru director.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <section className="pb-17.5 pt-34">
        <div className="mx-auto max-w-[870px] px-4 text-center sm:px-8 xl:px-0">
          <span className="mb-4 inline-flex rounded-full bg-gray px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-body">
            Contact
          </span>
          <h1 className="mb-5 text-4xl font-bold text-dark">Contact</h1>
          <p className="text-lg leading-8 text-body">
            Foloseste aceasta pagina pentru a centraliza ulterior formularul de
            contact, solicitarile comerciale si propunerile de listare pentru
            afaceri locale.
          </p>
        </div>
      </section>
    </main>
  );
}
