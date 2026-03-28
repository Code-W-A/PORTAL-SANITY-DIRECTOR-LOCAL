import { isReservedDirectorySlug } from "@/config/site";
import { Post } from "@/types/post";
import { sanityFetch } from "./client";
import {
  postBySlugQuery,
  postListQuery,
  postsByAuthorSlugQuery,
  postsByCategorySlugQuery,
  postsRelevantToBusinessQuery,
  postsRelevantToCityQuery,
  postsRelevantToCountyQuery,
  postsByTagQuery,
  previousAndNextPostsQuery,
} from "./queries/posts";

type PostNavigationState = Pick<Post, "prevPost" | "nextPost">;

const postTags = ["post", "author", "category", "county", "city", "business"];

export async function getPosts() {
  const data: Post[] = await sanityFetch({
    query: postListQuery,
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}

export async function getLatestPosts(limit = 3) {
  const posts = await getPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const data: Post | null = await sanityFetch({
    query: postBySlugQuery,
    qParams: { slug },
    tags: postTags,
  });

  return data ?? null;
}

export async function getPostsByAuthorSlug(authorSlug: string) {
  const data: Post[] = await sanityFetch({
    query: postsByAuthorSlugQuery,
    qParams: { authorSlug },
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}

export async function getPostsByCategorySlug(categorySlug: string) {
  if (isReservedDirectorySlug(categorySlug)) {
    return [];
  }

  const data: Post[] = await sanityFetch({
    query: postsByCategorySlugQuery,
    qParams: { categorySlug },
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}

export async function getPostsByTag(tag: string) {
  const data: Post[] = await sanityFetch({
    query: postsByTagQuery,
    qParams: { slug: tag },
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}

export async function getPreviousAndNextPosts(slug: string) {
  const data: PostNavigationState | null = await sanityFetch({
    query: previousAndNextPostsQuery,
    qParams: { slug },
    tags: postTags,
  });

  return data ?? { prevPost: null, nextPost: null };
}

export async function getPostsRelevantToCounty(countySlug: string, limit = 3) {
  if (isReservedDirectorySlug(countySlug)) {
    return [];
  }

  const data: Post[] = await sanityFetch({
    query: postsRelevantToCountyQuery,
    qParams: { countySlug, limit },
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}

export async function getPostsRelevantToCity(citySlug: string, limit = 3) {
  if (isReservedDirectorySlug(citySlug)) {
    return [];
  }

  const data: Post[] = await sanityFetch({
    query: postsRelevantToCityQuery,
    qParams: { citySlug, limit },
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}

export async function getPostsRelevantToBusiness(
  citySlug: string,
  businessSlug: string,
  limit = 3,
) {
  if (
    isReservedDirectorySlug(citySlug) ||
    isReservedDirectorySlug(businessSlug)
  ) {
    return [];
  }

  const data: Post[] = await sanityFetch({
    query: postsRelevantToBusinessQuery,
    qParams: { citySlug, businessSlug, limit },
    tags: postTags,
  });

  return Array.isArray(data) ? data : [];
}
