import Breadcrumbs from "@/components/Common/Breadcrumbs";
import PortableTextContent from "@/components/Common/PortableTextContent";
import SectionHeader from "@/components/Common/SectionHeader";
import StructuredData from "@/components/Common/StructuredData";
import EmptyState from "@/components/Common/EmptyState";
import RelatedPostsSection from "@/components/Portal/Editorial/RelatedPostsSection";
import BusinessCard from "@/components/Portal/Directory/BusinessCard";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { getBusinessesByCitySlug } from "@/sanity/businesses";
import { getCityBySlug } from "@/sanity/cities";
import { getTopCategoriesFromBusinesses } from "@/libs/directory-insights";
import { notFoundIfReservedDirectorySlug } from "../route-guards";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import {
  buildBreadcrumbStructuredData,
  buildCityStructuredData,
  isCityIndexable,
} from "@/libs/seo";
import { getPostsRelevantToCity } from "@/sanity/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ citySlug: string }>;
};

export async function generateMetadata(props: Props) {
  const { citySlug } = await props.params;
  const city = await getCityBySlug(citySlug);

  if (!city) {
    return buildMetadata({
      title: "Oras inexistent",
      description: "Orasul cautat nu exista.",
      path: `/${citySlug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: city.seoTitle || `${city.title} | ${siteConfig.name}`,
    description: city.seoDescription || city.summary || siteConfig.description,
    path: `/${city.slug.current}`,
    noIndex: !isCityIndexable(city),
    section: "Directory",
  });
}

export default async function CityPage(props: Props) {
  const { citySlug } = await props.params;
  notFoundIfReservedDirectorySlug(citySlug);
  const city = await getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const [businesses, relatedPosts] = await Promise.all([
    getBusinessesByCitySlug(citySlug),
    getPostsRelevantToCity(citySlug, 3),
  ]);

  if (businesses.length === 0 && !city.intro?.length) {
    notFound();
  }

  const topCategories = getTopCategoriesFromBusinesses(businesses, 6);
  const breadcrumbItems = [
    { name: "Acasa", href: "/" },
    ...(city.county?.slug.current
      ? [
          {
            name: city.county.title,
            href: `/judet/${city.county.slug.current}`,
          },
        ]
      : []),
    { name: city.title },
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
          buildCityStructuredData(city),
        ]}
      />

      <section className="pb-12 pt-34">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="rounded-[28px] bg-gray p-8 sm:p-10">
            <Breadcrumbs items={breadcrumbItems} className="mb-5" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Pagina de oras
            </p>
            <h1 className="mb-4 text-4xl font-bold text-dark">{city.title}</h1>
            <p className="max-w-[760px] text-lg leading-8 text-body">
              {city.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-body">
              <span>{businesses.length} afaceri</span>
              {city.county?.title && <span>{city.county.title}</span>}
              {typeof city.population === "number" && (
                <span>{city.population.toLocaleString("ro-RO")} locuitori</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {city.intro && city.intro.length > 0 && (
        <PortalSection className="pb-12">
          <div className="portal-content max-w-[820px]">
            <PortableTextContent value={city.intro} />
          </div>
        </PortalSection>
      )}

      <PortalSection className="pb-15">
        <SectionHeader
          eyebrow="Discovery"
          align="left"
          title={`Context local pentru ${city.title}`}
          description="Pagina orasului trebuie sa ofere context util, nu doar un slug cu cateva listari."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PortalCardFrame padding="comfortable">
            <h2 className="mb-4 text-xl font-semibold text-dark">
              Relatie cu judetul
            </h2>
            <p className="mb-4 text-body">
              {city.title} face parte din {city.county?.title || "judetul asociat"} si
              concentreaza {businesses.length} afaceri publicate in director.
            </p>
            {city.county?.slug.current && (
              <Link
                href={`/judet/${city.county.slug.current}`}
                className="inline-flex rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
              >
                Vezi pagina judetului {city.county.title}
              </Link>
            )}
          </PortalCardFrame>

          <PortalCardFrame padding="comfortable">
            <h2 className="mb-4 text-xl font-semibold text-dark">
              Categorii puternice in oras
            </h2>
            {topCategories.length > 0 ? (
              <div className="space-y-3">
                {topCategories.slice(0, 4).map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-gray px-4 py-3"
                  >
                    <span className="font-medium text-dark">{category.title}</span>
                    <span className="text-sm text-body">{category.count} listari</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body">
                Categoriile vor aparea dupa ce orasul are afaceri indexate.
              </p>
            )}
          </PortalCardFrame>
        </div>
      </PortalSection>

      <PortalSection className="pb-15">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Afaceri locale"
          description="Fiecare business are pagina proprie si ruta dedicata in interiorul orasului."
        />

        {businesses.length > 0 ? (
          <PortalCardGrid>
            {businesses.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista afaceri publicate"
            description="Adauga documente business care refera acest oras pentru a popula pagina."
          />
        )}
      </PortalSection>

      <RelatedPostsSection
        posts={relatedPosts}
        title={`Articole care sustin contextul local din ${city.title}`}
        description="Aceste articole sunt afisate doar cand exista legaturi editoriale explicite cu orasul sau afacerile listate aici."
        className="bg-gray py-15 lg:py-20"
      />
    </main>
  );
}
