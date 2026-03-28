export { imageBuilder, sanityFetch } from "./client";
export { getAuthorBySlug, getAuthors } from "./authors";
export { getPosts } from "./posts";
import {
  getPostBySlug,
  getPostsByAuthorSlug as getPostsByAuthorSlugBase,
  getPostsByCategorySlug,
  getPostsByTag as getPostsByTagBase,
  getPreviousAndNextPosts,
} from "./posts";

export async function getPostsByAuthorSlug(slug: string) {
  return getPostsByAuthorSlugBase(slug);
}

export async function getPrevAndNextPost(slug: string) {
  return getPreviousAndNextPosts(slug);
}

export async function getPostsByCategory(category: string) {
  return getPostsByCategorySlug(category);
}

export async function getPost(slug: string) {
  return getPostBySlug(slug);
}

export async function getPostsByTag(slug: string) {
  return getPostsByTagBase(slug);
}
