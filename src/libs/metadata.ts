import type { Metadata } from "next";
import { absoluteSiteUrl, siteConfig } from "@/config/site";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  section?: string;
  publishedTime?: string;
  authors?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  canonicalPath,
  image,
  type = "website",
  noIndex = false,
  keywords,
  section,
  publishedTime,
  authors,
}: MetadataInput): Metadata {
  const url = absoluteSiteUrl(path);
  const canonicalUrl = absoluteSiteUrl(canonicalPath || path);
  const images = image ? [image] : undefined;
  const openGraph: Metadata["openGraph"] = {
    title,
    description,
    url: canonicalUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type,
    images,
    ...(type === "article"
      ? {
          publishedTime,
          authors,
          section,
          tags: keywords,
        }
      : {}),
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords,
    category: section,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph,
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
  };
}
