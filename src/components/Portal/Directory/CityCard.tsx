import Link from "next/link";
import { City } from "@/types/directory";
import PortalCardFrame from "../UI/PortalCardFrame";

const CityCard = ({ city }: { city: City }) => {
  return (
    <Link href={`/${city.slug.current}`} className="group block">
      <PortalCardFrame
        className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-1"
        tone="muted"
        padding="comfortable"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-body">
            Oras
          </span>
          {city.county?.title && (
            <span className="text-sm text-body">{city.county.title}</span>
          )}
        </div>

        <h3 className="mb-3 text-2xl font-semibold text-dark">{city.title}</h3>
        <p className="line-clamp-3 text-body">{city.summary}</p>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm">
          <span className="text-body">
            {city.businessCount || 0} afaceri listate
          </span>
          <span className="font-medium text-dark">Deschide pagina</span>
        </div>
      </PortalCardFrame>
    </Link>
  );
};

export default CityCard;
