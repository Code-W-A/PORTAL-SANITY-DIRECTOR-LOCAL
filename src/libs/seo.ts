import { PortableTextBlock } from "sanity";
import { sitemapStaticEntries } from "@/config/seo";
import { absoluteSiteUrl, siteConfig } from "@/config/site";
import { imageBuilder } from "@/sanity/client";
import type { Business, City, County } from "@/types/directory";
import type { Post } from "@/types/post";

type BreadcrumbStructuredItem = {
  name: string;
  path?: string;
};

const COUNTRY_NAME = "Romania";

function hasText(value?: string | null) {
  return Boolean(value?.trim());
}

function hasPortableTextContent(blocks?: PortableTextBlock[] | null) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return false;
  }

  return blocks.some((block) => {
    if (!("children" in block) || !Array.isArray(block.children)) {
      return true;
    }

    return block.children.some(
      (child) => "text" in child && typeof child.text === "string" && child.text.trim().length > 0,
    );
  });
}

function imageUrl(image: any) {
  if (!image) {
    return undefined;
  }

  return imageBuilder(image).width(1200).height(630).url();
}

function compactJsonLd<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => compactJsonLd(item))
      .filter((item) => {
        if (item == null) {
          return false;
        }

        if (Array.isArray(item)) {
          return item.length > 0;
        }

        if (typeof item === "object") {
          return Object.keys(item as Record<string, unknown>).length > 0;
        }

        return true;
      }) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .map(([key, nestedValue]) => [key, compactJsonLd(nestedValue)])
        .filter(([, nestedValue]) => {
          if (nestedValue == null) {
            return false;
          }

          if (Array.isArray(nestedValue)) {
            return nestedValue.length > 0;
          }

          if (typeof nestedValue === "object") {
            return Object.keys(nestedValue as Record<string, unknown>).length > 0;
          }

          return true;
        }),
    ) as T;
  }

  return value;
}

export function isCountyIndexable(county: County | null) {
  if (!county?.slug.current) {
    return false;
  }

  const hasIntro = hasPortableTextContent(county.intro);
  const hasSummary = hasText(county.summary);
  const hasGeographicDepth = (county.cityCount ?? 0) > 0 || hasIntro;

  return (hasSummary || hasIntro) && hasGeographicDepth;
}

export function isCityIndexable(city: City | null) {
  if (!city?.slug.current) {
    return false;
  }

  const hasIntro = hasPortableTextContent(city.intro);
  const hasSummary = hasText(city.summary);
  const hasLocalDepth = (city.businessCount ?? 0) > 0 || hasIntro;

  return (hasSummary || hasIntro) && hasLocalDepth;
}

export function isBusinessIndexable(business: Business | null) {
  if (!business?.slug.current || !business.city?.slug.current) {
    return false;
  }

  const hasCoreData =
    hasText(business.title) &&
    hasText(business.summary) &&
    hasText(business.address);
  const hasDepth =
    hasPortableTextContent(business.description) ||
    (business.services?.length ?? 0) > 0 ||
    hasText(business.schedule) ||
    hasText(business.phone) ||
    hasText(business.website) ||
    hasText(business.email) ||
    (business.gallery?.length ?? 0) > 0 ||
    Boolean(business.googleMapsUrl);

  return hasCoreData && hasDepth;
}

export function isPostIndexable(post: Post | null) {
  if (!post?.slug.current || !hasText(post.title)) {
    return false;
  }

  return hasText(post.metaDescription) || hasPortableTextContent(post.body);
}

export function isBlogIndexable(posts: Post[]) {
  return posts.some((post) => isPostIndexable(post));
}

export function getStaticSitemapEntries() {
  return sitemapStaticEntries.map((entry) => ({
    url: absoluteSiteUrl(entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

export function buildBreadcrumbStructuredData(items: BreadcrumbStructuredItem[]) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteSiteUrl(item.path) : undefined,
    })),
  });
}

