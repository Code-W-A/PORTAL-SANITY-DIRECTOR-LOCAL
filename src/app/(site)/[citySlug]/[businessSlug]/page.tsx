import Breadcrumbs from "@/components/Common/Breadcrumbs";
import PortableTextContent from "@/components/Common/PortableTextContent";
import SectionHeader from "@/components/Common/SectionHeader";
import StructuredData from "@/components/Common/StructuredData";
import RelatedPostsSection from "@/components/Portal/Editorial/RelatedPostsSection";
import BusinessCard from "@/components/Portal/Directory/BusinessCard";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { getBusinessesByCitySlug, getBusinessByCityAndSlug } from "@/sanity/businesses";
import { getTopCategoriesFromBusinesses, getRelatedBusinesses } from "@/libs/directory-insights";
import { getPostsRelevantToBusiness } from "@/sanity/posts";
import { notFoundIfReservedDirectorySlugs } from "../../route-guards";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import {
  buildBreadcrumbStructuredData,
  buildBusinessStructuredData,
  isBusinessIndexable,
} from "@/libs/seo";
import { imageBuilder } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ citySlug: string; businessSlug: string }>;
};

export async function generateMetadata(props: Props) {
  const { citySlug, businessSlug } = await props.params;
  const business = await getBusinessByCityAndSlug(citySlug, businessSlug);

  if (!business) {
    return buildMetadata({
      title: "Afacere inexistenta",
      description: "Afacerea cautata nu exista.",
      path: `/${citySlug}/${businessSlug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title:
      business.seoTitle ||
      `${business.title}${business.city?.title ? ` in ${business.city.title}` : ""} | ${siteConfig.name}`,
    description:
      business.seoDescription || business.summary || siteConfig.description,
    path: `/${citySlug}/${business.slug.current}`,
    image: business.coverImage ? imageBuilder(business.coverImage).url() : undefined,
    noIndex: !isBusinessIndexable(business),
    section: "Directory",
  });
}

export default async function BusinessPage(props: Props) {
  const { citySlug, businessSlug } = await props.params;
  notFoundIfReservedDirectorySlugs([citySlug, businessSlug]);
  const business = await getBusinessByCityAndSlug(citySlug, businessSlug);

  if (!business) {
    notFound();
  }

  const [cityBusinesses, relatedPosts] = await Promise.all([
    getBusinessesByCitySlug(citySlug),
    getPostsRelevantToBusiness(citySlug, businessSlug, 3),
  ]);

  const nearbyAlternatives = getRelatedBusinesses(business, cityBusinesses, 3);
  const sameCityCategories = getTopCategoriesFromBusinesses(cityBusinesses, 4);
  const galleryImages = [
    ...(business.coverImage ? [business.coverImage] : []),
    ...(business.gallery || []),
  ];
  const breadcrumbItems = [
    { name: "Acasa", href: "/" },
    ...(business.county?.slug.current
      ? [
          {
            name: business.county.title,
            href: `/judet/${business.county.slug.current}`,
          },
        ]
      : []),
    ...(business.city?.slug.current
      ? [
          {
            name: business.city.title,
            href: `/${business.city.slug.current}`,
          },
        ]
      : []),
    { name: business.title },
  ];

  return (
    <main>
      <StructuredData
        data={[
          buildBreadcrumbStructuredData(
            breadcrumbItems.map((item) => ({
              name: item.name,
              path: item.href,
            })),
          ),
          buildBusinessStructuredData(business),
        ]}
      />

      <section className="pb-12 pt-31.5">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="rounded-[28px] bg-gray p-8 sm:p-10">
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />

            <div className="mb-4 flex flex-wrap gap-2">
              {business.categories.length > 0
                ? business.categories.map((category) => (
                    <span
                      key={category._id}
                      className="inline-flex rounded-full bg-blue/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue"
                    >
                      {category.title}
                    </span>
                  ))
                : business.category && (
                    <span className="inline-flex rounded-full bg-blue/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                      {business.category}
                    </span>
                  )}
              {business.featured && (
                <span className="inline-flex rounded-full bg-dark px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Recomandat
                </span>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-custom-2">
              {business.title}
            </h1>
            <p className="max-w-[820px] text-lg leading-8 text-body">
              {business.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-body">
              {business.city?.title && <span>{business.city.title}</span>}
              {business.county?.title && <span>{business.county.title}</span>}
              {business.address && <span>{business.address}</span>}
            </div>
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <PortalSection className="pb-12">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-gray">
              <Image
                src={imageBuilder(galleryImages[0]).width(1200).height(760).url()!}
                alt={business.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {galleryImages.slice(1, 3).map((image, index) => (
                <div
                  key={`${business._id}-gallery-${index}`}
                  className="relative min-h-[172px] overflow-hidden rounded-[24px] bg-gray"
                >
                  <Image
                    src={imageBuilder(image).width(640).height(420).url()!}
                    alt={`${business.title} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </PortalSection>
      )}

      <PortalSection className="pb-15">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-8">
            {(business.description?.length || business.services?.length) && (
              <PortalCardFrame padding="comfortable">
                <h2 className="mb-4 text-2xl font-semibold text-dark">
                  Despre aceasta afacere
                </h2>
                {business.description && business.description.length > 0 ? (
                  <div className="portal-content">
                    <PortableTextContent value={business.description} />
                  </div>
                ) : (
                  <p className="text-body">{business.summary}</p>
                )}
              </PortalCardFrame>
            )}

            {business.services && business.services.length > 0 && (
              <PortalCardFrame padding="comfortable">
                <h2 className="mb-4 text-2xl font-semibold text-dark">Servicii</h2>
                <div className="flex flex-wrap gap-3">
                  {business.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </PortalCardFrame>
            )}
          </div>

          <aside className="space-y-6">
            <PortalCardFrame tone="muted" padding="comfortable">
              <h2 className="mb-5 text-xl font-semibold text-dark">
                Informatii utile
              </h2>

              <div className="space-y-4 text-sm text-body">
                <div>
                  <p className="mb-1 font-semibold text-dark">Adresa</p>
                  <p>{business.address}</p>
                  {business.neighborhood && <p>{business.neighborhood}</p>}
                  {business.postalCode && <p>Cod postal: {business.postalCode}</p>}
                </div>
                {business.phone && (
                  <div>
                    <p className="mb-1 font-semibold text-dark">Telefon</p>
                    <p>{business.phone}</p>
                  </div>
                )}
                {business.email && (
                  <div>
                    <p className="mb-1 font-semibold text-dark">Email</p>
                    <a href={`mailto:${business.email}`} className="underline">
                      {business.email}
                    </a>
                  </div>
                )}
                {business.website && (
                  <div>
                    <p className="mb-1 font-semibold text-dark">Website</p>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {business.website}
                    </a>
                  </div>
                )}
                {business.schedule && (
                  <div>
                    <p className="mb-1 font-semibold text-dark">Program</p>
                    <p>{business.schedule}</p>
                  </div>
                )}
              </div>
            </PortalCardFrame>

            {(business.googleMapsUrl || business.coordinates) && (
              <PortalCardFrame padding="comfortable">
                <h2 className="mb-5 text-xl font-semibold text-dark">
                  Localizare
                </h2>
                <div className="space-y-4 text-sm text-body">
                  {business.googleMapsUrl && (
                    <a
                      href={business.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-gray-3 bg-gray px-4 py-2 font-medium text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
                    >
                      Vezi pe harta
                    </a>
                  )}
                  {business.coordinates && (
                    <div>
                      <p className="mb-1 font-semibold text-dark">Coordonate</p>
                      <p>
                        {business.coordinates.lat.toFixed(5)},{" "}
                        {business.coordinates.lng.toFixed(5)}
                      </p>
                    </div>
                  )}
                </div>
              </PortalCardFrame>
            )}

            {sameCityCategories.length > 0 && (
              <PortalCardFrame padding="comfortable">
                <h2 className="mb-5 text-xl font-semibold text-dark">
                  Alte categorii vizibile in oras
                </h2>
                <div className="space-y-3">
                  {sameCityCategories.map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-gray px-4 py-3"
                    >
                      <span className="font-medium text-dark">{category.title}</span>
                      <span className="text-sm text-body">{category.count}</span>
                    </div>
                  ))}
                </div>
              </PortalCardFrame>
            )}
          </aside>
        </div>
      </PortalSection>

      {nearbyAlternatives.length > 0 && (
        <PortalSection className="bg-gray py-15">
          <SectionHeader
            eyebrow="Directory"
            align="left"
            title="Alternative locale sau afaceri apropiate"
            description="Daca vrei sa compari optiuni in acelasi oras, incepe cu aceste pagini similare."
          />

          <PortalCardGrid>
            {nearbyAlternatives.map((alternative) => (
              <BusinessCard key={alternative._id} business={alternative} />
            ))}
          </PortalCardGrid>
        </PortalSection>
      )}

      <RelatedPostsSection
        posts={relatedPosts}
        title={`Articole utile legate de ${business.title}`}
        description="Afisam doar continut editorial care are legatura reala cu aceasta afacere, cu orasul sau cu categoria ei."
        className="py-15 lg:py-20"
      />
    </main>
  );
}
