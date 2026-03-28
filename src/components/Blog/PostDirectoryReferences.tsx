import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { Post } from "@/types/post";

export default function PostDirectoryReferences({ post }: { post: Post }) {
  const hasCounties = Boolean(post.relatedCounties?.length);
  const hasCities = Boolean(post.relatedCities?.length);
  const hasBusinesses = Boolean(post.relatedBusinesses?.length);
  const hasCategories = Boolean(post.relatedCategories?.length);

  if (!hasCounties && !hasCities && !hasBusinesses && !hasCategories) {
    return null;
  }

  return (
    <PortalSection className="py-15 lg:py-20">
      <SectionHeader
        eyebrow="Conexiuni"
        align="left"
        title="Legaturi utile din directory"
        description="Articolul mentioneaza explicit aceste entitati locale. Le pastram separate ca model, dar le conectam prin linking contextual."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {hasCounties && (
          <PortalCardFrame padding="comfortable">
            <h3 className="mb-4 text-xl font-semibold text-dark">Judete mentionate</h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedCounties!.map((county) => (
                <Link
                  key={county._id}
                  href={`/judet/${county.slug.current}`}
                  className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
                >
                  {county.title}
                </Link>
              ))}
            </div>
          </PortalCardFrame>
        )}

        {hasCities && (
          <PortalCardFrame padding="comfortable">
            <h3 className="mb-4 text-xl font-semibold text-dark">Orase mentionate</h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedCities!.map((city) => (
                <Link
                  key={city._id}
                  href={`/${city.slug.current}`}
                  className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
                >
                  {city.title}
                </Link>
              ))}
            </div>
          </PortalCardFrame>
        )}

        {hasBusinesses && (
          <PortalCardFrame padding="comfortable">
            <h3 className="mb-4 text-xl font-semibold text-dark">
              Afaceri mentionate
            </h3>
            <div className="space-y-3">
              {post.relatedBusinesses!.map((business) =>
                business.city?.slug.current ? (
                  <Link
                    key={business._id}
                    href={`/${business.city.slug.current}/${business.slug.current}`}
                    className="block rounded-2xl border border-gray-3 bg-gray px-4 py-4 transition-colors duration-200 hover:border-dark hover:bg-white"
                  >
                    <p className="font-semibold text-dark">{business.title}</p>
                    <p className="mt-1 text-sm text-body">
                      {[business.city?.title, business.county?.title, business.address]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </Link>
                ) : null,
              )}
            </div>
          </PortalCardFrame>
        )}

        {hasCategories && (
          <PortalCardFrame padding="comfortable">
            <h3 className="mb-4 text-xl font-semibold text-dark">
              Categorii locale relevante
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedCategories!.map((category) => (
                <span
                  key={category._id}
                  className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </PortalCardFrame>
        )}
      </div>
    </PortalSection>
  );
}
