import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Servicii | ${siteConfig.name}`,
  description:
    "Pagina rezervata pentru servicii, oferte comerciale si pachete viitoare.",
  path: "/servicii",
  noIndex: true,
});

export default function ServicesPage() {
  return (
    <main>
      <section className="pb-17.5 pt-34">
        <div className="mx-auto max-w-[870px] px-4 text-center sm:px-8 xl:px-0">
          <span className="mb-4 inline-flex rounded-full bg-gray px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-body">
            Servicii
          </span>
          <h1 className="mb-5 text-4xl font-bold text-dark">Servicii</h1>
          <p className="text-lg leading-8 text-body">
            Ruta este rezervata pentru viitoarele servicii comerciale ale
            portalului, fara a intra in conflict cu slug-urile de oras.
          </p>
        </div>
      </section>
    </main>
  );
}
