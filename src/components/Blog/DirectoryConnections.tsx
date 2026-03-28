import Link from "next/link";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalSection from "@/components/Portal/UI/PortalSection";
import SectionHeader from "@/components/Common/SectionHeader";

const items = [
  {
    title: "Judete",
    description:
      "Cand un articol are relevanta locala, trimite mai departe spre pagina de judet, nu spre o arhiva artificiala.",
    href: "/#judete",
  },
  {
    title: "Orase",
    description:
      "Paginile de oras raman entitati de discovery local, iar blogul le sustine doar editorial, unde are sens.",
    href: "/#orase",
  },
  {
    title: "Afaceri",
    description:
      "Business-urile isi pastreaza identitatea proprie; articolele le pot mentiona si contextualiza, dar nu le inlocuiesc.",
    href: "/#afaceri",
  },
];

export default function DirectoryConnections() {
  return (
    <PortalSection className="bg-gray py-15 lg:py-20">
      <SectionHeader
        eyebrow="Conectare"
        align="left"
        title="Blogul ramane editorial, dar nu este izolat"
        description="Conectam articolele la zonele relevante din directory fara sa amestecam modelele de continut."
      />

      <PortalCardGrid>
        {items.map((item) => (
          <PortalCardFrame key={item.title} padding="comfortable" className="h-full">
            <h3 className="mb-3 text-xl font-semibold text-dark">{item.title}</h3>
            <p className="mb-5 text-body">{item.description}</p>
            <Link
              href={item.href}
              className="inline-flex rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
            >
              Exploreaza zona
            </Link>
          </PortalCardFrame>
        ))}
      </PortalCardGrid>
    </PortalSection>
  );
}
