import { Author } from "@/types/author";
import { sanityFetch } from "./client";
import { authorBySlugQuery, authorListQuery } from "./queries/authors";

export async function getAuthors() {
  const data: Author[] = await sanityFetch({
    query: authorListQuery,
    tags: ["author", "post"],
  });

  return Array.isArray(data) ? data : [];
}

export async function getAuthorBySlug(slug: string) {
  const data: Author | null = await sanityFetch({
    query: authorBySlugQuery,
    qParams: { slug },
    tags: ["author", "post"],
  });

  return data ?? null;
}
