import { isReservedDirectorySlug } from "@/config/site";
import { Business } from "@/types/directory";
import { sanityFetch } from "./client";
import {
  businessByCityAndSlugQuery,
  businessListQuery,
  businessesByCitySlugQuery,
  businessesByCountySlugQuery,
  featuredBusinessesQuery,
} from "./queries/businesses";

export async function getBusinesses() {
  const data: Business[] = await sanityFetch({
    query: businessListQuery,
    tags: ["business", "city", "county", "category"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getFeaturedBusinesses(limit = 6) {
  const data: Business[] = await sanityFetch({
    query: featuredBusinessesQuery,
    tags: ["business", "city", "county", "category"],
  });

  return Array.isArray(data) ? data.slice(0, limit) : [];
}

export async function getBusinessesByCountySlug(countySlug: string) {
  if (isReservedDirectorySlug(countySlug)) {
    return [];
  }

  const data: Business[] = await sanityFetch({
    query: businessesByCountySlugQuery,
    qParams: { countySlug },
    tags: ["business", "city", "county", "category"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getBusinessesByCitySlug(citySlug: string) {
  if (isReservedDirectorySlug(citySlug)) {
    return [];
  }

  const data: Business[] = await sanityFetch({
    query: businessesByCitySlugQuery,
    qParams: { citySlug },
    tags: ["business", "city", "county", "category"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getBusinessByCityAndSlug(
  citySlug: string,
  businessSlug: string,
) {
  if (
    isReservedDirectorySlug(citySlug) ||
    isReservedDirectorySlug(businessSlug)
  ) {
    return null;
  }

  const data: Business | null = await sanityFetch({
    query: businessByCityAndSlugQuery,
    qParams: { citySlug, businessSlug },
    tags: ["business", "city", "county", "category"],
  });

  return data ?? null;
}
