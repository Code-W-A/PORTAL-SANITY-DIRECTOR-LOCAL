import { isReservedDirectorySlug } from "@/config/site";
import { County } from "@/types/directory";
import { sanityFetch } from "./client";
import { countyBySlugQuery, countyListQuery } from "./queries/counties";

export async function getCounties() {
  const data: County[] = await sanityFetch({
    query: countyListQuery,
    tags: ["county", "city"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getCountyBySlug(countySlug: string) {
  if (isReservedDirectorySlug(countySlug)) {
    return null;
  }

  const data: County | null = await sanityFetch({
    query: countyBySlugQuery,
    qParams: { countySlug },
    tags: ["county", "city"],
  });

  return data ?? null;
}
