import { isReservedDirectorySlug } from "@/config/site";
import { Category } from "@/types/directory";
import { sanityFetch } from "./client";
import { categoryBySlugQuery, categoryListQuery } from "./queries/categories";

export async function getCategories(limit?: number) {
  const data: Category[] = await sanityFetch({
    query: categoryListQuery,
    tags: ["category", "business"],
  });

  const categories = Array.isArray(data) ? data : [];
  return typeof limit === "number" ? categories.slice(0, limit) : categories;
}

export async function getCategoryBySlug(categorySlug: string) {
  if (isReservedDirectorySlug(categorySlug)) {
    return null;
  }

  const data: Category | null = await sanityFetch({
    query: categoryBySlugQuery,
    qParams: { categorySlug },
    tags: ["category", "business"],
  });

  return data ?? null;
}
