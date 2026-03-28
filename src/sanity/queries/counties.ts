import { groq } from "next-sanity";

export const countyFields = `{
  _id,
  title,
  slug,
  summary,
  intro,
  region,
  seoTitle,
  seoDescription,
  coverImage,
  featured,
  "cityCount": count(*[_type == "city" && references(^._id)])
}`;

export const countyListQuery = groq`*[_type == "county"] | order(title asc) ${countyFields}`;

export const countyBySlugQuery = groq`*[_type == "county" && slug.current == $countySlug][0] ${countyFields}`;
