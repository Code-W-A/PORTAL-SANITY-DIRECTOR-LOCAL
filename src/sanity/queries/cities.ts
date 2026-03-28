import { groq } from "next-sanity";

export const cityFields = `{
  _id,
  title,
  slug,
  summary,
  intro,
  population,
  seoTitle,
  seoDescription,
  coverImage,
  featured,
  county->{
    _id,
    title,
    slug,
    summary
  },
  "businessCount": count(*[_type == "business" && references(^._id)])
}`;

export const cityListQuery = groq`*[_type == "city"] | order(title asc) ${cityFields}`;

export const featuredCitiesQuery = groq`*[_type == "city" && featured == true] | order(title asc) ${cityFields}`;

export const citiesByCountySlugQuery = groq`*[_type == "city" && county->slug.current == $countySlug] | order(title asc) ${cityFields}`;

export const cityBySlugQuery = groq`*[_type == "city" && slug.current == $citySlug][0] ${cityFields}`;
