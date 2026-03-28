import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/config/site";
import {
  getStaticSitemapEntries,
  isBusinessIndexable,
  isCountyIndexable,
  isCityIndexable,
  isPostIndexable,
} from "@/libs/seo";
import { getBusinesses } from "@/sanity/businesses";
import { getCities } from "@/sanity/cities";
import { getCounties } from "@/sanity/counties";
import { getPosts } from "@/sanity/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [counties, cities, businesses, posts] = await Promise.all([
    getCounties(),
    getCities(),
    getBusinesses(),
    getPosts(),
  ]);

  return [
    ...getStaticSitemapEntries(),
    ...counties.filter((county) => isCountyIndexable(county)).map((county) => ({
      url: absoluteSiteUrl(`/judet/${county.slug.current}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cities.filter((city) => isCityIndexable(city)).map((city) => ({
      url: absoluteSiteUrl(`/${city.slug.current}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...businesses
      .filter((business) => isBusinessIndexable(business))
      .map((business) => ({
        url: absoluteSiteUrl(`/${business.city!.slug.current}/${business.slug.current}`),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ...posts.filter((post) => isPostIndexable(post)).map((post) => ({
      url: absoluteSiteUrl(`/blog/${post.slug.current}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