export function buildWebsiteStructuredData() {
  return compactJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      areaServed: COUNTRY_NAME,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "ro-RO",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  ]);
}

export function buildCountyStructuredData(county: County) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    name: county.title,
    description: county.seoDescription || county.summary,
    url: absoluteSiteUrl(`/judet/${county.slug.current}`),
    image: imageUrl(county.coverImage),
    containedInPlace: {
      "@type": "Country",
      name: COUNTRY_NAME,
    },
  });
}

export function buildCityStructuredData(city: City) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "City",
    name: city.title,
    description: city.seoDescription || city.summary,
    url: absoluteSiteUrl(`/${city.slug.current}`),
    image: imageUrl(city.coverImage),
    containedInPlace: city.county
      ? {
          "@type": "AdministrativeArea",
          name: city.county.title,
          url: absoluteSiteUrl(`/judet/${city.county.slug.current}`),
        }
      : {
          "@type": "Country",
          name: COUNTRY_NAME,
        },
  });
}

export function buildBusinessStructuredData(business: Business) {
  const sameAs = [business.website, business.googleMapsUrl].filter(Boolean);

  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.title,
    description: business.seoDescription || business.summary,
    url: absoluteSiteUrl(`/${business.city?.slug.current}/${business.slug.current}`),
    image: [
      business.coverImage ? imageUrl(business.coverImage) : undefined,
      ...(business.gallery || []).slice(0, 4).map((item) => imageUrl(item)),
    ],
    telephone: business.phone,
    email: business.email,
    openingHours: business.schedule,
    sameAs,
    knowsAbout: business.categories.map((category) => category.title),
    areaServed: [
      business.city
        ? {
            "@type": "City",
            name: business.city.title,
            url: absoluteSiteUrl(`/${business.city.slug.current}`),
          }
        : undefined,
      business.county
        ? {
            "@type": "AdministrativeArea",
            name: business.county.title,
            url: absoluteSiteUrl(`/judet/${business.county.slug.current}`),
          }
        : undefined,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city?.title,
      addressRegion: business.county?.title,
      postalCode: business.postalCode,
      addressCountry: "RO",
    },
    geo: business.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: business.coordinates.lat,
          longitude: business.coordinates.lng,
        }
      : undefined,
  });
}

export function buildBlogStructuredData(posts: Post[]) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description:
      "Zona editoriala a portalului, separata de directory, cu legaturi locale doar unde exista relevanta reala.",
    url: absoluteSiteUrl("/blog"),
    inLanguage: "ro-RO",
    blogPost: posts.filter((post) => isPostIndexable(post)).slice(0, 8).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: absoluteSiteUrl(`/blog/${post.slug.current}`),
      datePublished: post.publishedAt,
      image: post.mainImage ? imageUrl(post.mainImage) : undefined,
    })),
  });
}

export function buildBlogPostStructuredData(post: Post) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: absoluteSiteUrl(`/blog/${post.slug.current}`),
    datePublished: post.publishedAt,
    image: post.mainImage ? imageUrl(post.mainImage) : undefined,
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    articleSection: post.category,
    about: [
      ...(post.relatedCounties || []).map((county) => ({
        "@type": "AdministrativeArea",
        name: county.title,
        url: absoluteSiteUrl(`/judet/${county.slug.current}`),
      })),
      ...(post.relatedCities || []).map((city) => ({
        "@type": "City",
        name: city.title,
        url: absoluteSiteUrl(`/${city.slug.current}`),
      })),
      ...(post.relatedBusinesses || [])
        .filter((business) => business.city?.slug.current)
        .map((business) => ({
          "@type": "LocalBusiness",
          name: business.title,
          url: absoluteSiteUrl(`/${business.city!.slug.current}/${business.slug.current}`),
        })),
      ...(post.relatedCategories || []).map((category) => ({
        "@type": "Thing",
        name: category.title,
      })),
    ],
  });
}
