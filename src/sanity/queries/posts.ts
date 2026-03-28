import { groq } from "next-sanity";

export const postFields = `{
  _id,
  title,
  metaDescription,
  "category": category->title,
  "categorySlug": category->slug,
  slug,
  tags,
  "relatedCategories": relatedCategories[]->{
    _id,
    title,
    slug,
    description
  },
  "relatedCounties": relatedCounties[]->{
    _id,
    title,
    slug,
    summary
  },
  "relatedCities": relatedCities[]->{
    _id,
    title,
    slug,
    summary
  },
  "relatedBusinesses": relatedBusinesses[]->{
    _id,
    title,
    slug,
    address,
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
  },
  author->{
    _id,
    name,
    slug,
    image,
    bio,
    description
  },
  mainImage,
  publishedAt,
  body
}`;

export const postListQuery = groq`*[_type == "post"] | order(publishedAt desc) ${postFields}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] ${postFields}`;

export const postsByTagQuery = groq`*[_type == "post" && $slug in tags] | order(publishedAt desc) ${postFields}`;

export const postsByAuthorSlugQuery = groq`*[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) ${postFields}`;

export const postsByCategorySlugQuery = groq`*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) ${postFields}`;

export const postsRelevantToCountyQuery = groq`*[
  _type == "post" &&
  (
    references(*[_type == "county" && slug.current == $countySlug][0]._id) ||
    references(*[_type == "city" && county->slug.current == $countySlug]._id) ||
    references(*[_type == "business" && city->county->slug.current == $countySlug]._id)
  )
] | order(publishedAt desc)[0...$limit] ${postFields}`;

export const postsRelevantToCityQuery = groq`*[
  _type == "post" &&
  (
    references(*[_type == "city" && slug.current == $citySlug][0]._id) ||
    references(*[_type == "business" && city->slug.current == $citySlug]._id)
  )
] | order(publishedAt desc)[0...$limit] ${postFields}`;

export const postsRelevantToBusinessQuery = groq`*[
  _type == "post" &&
  (
    references(*[_type == "business" && slug.current == $businessSlug && city->slug.current == $citySlug][0]._id) ||
    references(*[_type == "city" && slug.current == $citySlug][0]._id) ||
    references(*[_type == "business" && slug.current == $businessSlug && city->slug.current == $citySlug][0].categories[]._ref)
  )
] | order(publishedAt desc)[0...$limit] ${postFields}`;

export const previousAndNextPostsQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  "prevPost": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
    title,
    slug
  },
  "nextPost": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0] {
    title,
    slug
  }
}`;
