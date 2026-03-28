import PortalCardFrame from "../UI/PortalCardFrame";
import PortalCardGrid from "../UI/PortalCardGrid";
import PortalSection from "../UI/PortalSection";
import SectionHeader from "@/components/Common/SectionHeader";

const trustItems = [
  {
    title: "Modele separate pentru continut",
    description:
      "Un business nu este tratat ca post editorial, iar paginile de locatie nu sunt arhive mascate.",
  },
  {
    title: "Navigare locala clara",
    description:
      "Structura judet → oras → business ramane explicita si usor de inteles pentru utilizatori si crawleri.",
  },
  {
    title: "Continut util, nu pagini goale",
    description:
      "Paginile locale sunt construite doar cand au context suficient: entitati, linkuri utile sau suport editorial real.",
  },
];

export default function TrustSection() {
  return (
    <PortalSection className="py-15 lg:py-20">
      <SectionHeader
        eyebrow="Calitate"
        align="left"
        title="De ce portalul ramane util si credibil"
        description="Fiecare pagina publica trebuie sa aiba un rol clar in discovery local si sa evite pattern-urile de theme demo."
      />

      <PortalCardGrid>
        {trustItems.map((item) => (
          <PortalCardFrame key={item.title} padding="comfortable" className="h-full">
            <h3 className="mb-3 text-xl font-semibold text-dark">{item.title}</h3>
            <p className="text-body">{item.description}</p>
          </PortalCardFrame>
        ))}
      </PortalCardGrid>
    </PortalSection>
  );
}
