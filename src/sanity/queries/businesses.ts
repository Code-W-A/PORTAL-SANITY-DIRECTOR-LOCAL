import { groq } from "next-sanity";

export const businessFields = `{
  _id,
  title,
  slug,
  summary,
  "category": categories[0]->title,
  "categories": categories[]->{
    _id,
    title,
    slug,
    description
  },
  address,
  neighborhood,
  postalCode,
  phone,
  website,
  email,
  googleMapsUrl,
  coordinates,
  services,
  schedule,
  seoTitle,
  seoDescription,
  featured,
  coverImage,
  gallery,
  description,
  city->{
    _id,
    title,
    slug,
    summary
  },
  "county": city->county->{
    _id,
    title,
    slug,
    summary
  }
}`;

export const businessListQuery = groq`*[_type == "business"] | order(featured desc, title asc) ${businessFields}`;

export const featuredBusinessesQuery = groq`*[_type == "business" && featured == true] | order(title asc) ${businessFields}`;

export const businessesByCountySlugQuery = groq`*[_type == "business" && city->county->slug.current == $countySlug] | order(featured desc, title asc) ${businessFields}`;

export const businessesByCitySlugQuery = groq`*[_type == "business" && city->slug.current == $citySlug] | order(featured desc, title asc) ${businessFields}`;

export const businessByCityAndSlugQuery = groq`*[_type == "business" && slug.current == $businessSlug && city->slug.current == $citySlug][0] ${businessFields}`;
