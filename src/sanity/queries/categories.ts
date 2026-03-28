import { groq } from "next-sanity";

export const categoryFields = `{
  _id,
  title,
  slug,
  description,
  seoTitle,
  seoDescription,
  ogImage,
  featured,
  "businessCount": count(*[_type == "business" && references(^._id)])
}`;

export const categoryListQuery = groq`*[_type == "category"] | order(featured desc, title asc) ${categoryFields}`;

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $categorySlug][0] ${categoryFields}`;
