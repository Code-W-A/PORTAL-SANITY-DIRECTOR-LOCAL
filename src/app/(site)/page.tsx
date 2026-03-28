import StructuredData from "@/components/Common/StructuredData";
import SectionHeader from "@/components/Common/SectionHeader";
import EmptyState from "@/components/Common/EmptyState";
import ArticleCard from "@/components/Portal/ArticleCard";
import { getFeaturedBusinesses } from "@/sanity/businesses";
import { getCategories } from "@/sanity/categories";
import { getFeaturedCities } from "@/sanity/cities";
import { getCounties } from "@/sanity/counties";
import { getLatestPosts } from "@/sanity/posts";
import BusinessCard from "@/components/Portal/Directory/BusinessCard";
import CityCard from "@/components/Portal/Directory/CityCard";
import CountyCard from "@/components/Portal/Directory/CountyCard";
import DiscoveryPanel from "@/components/Portal/Home/DiscoveryPanel";
import HomeHero from "@/components/Portal/Home/Hero";
import TrustSection from "@/components/Portal/Home/TrustSection";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import { buildWebsiteStructuredData } from "@/libs/seo";

export const metadata = buildMetadata({
  title: `${siteConfig.name} | Director local si blog`,
  description:
    "Descopera judete, orase si afaceri locale din Romania, plus continut editorial separat in zona de blog.",
  path: "/",
});

export default async function Home() {
  const [counties, cities, businesses, posts, categories] = await Promise.all([
    getCounties(),
    getFeaturedCities(6),
    getFeaturedBusinesses(6),
    getLatestPosts(3),
    getCategories(8),
  ]);

  const discoveryItems = [
    ...counties.slice(0, 10).map((county) => ({
      id: `county-${county._id}`,
      label: county.title,
      href: `/judet/${county.slug.current}`,
      type: "judet" as const,
      meta: county.summary,
    })),
    ...cities.slice(0, 10).map((city) => ({
      id: `city-${city._id}`,
      label: city.title,
      href: `/${city.slug.current}`,
      type: "oras" as const,
      meta: city.county?.title || city.summary,
    })),
    ...businesses
      .filter((business) => business.city?.slug.current)
      .slice(0, 12)
      .map((business) => ({
        id: `business-${business._id}`,
        label: business.title,
        href: `/${business.city!.slug.current}/${business.slug.current}`,
        type: "afacere" as const,
        meta: [business.city?.title, business.category].filter(Boolean).join(" · "),
      })),
  ];

  return (
    <>
      <StructuredData data={buildWebsiteStructuredData()} />

      <HomeHero counties={counties} cities={cities} businesses={businesses} />

      <PortalSection className="py-15 lg:py-20">
        <DiscoveryPanel items={discoveryItems} />
      </PortalSection>

      <PortalSection id="judete" className="pb-15 pt-20 lg:pt-25">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Judete de unde poti porni"
          description="Incepe cu o pagina de judet daca vrei sa navighezi geografic si sa vezi ce orase si afaceri merita explorate."
        />

        {counties.length > 0 ? (
          <PortalCardGrid>
            {counties.slice(0, 6).map((county) => (
              <CountyCard key={county._id} county={county} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista inca judete publicate"
            description="Adauga documente de tip county in Sanity pentru a popula zona de director local."
          />
        )}
      </PortalSection>

      <PortalSection id="orase" className="bg-gray py-15 lg:py-20">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Orase active in portal"
          description="Paginile de oras aduna context local, relatie cu judetul si afaceri reale listate in interiorul orasului."
        />

        {cities.length > 0 ? (
          <PortalCardGrid>
            {cities.map((city) => (
              <CityCard key={city._id} city={city} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista inca orase publicate"
            description="Adauga documente de tip city in Sanity si asociaza-le cu judetele potrivite."
          />
        )}
      </PortalSection>

      <PortalSection id="afaceri" className="py-15 lg:py-20">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Afaceri recomandate"
          description="Business-urile au model dedicat si pagini proprii pe structura /oras/afacere."
        />

        {businesses.length > 0 ? (
          <PortalCardGrid>
            {businesses.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista inca afaceri recomandate"
            description="Marcheaza business-urile relevante ca featured in Sanity pentru a le afisa pe homepage."
          />
        )}
      </PortalSection>

      <PortalSection id="categorii" className="pb-15 lg:pb-20">
        <SectionHeader
          eyebrow="Directory"
          align="left"
          title="Top categorii utile"
          description="Aceste categorii organizeaza afacerile locale fara sa copieze vechile taxonomii editoriale de blog."
        />

        {categories.length > 0 ? (
          <PortalCardGrid>
            {categories.slice(0, 6).map((category) => (
              <PortalCardFrame key={category._id} padding="comfortable" className="h-full">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gray px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-body">
                    Categorie
                  </span>
                  {typeof category.businessCount === "number" && (
                    <span className="text-sm text-body">
                      {category.businessCount} listari
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-dark">
                  {category.title}
                </h3>
                <p className="line-clamp-3 text-body">{category.description}</p>
              </PortalCardFrame>
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista inca categorii publicate"
            description="Adauga categorii reale de business in Sanity pentru a completa navigarea directorului."
          />
        )}
      </PortalSection>

      <PortalSection id="blog" className="bg-gray py-15 lg:py-20">
        <SectionHeader
          eyebrow="Editorial"
          align="left"
          title="Ultimele articole utile"
          description="Blogul sustine directorul doar unde exista relevanta, fara sa preia rolul paginilor de locatie sau de business."
        />

        {posts.length > 0 ? (
          <PortalCardGrid>
            {posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista inca articole publicate"
            description="Adauga postari editoriale in Sanity pentru a alimenta zona de blog."
          />
        )}
      </PortalSection>

      <TrustSection />
    </>
  );
}
