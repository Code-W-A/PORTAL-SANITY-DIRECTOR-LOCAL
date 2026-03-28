import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Despre | ${siteConfig.name}`,
  description:
    "Afla cum este construit portalul si de ce blogul este separat de directorul local.",
  path: "/despre",
});

export default function AboutPage() {
  return (
    <main>
      <section className="pb-17.5 pt-34">
        <div className="mx-auto max-w-[870px] px-4 text-center sm:px-8 xl:px-0">
          <span className="mb-4 inline-flex rounded-full bg-gray px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-body">
            Despre portal
          </span>
          <h1 className="mb-5 text-4xl font-bold text-dark">Despre</h1>
          <p className="text-lg leading-8 text-body">
            {siteConfig.name} este construit ca un portal local in care zona de
            blog si zona de directory sunt separate clar. Articolele raman
            editoriale, iar judetele, orasele si afacerile au modele dedicate,
            rute proprii si metadata curate.
          </p>
        </div>
      </section>
    </main>
  );
}
