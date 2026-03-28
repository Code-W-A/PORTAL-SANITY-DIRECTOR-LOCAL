import Breadcrumbs from "@/components/Common/Breadcrumbs";
import SectionHeader from "@/components/Common/SectionHeader";
import StructuredData from "@/components/Common/StructuredData";
import EmptyState from "@/components/Common/EmptyState";
import PortableTextContent from "@/components/Common/PortableTextContent";
import RelatedPostsSection from "@/components/Portal/Editorial/RelatedPostsSection";
import BusinessCard from "@/components/Portal/Directory/BusinessCard";
import CityCard from "@/components/Portal/Directory/CityCard";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { getBusinessesByCountySlug } from "@/sanity/businesses";
import { getCitiesByCountySlug } from "@/sanity/cities";
import { getCountyBySlug } from "@/sanity/counties";
import { getTopCategoriesFromBusinesses, getImportantCities } from "@/libs/directory-insights";
import { notFoundIfReservedDirectorySlug } from "../../route-guards";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import {
  buildBreadcrumbStructuredData,
  buildCountyStructuredData,
  isCountyIndexable,
} from "@/libs/seo";
import { getPostsRelevantToCounty } from "@/sanity/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ countySlug: string }>;
};

export async function generateMetadata(props: Props) {
  const { countySlug } = await props.params;
  const county = await getCountyBySlug(countySlug);

  if (!county) {
    return buildMetadata({
      title: "Judet inexistent",
      description: "Judetul cautat nu exista.",
      path: `/judet/${countySlug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: county.seoTitle || `${county.title} | ${siteConfig.name}`,
    description: county.seoDescription || county.summary || siteConfig.description,
    path: `/judet/${county.slug.current}`,
    noIndex: !isCountyIndexable(county),
    section: "Directory",
  });
}

export default async function CountyPage(props: Props) {
  const { countySlug } = await props.params;
  notFoundIfReservedDirectorySlug(countySlug);
  const county = await getCountyBySlug(countySlug);

  if (!county) {
    notFound();
  }

  const [cities, businesses, relatedPosts] = await Promise.all([
    getCitiesByCountySlug(countySlug),
    getBusinessesByCountySlug(countySlug),
    getPostsRelevantToCounty(countySlug, 3),
  ]);

  if (cities.length === 0 && businesses.length === 0 && !county.intro?.length) {
    notFound();
  }

  const importantCities = getImportantCities(cities, 6);
  const topCategories = getTopCategoriesFromBusinesses(businesses, 6);
  const breadcrumbItems = [
    { name: "Acasa", href: "/" },
    { name: county.title },
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
          buildCountyStructuredData(county),
        ]}
      />

      <section className="pb-12 pt-34">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="rounded-[28px] bg-gray p-8 sm:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Pagina de judet
            </p>
            <h1 className="mb-4 text-4xl font-bold text-dark">{county.title}</h1>
            <p className="max-w-[760px] text-lg leading-8 text-body">
              {county.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-body">
              {county.region && <span>{county.region}</span>}
              <span>{cities.length} orase</span>
              <span>{businesses.length} afaceri</span>
            </div>
          </div>
        </div>
      </section>

      {county.intro && county.intro.length > 0 && (
        <PortalSection className="pb-12">
          <div className="portal-content max-w-[820px]">
            <PortableTextContent value={county.intro} />
          </div>
        </PortalSection>
      )}

      <PortalSection className="pb-15">
        <SectionHeader
          eyebrow="Discovery"
          align="left"
          title="Linkuri utile din judet"
          description="Foloseste aceste intrari rapide ca sa continui explorarea in orasele si categoriile cele mai vizibile."
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <PortalCardFrame padding="comfortable">
            <h2 className="mb-4 text-xl font-semibold text-dark">
              Orase importante din {county.title}
            </h2>
            {importantCities.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {importantCities.map((city) => (
                  <Link
                    key={city._id}
                    href={`/${city.slug.current}`}
                    className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
                  >
                    {city.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-body">
                Judetul nu are inca orase publicate in director.
              </p>
            )}
          </PortalCardFrame>

          <PortalCardFrame padding="comfortable">
            <h2 className="mb-4 text-xl font-semibold text-dark">
              Categorii care apar aici
            </h2>
            {topCategories.length > 0 ? (
              <div className="space-y-3">
                {topCategories.slice(0, 4).map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-gray px-4 py-3"
                  >
                    <span className="font-medium text-dark">{category.title}</span>
                    <span className="text-sm text-body">{category.count} afaceri</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body">
                Categoriile vor aparea dupa ce judetul are afaceri publicate.
              </p>
            )}
          </PortalCardFrame>
        </div>
      </PortalSection>

      <PortalSection className="pb-15">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Orase din judet"
          description="Fiecare oras are propria pagina de director si nu este tratat ca o arhiva editoriala."
        />

        {importantCities.length > 0 ? (
          <PortalCardGrid>
            {importantCities.map((city) => (
              <CityCard key={city._id} city={city} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista orase publicate"
            description="Adauga documente city care refera acest judet pentru a popula pagina."
          />
        )}
      </PortalSection>

      <PortalSection className="bg-gray py-15">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Afaceri din judet"
          description="Selectie de business-uri asociate oraselor din acest judet."
        />

        {businesses.length > 0 ? (
          <PortalCardGrid>
            {businesses.slice(0, 6).map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista afaceri publicate"
            description="Adauga documente business asociate oraselor din acest judet."
          />
        )}
      </PortalSection>

      <RelatedPostsSection
        posts={relatedPosts}
        title={`Ghiduri si articole utile pentru ${county.title}`}
        description="Aratam doar continut editorial care are legatura reala cu judetul, orasele sau afacerile din aceasta zona."
        className="py-15 lg:py-20"
      />
    </main>
  );
}
