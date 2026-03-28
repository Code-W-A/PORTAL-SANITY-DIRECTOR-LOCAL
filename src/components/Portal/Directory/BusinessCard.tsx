import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "@/sanity/client";
import { Business } from "@/types/directory";
import PortalCardFrame from "../UI/PortalCardFrame";

const BusinessCard = ({ business }: { business: Business }) => {
  const href = business.city
    ? `/${business.city.slug.current}/${business.slug.current}`
    : "#";

  let websiteLabel: string | null = null;

  if (business.website) {
    try {
      websiteLabel = new URL(business.website).hostname.replace(/^www\./, "");
    } catch {
      websiteLabel = business.website;
    }
  }

  return (
    <PortalCardFrame
      className="group relative h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-1"
      padding="compact"
    >
      <div className="relative mb-5 aspect-370/240 overflow-hidden rounded-[16px] bg-gray">
        {business.coverImage ? (
          <Image
            src={imageBuilder(business.coverImage).url()!}
            alt={business.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end bg-linear-to-br from-[#F4F4F5] via-[#E7E7EA] to-[#DADCE1] p-5">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-dark">
              {business.category}
            </span>
          </div>
        )}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {business.categories.length > 0
          ? business.categories.slice(0, 2).map((category) => (
              <span
                key={category._id}
                className="rounded-full bg-blue/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue"
              >
                {category.title}
              </span>
            ))
          : business.category && (
              <span className="rounded-full bg-blue/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                {business.category}
              </span>
            )}
        {business.featured && (
          <span className="rounded-full bg-dark px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Recomandat
          </span>
        )}
      </div>

      <h3 className="mb-3 text-xl font-bold text-dark">
        <Link href={href}>
          <span className="absolute inset-0" aria-hidden></span>
          {business.title}
        </Link>
      </h3>

      <p className="line-clamp-3 text-body">{business.summary}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-body">
        {business.city?.title && <span>{business.city.title}</span>}
        {business.county?.title && <span>{business.county.title}</span>}
        {business.address && <span>{business.address}</span>}
        {websiteLabel && <span>{websiteLabel}</span>}
      </div>
    </PortalCardFrame>
  );
};

export default BusinessCard;
