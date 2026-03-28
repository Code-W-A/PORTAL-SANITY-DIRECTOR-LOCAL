import Link from "next/link";
import { County } from "@/types/directory";
import PortalCardFrame from "../UI/PortalCardFrame";

const CountyCard = ({ county }: { county: County }) => {
  return (
    <Link href={`/judet/${county.slug.current}`} className="group block">
      <PortalCardFrame
        className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-1"
        padding="comfortable"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full bg-gray px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-body">
            Judet
          </span>
          <span className="text-sm text-body">
            {county.cityCount || 0} localitati
          </span>
        </div>

        <h3 className="mb-3 text-2xl font-semibold text-dark">
          {county.title}
        </h3>
        <p className="line-clamp-3 text-body">{county.summary}</p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-dark">
          Vezi orasele
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </PortalCardFrame>
    </Link>
  );
};

export default CountyCard;
