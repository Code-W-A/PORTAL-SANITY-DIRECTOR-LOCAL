import { isReservedDirectorySlug } from "@/config/site";
import { City } from "@/types/directory";
import { sanityFetch } from "./client";
import {
  citiesByCountySlugQuery,
  cityBySlugQuery,
  cityListQuery,
  featuredCitiesQuery,
} from "./queries/cities";

export async function getCities() {
  const data: City[] = await sanityFetch({
    query: cityListQuery,
    tags: ["city", "county", "business"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getFeaturedCities(limit = 6) {
  const data: City[] = await sanityFetch({
    query: featuredCitiesQuery,
    tags: ["city", "county", "business"],
  });

  if (Array.isArray(data) && data.length > 0) {
    return data.slice(0, limit);
  }

  const cities = await getCities();
  return cities.slice(0, limit);
}

export async function getCitiesByCountySlug(countySlug: string) {
  if (isReservedDirectorySlug(countySlug)) {
    return [];
  }

  const data: City[] = await sanityFetch({
    query: citiesByCountySlugQuery,
    qParams: { countySlug },
    tags: ["city", "county", "business"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getCityBySlug(citySlug: string) {
  if (isReservedDirectorySlug(citySlug)) {
    return null;
  }

  const data: City | null = await sanityFetch({
    query: cityBySlugQuery,
    qParams: { citySlug },
    tags: ["city", "county", "business"],
  });

  return data ?? null;
}
